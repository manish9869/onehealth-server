import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";

import { EmailService } from "../Email/email.service";
import { InvoiceController } from "./controller/invoice.controller";
import { InvoiceService } from "./services/invoice.service";
import { ConnectionModule } from "../../config/connection.module";
@Module({
  imports: [ConnectionModule],
  controllers: [InvoiceController],
  providers: [InvoiceService, EmailService],
  exports: [EmailService, InvoiceService],
})
export class FinanceModule {}
