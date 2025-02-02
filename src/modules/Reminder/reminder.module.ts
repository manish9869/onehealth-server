import { Module } from "@nestjs/common";
import { ConnectionModule } from "src/config/connection.module";
import { ReminderController } from "./controller/reminder.controller";
import { ReminderService } from "./services/reminder.service";

@Module({
	imports: [ConnectionModule],
	controllers: [ReminderController],
	providers: [ReminderService],
	exports: [ReminderService],
})
export class ReminderModule {}
