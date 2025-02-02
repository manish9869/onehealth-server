import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { ConnectionModule } from "src/config/connection.module";
import { UserController } from "./controller/user.controller";
import { UserService } from "./services/user.service";
import { EmailService } from "src/modules/Email/email.service";

@Module({
  imports: [ConnectionModule],
  controllers: [UserController],
  providers: [UserService, EmailService],
  exports: [UserService, EmailService],
})
export class UserModule {}
