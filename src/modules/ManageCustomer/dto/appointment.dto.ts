// dto/customer-appointment.dto.ts
import { Type } from "class-transformer";
import {
  IsInt,
  IsOptional,
  IsString,
  IsDate,
  IsNotEmpty,
} from "class-validator";

export class AddCustomerAppointmentDto {
  @IsOptional()
  @IsInt()
  customer_id?: number;

  @IsOptional()
  @IsInt()
  staff_member_id?: number;

  @IsDate({ message: "Appointment date must be a valid Date instance" })
  @IsNotEmpty({ message: "Appointment date is required" })
  @Type(() => Date)
  appointment_date: Date;

  @IsOptional()
  @IsInt()
  duration?: number;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsInt()
  created_user_id: number;

  @IsOptional()
  @IsInt()
  updated_user_id?: number;
}

export class UpdateCustomerAppointmentDto {
  @IsOptional()
  @IsInt()
  customer_id?: number;

  @IsOptional()
  @IsInt()
  staff_member_id?: number;

  @IsOptional()
  @IsDate({ message: "Appointment date must be a valid Date instance" })
  @Type(() => Date)
  appointment_date?: Date;

  @IsOptional()
  @IsInt()
  duration?: number;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsInt()
  created_user_id?: number;

  @IsOptional()
  @IsInt()
  updated_user_id?: number;
}
