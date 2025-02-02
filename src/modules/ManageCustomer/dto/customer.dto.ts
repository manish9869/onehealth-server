import { Type } from "class-transformer";
import {
  IsString,
  IsEmail,
  IsOptional,
  IsDate,
  IsInt,
  IsNotEmpty,
} from "class-validator";

export class AddCustomerDto {
  @IsString()
  fullname: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  mobile?: string;

  @IsOptional()
  @IsString()
  alt_mobile?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsDate({ message: "DOB must be a valid Date instance" })
  @IsNotEmpty({ message: "DOB is required" })
  @Type(() => Date) // This ensures the transformation to Date object
  DOB: Date;

  @IsOptional()
  @IsString()
  insurance_policy?: string;

  @IsOptional()
  @IsInt()
  created_user_id: number;

  @IsOptional()
  @IsInt()
  updated_user_id: number;
}

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  fullname?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  mobile?: string;

  @IsOptional()
  @IsString()
  alt_mobile?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsDate({ message: "DOB must be a valid Date instance" })
  @IsNotEmpty({ message: "DOB is required" })
  @Type(() => Date) // This ensures the transformation to Date object
  DOB: Date;

  @IsOptional()
  @IsString()
  insurance_policy?: string;

  @IsOptional()
  @IsInt()
  updated_user_id: number;
}
