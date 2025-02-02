import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { ConnectionService } from "src/config/connection.service";
import { CreateMedicineDto, UpdateMedicineDto } from '../dto/medicine.dto';
import { Medicine } from '@prisma/client';

@Injectable()
export class MedicineService {
    constructor(private readonly prisma: ConnectionService) {}

    async findAll(): Promise<Medicine[]> {
        return await this.prisma.medicine.findMany();
    }

    async findOne(id: number): Promise<Medicine> {
        const medicine = await this.prisma.medicine.findUnique({ where: { medicine_id: id } });
        if (!medicine) throw new NotFoundException('Medicine not found');
        return medicine;
    }

    async create(createMedicineDto: CreateMedicineDto): Promise<Medicine> {
        try {
            return await this.prisma.medicine.create({ data: createMedicineDto });
        } catch (error) {
            throw new InternalServerErrorException('Failed to create medicine');
        }
    }

    async update(id: number, updateMedicineDto: UpdateMedicineDto): Promise<Medicine> {
        try {
            return await this.prisma.medicine.update({
                where: { medicine_id: id },
                data: updateMedicineDto,
            });
        } catch (error) {
            throw new NotFoundException('Medicine not found for update');
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await this.prisma.medicine.delete({ where: { medicine_id: id } });
        } catch (error) {
            throw new NotFoundException('Medicine not found for deletion');
        }
    }
}
