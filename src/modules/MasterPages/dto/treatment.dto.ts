import { Type } from "class-transformer";
import {
  IsString,
  IsOptional,
  IsDecimal,
  IsInt,
  IsNumber,
} from "class-validator";

export class AddTreatmentDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber({}, { message: "Cost must be a number" })
  cost?: number;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsInt()
  created_user_id: number;

  @IsOptional()
  @IsInt()
  updated_user_id: number;
}

export class UpdateTreatmentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber({}, { message: "Cost must be a number" })
  cost?: number;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsInt()
  created_user_id?: number;

  @IsOptional()
  @IsInt()
  updated_user_id?: number;
}
