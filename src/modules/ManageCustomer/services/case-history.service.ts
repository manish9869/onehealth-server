import { Injectable } from "@nestjs/common";
import {
  AddCaseHistoryDto,
  UpdateCaseHistoryDto,
} from "./../dto/case-history.dto";
import moment from "moment";
import { ConnectionService } from "src/config/connection.service";

@Injectable()
export class CaseHistoryService {
  constructor(private readonly prisma: ConnectionService) {}

  async createCaseHistory(data: AddCaseHistoryDto) {
    return await this.prisma.caseHistory.create({
      data: {
        customer_id: data.customer_id,
        staff_member_id: data.staff_member_id,
        case_date: data.case_date,
        notes: data.notes,
        dental_history: data.dental_history,
        medical_history: data.medical_history,
        created_user_id: data.created_user_id,
        updated_user_id: data.updated_user_id,
        case_treatments: {
          create: data.case_treatments?.map((treatmentId) => ({
            treatment_id: treatmentId,
          })),
        },
        case_medicines: {
          create: data.case_medicines?.map((medicineId) => ({
            medicine_id: medicineId,
          })),
        },
        case_conditions: {
          create: data.case_conditions?.map((conditionId) => ({
            condition_id: conditionId,
          })),
        },
        case_documents: {
          create: data.case_documents,
        },
      },
      include: {
        case_treatments: {
          include: {
            treatment: true, // Include full treatment data
          },
        },
        case_medicines: {
          include: {
            medicine: true, // Include full medicine data
          },
        },
        case_conditions: {
          include: {
            medical_condition: {
              include: {
                symptoms: true, // Include symptoms for each condition
              },
            },
          },
        },
        case_documents: true,
      },
    });
  }

  async getAllCaseHistories() {
    return await this.prisma.caseHistory.findMany({
      include: {
        customer: true,
        staff_member: true,
        case_treatments: {
          include: {
            treatment: true, // Include treatment details
          },
        },
        case_medicines: {
          include: {
            medicine: true, // Include medicine details
          },
        },
        case_conditions: {
          include: {
            medical_condition: {
              include: {
                symptoms: true, // Include symptoms details for conditions
              },
            },
          },
        },
        case_documents: true,
      },
    });
  }

  async getCaseHistoryById(caseId: number) {
    return await this.prisma.caseHistory.findUnique({
      where: { case_id: caseId },
      include: {
        customer: true,
        staff_member: true,
        case_treatments: {
          include: {
            treatment: true,
          },
        },
        case_medicines: {
          include: {
            medicine: true,
          },
        },
        case_conditions: {
          include: {
            medical_condition: {
              include: {
                symptoms: true,
              },
            },
          },
        },
        case_documents: true,
      },
    });
  }

  async updateCaseHistory(caseId: number, data: UpdateCaseHistoryDto) {
    // First, update the main CaseHistory record

    const existingCaseHistory = await this.prisma.caseHistory.findUnique({
      where: { case_id: caseId },
    });

    if (!existingCaseHistory) {
      throw new Error(`CaseHistory with ID ${caseId} not found.`);
    }
    await this.prisma.caseHistory.update({
      where: { case_id: caseId },
      data: {
        customer_id: data.customer_id,
        staff_member_id: data.staff_member_id,
        case_date: data.case_date,
        notes: data.notes,
        dental_history: data.dental_history,
        medical_history: data.medical_history,
        updated_user_id: data.updated_user_id,
      },
    });

    // Then update the nested records
    // Delete existing relations for treatments, medicines, conditions, and documents
    await this.prisma.caseTreatment.deleteMany({ where: { case_id: caseId } });
    await this.prisma.caseMedicine.deleteMany({ where: { case_id: caseId } });
    await this.prisma.caseCondition.deleteMany({ where: { case_id: caseId } });
    await this.prisma.caseDocument.deleteMany({ where: { case_id: caseId } });

    // Create new relations for treatments, medicines, conditions, and documents
    if (data.case_treatments) {
      await this.prisma.caseTreatment.createMany({
        data: data.case_treatments.map((treatmentId) => ({
          case_id: caseId,
          treatment_id: treatmentId,
        })),
      });
    }

    if (data.case_medicines) {
      await this.prisma.caseMedicine.createMany({
        data: data.case_medicines.map((medicineId) => ({
          case_id: caseId,
          medicine_id: medicineId,
        })),
      });
    }

    if (data.case_conditions) {
      await this.prisma.caseCondition.createMany({
        data: data.case_conditions.map((conditionId) => ({
          case_id: caseId,
          condition_id: conditionId,
        })),
      });
    }

    if (data.case_documents) {
      await this.prisma.caseDocument.createMany({
        data: data.case_documents.map((doc) => ({
          case_id: caseId,
          ...doc, // assuming doc contains necessary fields
        })),
      });
    }

    // Finally, return the updated case history
    return this.getCaseHistoryById(caseId);
  }

  async deleteCaseHistory(caseId: number) {
    await this.prisma.caseTreatment.deleteMany({ where: { case_id: caseId } });
    await this.prisma.caseMedicine.deleteMany({ where: { case_id: caseId } });
    await this.prisma.caseCondition.deleteMany({ where: { case_id: caseId } });
    await this.prisma.caseDocument.deleteMany({ where: { case_id: caseId } });

    return await this.prisma.caseHistory.delete({
      where: { case_id: caseId },
    });
  }

  async getCaseHistoriesByCustomerId(customerId: number) {
    const caseHistories = await this.prisma.caseHistory.findMany({
      where: { customer_id: customerId },
      select: {
        case_id: true,
        case_date: true,
      },
    });

    let i = 0;
    return caseHistories.map((data) => ({
      id: data.case_id,
      case_id: data.case_id,
      case_date: data.case_date
        ? `Appointment ${++i} - ` +
          moment(data.case_date).format("DD-MMM-YYYY hh:mm A")
        : "NA",
    }));
  }
}
