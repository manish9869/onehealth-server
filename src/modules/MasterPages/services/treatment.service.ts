import { Injectable } from "@nestjs/common";
import { AddTreatmentDto, UpdateTreatmentDto } from "../dto/treatment.dto";
import { Treatment } from "@prisma/client";
import { ConnectionService } from "src/config/connection.service";
@Injectable()
export class TreatmentService {
  constructor(private readonly prisma: ConnectionService) {}

  async addTreatment(data: AddTreatmentDto): Promise<Treatment> {
    return this.prisma.treatment.create({
      data,
    });
  }

  async getAllTreatments(): Promise<Treatment[]> {
    return this.prisma.treatment.findMany();
  }

  async getTreatmentById(treatmentId: number): Promise<Treatment> {
    return this.prisma.treatment.findUnique({
      where: { treatment_id: Number(treatmentId) },
    });
  }

  async updateTreatment(
    treatmentId: number,
    data: UpdateTreatmentDto
  ): Promise<Treatment> {
    return this.prisma.treatment.update({
      where: { treatment_id: Number(treatmentId) },
      data,
    });
  }

  async deleteTreatment(treatmentId: number): Promise<void> {
    await this.prisma.treatment.delete({
      where: { treatment_id: Number(treatmentId) },
    });
  }
}
