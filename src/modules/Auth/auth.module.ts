import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../User/user.module";
import { JwtModule } from "@nestjs/jwt";
import { ConnectionModule } from "src/config/connection.module";
import { TwoFactorAuthService } from "./two-factor-auth.service";

@Module({
  imports: [
    ConnectionModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: "m7bnyv1irsmv1xom",
      signOptions: { expiresIn: "1d" },
    }),
  ],
  providers: [AuthService, TwoFactorAuthService],
  controllers: [AuthController],
})
export class AuthModule {}
