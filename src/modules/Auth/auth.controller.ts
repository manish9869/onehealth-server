import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	UnauthorizedException,
	UseInterceptors,
	NotFoundException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ResponseHandlerInterceptor } from "src/helpers/ResponseHandlerInterceptor";

@UseInterceptors(ResponseHandlerInterceptor)
@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post("login")
	async signIn(@Body() signInDto: Record<string, any>) {
		const { email, password } = signInDto;
		const result = await this.authService.signIn(email, password);
		return result;
	}

	@HttpCode(HttpStatus.OK)
	@Post("verify-otp")
	async verifyOTP(@Body() { secret, token, email }: { secret: string; token: string; email: string }) {
		return this.authService.verifyOTP(secret, token, email);
	}

	@HttpCode(HttpStatus.OK)
	@Post("forgot-password")
	async forgotPassword(@Body("email") email: string) {
		try {
			return await this.authService.forgotPassword(email);
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw new NotFoundException("User with this email does not exist");
			}
			throw new UnauthorizedException("Failed to process password reset request");
		}
	}

	@HttpCode(HttpStatus.OK)
	@Post("reset-password")
	async resetPassword(@Body() body: { token: string; newPassword: string }) {
		try {
			const { token, newPassword } = body;
			return await this.authService.resetPassword(token, newPassword);
		} catch (error) {
			throw new UnauthorizedException("Failed to reset password");
		}
	}
}
