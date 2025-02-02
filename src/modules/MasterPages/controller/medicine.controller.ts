import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from "@nestjs/common";
import { MedicineService } from "../services/medicine.service";
import { CreateMedicineDto, UpdateMedicineDto } from "../dto/medicine.dto";
import { AuthGuard } from "src/modules/Auth/auth.guard";
import { AuthenticatedRequest } from "src/modules/Auth/auth-request.interface";
@Controller("medicine")
@UseGuards(AuthGuard)
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Get()
  async findAll() {
    return this.medicineService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    return this.medicineService.findOne(id);
  }

  @Post()
  async create(
    @Body() createMedicineDto: CreateMedicineDto,
    @Req() req: AuthenticatedRequest
  ) {
    const loggedUserId = req.loggedInUser;
    const data = {
      ...createMedicineDto,
      created_user_id: loggedUserId,
      updated_user_id: loggedUserId,
    };
    return this.medicineService.create(data);
  }

  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() updateMedicineDto: UpdateMedicineDto,
    @Req() req: AuthenticatedRequest
  ) {
    const loggedUserId = req.loggedInUser;
    const data = {
      ...updateMedicineDto,
      updated_user_id: loggedUserId,
    };
    return this.medicineService.update(id, data);
  }

  @Delete(":id")
  async delete(@Param("id") id: number) {
    return this.medicineService.delete(id);
  }
}
