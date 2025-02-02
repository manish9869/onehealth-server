import { Type } from "class-transformer";
import {
  IsString,
  IsOptional,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsDecimal,
  IsEmail,
} from "class-validator";

export class AddStaffMemberDto {
  @IsString()
  fullname: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsString()
  qualification?: string;

  @IsOptional()
  @IsString()
  specialization?: string;

  @IsOptional()
  @IsDecimal()
  consultation_fee?: number;

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
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  DOB: Date;

  @IsOptional()
  @IsInt()
  created_user_id: number;

  @IsOptional()
  @IsInt()
  updated_user_id: number;
}

export class UpdateStaffMemberDto {
  @IsOptional()
  @IsString()
  fullname?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsString()
  qualification?: string;

  @IsOptional()
  @IsString()
  specialization?: string;

  @IsOptional()
  @IsDecimal()
  consultation_fee?: number;

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
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  DOB: Date;

  @IsOptional()
  @IsInt()
  updated_user_id: number;
}
