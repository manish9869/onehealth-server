import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { ConnectionModule } from "src/config/connection.module";
import { CustomerController } from "./controller/customer.controller";
import { CustomerService } from "./services/customer.service";
import { EmailService } from "../Email/email.service";
import { AppointmentController } from "./controller/appointment.controller";
import { AppointmentService } from "./services/appointment.service";
import { CaseHistoryController } from "./controller/case-history.controller";
import { CaseHistoryService } from "./services/case-history.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [ConnectionModule],
  controllers: [
    CustomerController,
    AppointmentController,
    CaseHistoryController,
  ],
  providers: [
    CustomerService,
    AppointmentService,
    CaseHistoryService,
    EmailService,
    JwtService
  ],
  exports: [
    CustomerService,
    AppointmentService,
    CaseHistoryService,
    EmailService,
  ],
})
export class CustomerModule { }
