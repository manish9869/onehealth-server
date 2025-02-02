import { Type } from "class-transformer";
import { IsString, IsOptional, IsNumber, IsInt, IsDate } from "class-validator";

export class CreateInvoiceDto {
  @IsOptional()
  @IsString()
  invoiceNumber: string;

  @IsOptional()
  @IsInt()
  customer_id?: number;

  @IsOptional()
  @IsInt()
  case_id?: number;

  @IsNumber()
  discount: number;

  @IsNumber()
  totalDiscountAmount: number;

  @IsNumber()
  tax: number;

  @IsNumber()
  totaltaxAmount: number;

  @IsNumber()
  totalAmount: number;

  @IsNumber()
  amountPaid: number;

  @IsNumber()
  pendingAmount: number;

  @IsString()
  paymentMode: string;

  @Type(() => Date)
  @IsDate()
  issueDate: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dueDate: Date;

  @IsString()
  status: string;

  @IsOptional()
  @IsInt()
  created_user_id: number;

  @IsOptional()
  @IsInt()
  updated_user_id: number;
}

export class UpdateInvoiceDto {
  @IsOptional()
  @IsString()
  invoiceNumber?: string;

  @IsOptional()
  @IsInt()
  customer_id?: number;

  @IsOptional()
  @IsInt()
  case_id?: number;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsNumber()
  totalDiscountAmount?: number;

  @IsOptional()
  @IsNumber()
  tax?: number;

  @IsOptional()
  @IsNumber()
  totaltaxAmount?: number;

  @IsOptional()
  @IsNumber()
  totalAmount?: number;

  @IsOptional()
  @IsNumber()
  amountPaid?: number;

  @IsOptional()
  @IsNumber()
  pendingAmount?: number;

  @IsOptional()
  @IsString()
  paymentMode?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  issueDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dueDate?: Date;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsInt()
  updated_user_id: number;
}
