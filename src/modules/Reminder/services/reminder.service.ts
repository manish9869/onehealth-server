import { Injectable, NotFoundException } from "@nestjs/common";
import { ConnectionService } from "src/config/connection.service";
import { CreateReminderDto, UpdateReminderDto } from "../dto/reminder.dto";

@Injectable()
export class ReminderService {
	constructor(private readonly prisma: ConnectionService) {}

	// Create a new reminder
	async createReminder(createReminderDto: CreateReminderDto) {
		const reminder = await this.prisma.reminder.create({
			data: {
				title: createReminderDto.title,
				description: createReminderDto.description,
				reminder_date: new Date(createReminderDto.reminder_date),
				reminder_time: createReminderDto.reminder_time, // Include this field
				status: createReminderDto.status || "Pending",
			},
		});
		return {
			message: "Reminder created successfully",
			data: reminder,
		};
	}

	// Get all reminders
	async getAllReminders() {
		const reminders = await this.prisma.reminder.findMany();
		return {
			message: "Reminders retrieved successfully",
			data: reminders,
		};
	}

	// Get a single reminder by ID
	async getReminderById(id: number) {
		const reminder = await this.prisma.reminder.findUnique({
			where: { id },
		});

		if (!reminder) {
			throw new NotFoundException(`Reminder with ID ${id} not found`);
		}

		return {
			message: "Reminder retrieved successfully",
			data: reminder,
		};
	}

	// Update a reminder by ID
	async updateReminder(id: number, updateReminderDto: UpdateReminderDto) {
		const existingReminder = await this.prisma.reminder.findUnique({
			where: { id },
		});

		if (!existingReminder) {
			throw new NotFoundException(`Reminder with ID ${id} not found`);
		}

		const updatedReminder = await this.prisma.reminder.update({
			where: { id },
			data: {
				title: updateReminderDto.title || existingReminder.title,
				description: updateReminderDto.description || existingReminder.description,
				reminder_date: updateReminderDto.reminder_date
					? new Date(updateReminderDto.reminder_date)
					: existingReminder.reminder_date,
				reminder_time: updateReminderDto.reminder_time || existingReminder.reminder_time,
				status: updateReminderDto.status || existingReminder.status,
			},
		});

		return {
			message: "Reminder updated successfully",
			data: updatedReminder,
		};
	}

	// Delete a reminder by ID
	async deleteReminder(id: number) {
		const existingReminder = await this.prisma.reminder.findUnique({
			where: { id },
		});

		if (!existingReminder) {
			throw new NotFoundException(`Reminder with ID ${id} not found`);
		}

		await this.prisma.reminder.delete({
			where: { id },
		});

		return {
			message: "Reminder deleted successfully",
		};
	}
}
