import { Logger, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { ConnectionModule } from "./config/connection.module";
import { HttpServiceModule } from "./http-service/http-service.module";
import { UserModule } from "./modules/User/user.module";
import { AuthModule } from "./modules/Auth/auth.module";
import { FeaturePermissionModule } from "./modules/feature-permission/feature-permission.module";
import { FeaturePermissionController } from "./modules/feature-permission/controller/feature-permission.controller";
import { FeaturePermissionService } from "./modules/feature-permission/services/feature-permission.service";
import { MasterPageModule } from "./modules/MasterPages/master-page.module";
import { CustomerModule } from "./modules/ManageCustomer/customer.module";
import { StaffMemberModule } from "./modules/ManageStaffMember/staff-member.module";
import { ExpenseModule } from "./modules/Expense/expense.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { UploadsModule } from "./modules/MediaUpload/upload.module";
import { FinanceModule } from "./modules/Finance/finance.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { ReminderModule } from "./modules/Reminder/reminder.module";

@Module({
	imports: [
		AuthModule,
		ConnectionModule,
		HttpServiceModule,
		UserModule,
		MasterPageModule,
		StaffMemberModule,
		ExpenseModule,
		CustomerModule,
		FinanceModule,
		UploadsModule,
		ServeStaticModule.forRoot(
			{
				rootPath: join(__dirname, "..", "public", "media-files"), // Path to the directory where images are saved
				serveRoot: "/media-files", // URL path where images will be served
			},
			{
				rootPath: join(__dirname, "..", "src", "templates"), // Path to your templates directory (where your CSS file is located)
				serveRoot: "/templates", // URL path to access templates
			}
		),
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		FeaturePermissionModule,
		DashboardModule,
		ReminderModule,
	],
	controllers: [AppController, FeaturePermissionController],
	providers: [AppService, Logger, FeaturePermissionService],
})
export class AppModule {}
