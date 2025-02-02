import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import moment from "moment";
import { ConnectionService } from "src/config/connection.service";
import {
  AddCustomerAppointmentDto,
  UpdateCustomerAppointmentDto,
} from "./../dto/appointment.dto";

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: ConnectionService) {}
  async create(data: AddCustomerAppointmentDto) {
    try {
      await this.checkForConflicts(
        data.staff_member_id,
        data.appointment_date,
        data.duration
      );
      return await this.prisma.customerAppointment.create({
        data: {
          customer: { connect: { customer_id: data.customer_id } },
          staff_member: { connect: { staff_member_id: data.staff_member_id } },
          appointment_date: data.appointment_date,
          duration: data.duration,
          reason: data.reason,
          status: data.status,
          creator: { connect: { user_id: data.created_user_id } },
          updater: data.updated_user_id
            ? { connect: { user_id: data.updated_user_id } }
            : undefined,
        },
        include: {
          customer: true, // Include customer data
          staff_member: true, // Include staff member data
        },
      });
    } catch (error) {
      console.log("error", error);
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(
        "Failed to create appointment. Please try again later."
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.customerAppointment.findMany({
        include: {
          customer: true, // Include customer data
          staff_member: true, // Include staff member data
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        "Failed to retrieve appointments. Please try again later."
      );
    }
  }

  async findOne(id: number) {
    try {
      const appointment = await this.prisma.customerAppointment.findUnique({
        where: { appointment_id: id },
        include: {
          customer: true, // Include customer data
          staff_member: true, // Include staff member data
        },
      });
      if (!appointment) {
        throw new NotFoundException(`Appointment with ID ${id} not found`);
      }
      return appointment;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        "Failed to retrieve appointment. Please try again later."
      );
    }
  }

  async update(id: number, data: UpdateCustomerAppointmentDto) {
    try {
      await this.findOne(id); // Check if appointment exists
      if (data.appointment_date && data.staff_member_id) {
        await this.checkForConflicts(
          data.staff_member_id,
          data.appointment_date,
          data.duration,
          id
        );
      }

      const updateData: any = {
        appointment_date: data.appointment_date,
        duration: data.duration,
        reason: data.reason,
        status: data.status,
      };

      if (data.customer_id) {
        updateData.customer = { connect: { customer_id: data.customer_id } };
      }
      if (data.staff_member_id) {
        updateData.staff_member = {
          connect: { staff_member_id: data.staff_member_id },
        };
      }
      if (data.updated_user_id) {
        updateData.updater = { connect: { user_id: data.updated_user_id } };
      }

      return await this.prisma.customerAppointment.update({
        where: { appointment_id: id },
        data: updateData,
        include: {
          customer: true, // Include customer data
          staff_member: true, // Include staff member data
        },
      });
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      )
        throw error;

      throw new InternalServerErrorException(
        "Failed to update appointment. Please try again later."
      );
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      return await this.prisma.customerAppointment.delete({
        where: { appointment_id: id },
        include: {
          customer: true,
          staff_member: true,
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        "Failed to delete appointment. Please try again later."
      );
    }
  }

  private async checkForConflicts(
    staff_member_id: number,
    appointment_date: Date,
    duration: number,
    excludeId?: number
  ) {
    try {
      // Calculate the end time of the new appointment request
      const newAppointmentEndTime = new Date(
        appointment_date.getTime() + duration * 60000
      );

      // Retrieve any appointments that could potentially overlap with the new appointment
      const conflictingAppointments =
        await this.prisma.customerAppointment.findMany({
          where: {
            staff_member_id,
            NOT: excludeId ? { appointment_id: excludeId } : undefined,
            status: { not: "canceled" },
          },
        });

      // Check for overlaps by calculating each existing appointment's end time
      for (const appointment of conflictingAppointments) {
        const existingAppointmentEndTime = new Date(
          appointment.appointment_date.getTime() + appointment.duration * 60000
        );

        const newStartDuringExisting =
          appointment_date >= appointment.appointment_date &&
          appointment_date < existingAppointmentEndTime;

        const newEndDuringExisting =
          newAppointmentEndTime > appointment.appointment_date &&
          newAppointmentEndTime <= existingAppointmentEndTime;

        const newEncompassesExisting =
          appointment_date <= appointment.appointment_date &&
          newAppointmentEndTime >= existingAppointmentEndTime;

        if (
          newStartDuringExisting ||
          newEndDuringExisting ||
          newEncompassesExisting
        ) {
          throw new BadRequestException(
            `The appointment conflicts with an existing appointment for this staff member at ${moment(
              appointment.appointment_date
            ).format(
              "YYYY-MM-DD hh:mm A"
            )} for ${appointment.duration} minutes.`
          );
        }
      }
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(
        "Failed to check for appointment conflicts. Please try again later."
      );
    }
  }
}
