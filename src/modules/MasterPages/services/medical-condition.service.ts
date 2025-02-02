import { Injectable } from "@nestjs/common";
import { ConnectionService } from "src/config/connection.service";
import {
  AddMedicalConditionDto,
  UpdateMedicalConditionDto,
} from "./../dto/medical-condition.dto";

@Injectable()
export class MedicalConditionService {
  constructor(private readonly prisma: ConnectionService) {}

  async createMedicalCondition(data: AddMedicalConditionDto) {
    const medicalCondition = await this.prisma.medicalCondition.create({
      data: {
        name: data.name,
        description: data.description,
        type: data.type,
        created_user_id: data.created_user_id,
        updated_user_id: data.updated_user_id,
        symptoms: {
          create: data.symptoms.map((symptom) => ({
            symptom: symptom,
          })),
        },
      },
    });

    return this.prisma.medicalCondition.findUnique({
      where: { condition_id: medicalCondition.condition_id },
      include: {
        symptoms: true,
      },
    });
  }

  async getAllMedicalConditions() {
    return this.prisma.medicalCondition.findMany({
      include: {
        symptoms: true,
      },
    });
  }

  async getMedicalConditionById(id: number) {
    return this.prisma.medicalCondition.findUnique({
      where: { condition_id: id },
      include: {
        symptoms: true,
      },
    });
  }

  async updateMedicalCondition(id: number, data: UpdateMedicalConditionDto) {
    await this.prisma.medicalCondition.update({
      where: { condition_id: id },
      data: {
        name: data.name,
        description: data.description,
        type: data.type,
        updated_user_id: data.updated_user_id,
        symptoms: {
          deleteMany: { condition_id: id },
          create:
            data.symptoms?.map((symptom) => ({
              symptom: symptom,
            })) || [],
        },
      },
    });

    return this.prisma.medicalCondition.findUnique({
      where: { condition_id: id },
      include: {
        symptoms: true,
      },
    });
  }

  async deleteMedicalCondition(id: number) {
    await this.prisma.medicalConditionSymptom.deleteMany({
      where: { condition_id: id },
    });

    return this.prisma.medicalCondition.delete({
      where: { condition_id: id },
    });
  }
}
