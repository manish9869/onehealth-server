import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
  Put,
} from "@nestjs/common";
import { AppointmentService } from "./../services/appointment.service";
import {
  AddCustomerAppointmentDto,
  UpdateCustomerAppointmentDto,
} from "./../dto/appointment.dto";
import { AuthenticatedRequest } from "src/modules/Auth/auth-request.interface";
import { AuthGuard } from "src/modules/Auth/auth.guard";

@Controller("appointments")
@UseGuards(AuthGuard)
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async create(
    @Body() createAppointmentDto: AddCustomerAppointmentDto,
    @Req() req: AuthenticatedRequest
  ) {
    try {
      const userId = req.loggedInUser;
      const appointmentData = {
        ...createAppointmentDto,
        created_user_id: userId,
        updated_user_id: userId,
      };
      return this.appointmentService.create(appointmentData);
    } catch (error) {
      throw new HttpException(
        `Failed to create appointment: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  async findAll() {
    return this.appointmentService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.appointmentService.findOne(id);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateAppointmentDto: UpdateCustomerAppointmentDto,
    @Req() req: AuthenticatedRequest
  ) {
    try {
      const userId = req.loggedInUser;
      const appointmentData = {
        ...updateAppointmentDto,
        updated_user_id: userId,
      };
      return this.appointmentService.update(id, appointmentData);
    } catch (error) {
      throw new HttpException(
        `Failed to update appointment: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.appointmentService.remove(id);
  }
}
