import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { ConnectionModule } from "src/config/connection.module";
import { EmailService } from "src/modules/Email/email.service";
import { StaffMemberController } from "./controller/staff-member.controller";
import { StaffMemberService } from "./services/staff-member.service";

@Module({
  imports: [ConnectionModule],
  controllers: [StaffMemberController],
  providers: [StaffMemberService, EmailService],
  exports: [StaffMemberService, EmailService],
})
export class StaffMemberModule {}
