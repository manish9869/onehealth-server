import { IsNotEmpty, IsString, IsDateString, IsOptional, IsTimeZone } from "class-validator";

export class CreateReminderDto {
	@IsNotEmpty()
	@IsString()
	title: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsNotEmpty()
	@IsDateString()
	reminder_date: string;

	@IsNotEmpty()
	@IsString()
	reminder_time: string;

	@IsOptional()
	@IsString()
	status?: string;
}

export class UpdateReminderDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	title?: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	description?: string;

	@IsOptional()
	@IsDateString()
	reminder_date?: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	reminder_time?: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	status?: string;
}
