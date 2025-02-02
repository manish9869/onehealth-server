import { Type } from "class-transformer";
import {
  IsInt,
  IsOptional,
  IsArray,
  IsString,
  ValidateNested,
} from "class-validator";

export class AddCaseHistoryDto {
  @IsOptional()
  @IsInt()
  customer_id?: number;

  @IsOptional()
  @IsInt()
  staff_member_id?: number;

  @IsOptional()
  case_date?: Date;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  dental_history?: string;

  @IsOptional()
  @IsString()
  medical_history?: string;

  @IsOptional()
  @IsInt()
  created_user_id: number;

  @IsOptional()
  @IsInt()
  updated_user_id: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  case_treatments?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  case_medicines?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  case_conditions?: number[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CaseDocumentDto)
  case_documents?: CaseDocumentDto[];
}

export class UpdateCaseHistoryDto {
  @IsOptional()
  @IsInt()
  customer_id?: number;

  @IsOptional()
  @IsInt()
  staff_member_id?: number;

  @IsOptional()
  case_date?: Date;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  dental_history?: string;

  @IsOptional()
  @IsString()
  medical_history?: string;

  @IsOptional()
  @IsInt()
  updated_user_id: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  case_treatments?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  case_medicines?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  case_conditions?: number[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CaseDocumentDto)
  case_documents?: CaseDocumentDto[];
}

export class CaseDocumentDto {
  @IsOptional()
  @IsInt()
  case_id?: number;

  @IsString()
  documentType: string;

  @IsString()
  documentName: string;

  @IsString()
  documentFolder: string;

  @IsString()
  url: string;
}
