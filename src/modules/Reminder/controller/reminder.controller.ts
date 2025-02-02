import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { ReminderService } from "../services/reminder.service";
import { CreateReminderDto, UpdateReminderDto } from "../dto/reminder.dto";

@Controller("reminder")
export class ReminderController {
	constructor(private readonly reminderService: ReminderService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async createReminder(@Body() createReminderDto: CreateReminderDto) {
		return this.reminderService.createReminder(createReminderDto);
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	async getAllReminders() {
		return this.reminderService.getAllReminders();
	}

	@Get(":id")
	@HttpCode(HttpStatus.OK)
	async getReminderById(@Param("id") id: number) {
		return this.reminderService.getReminderById(Number(id));
	}

	@Put(":id")
	@HttpCode(HttpStatus.OK)
	async updateReminder(@Param("id") id: number, @Body() updateReminderDto: UpdateReminderDto) {
		return this.reminderService.updateReminder(Number(id), updateReminderDto);
	}

	@Delete(":id")
	@HttpCode(HttpStatus.NO_CONTENT)
	async deleteReminder(@Param("id") id: number) {
		await this.reminderService.deleteReminder(Number(id));
		return { message: `Reminder with ID ${id} has been deleted` };
	}
}
