import { IsString, IsOptional, IsArray, IsInt } from "class-validator";

export class AddMedicalConditionDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsArray()
  @IsString({ each: true })
  symptoms: string[];

  @IsOptional()
  @IsInt()
  created_user_id: number;

  @IsOptional()
  @IsInt()
  updated_user_id: number;
}
export class UpdateMedicalConditionDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  symptoms?: string[];

  @IsOptional()
  @IsInt()
  updated_user_id?: number;
}
