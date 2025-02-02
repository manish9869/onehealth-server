import { Injectable, UnauthorizedException, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConnectionService } from "src/config/connection.service";
import { TwoFactorAuthService } from "./two-factor-auth.service";
import * as nodemailer from "nodemailer";
// import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private readonly prisma: ConnectionService,
		private readonly twoFactorAuthService: TwoFactorAuthService
	) {}

	async signIn(email: string, pass: string): Promise<any> {
		try {
			const user = await this.prisma.user.findFirst({
				where: { user_email: email },
			});

			if (!user) {
				throw new UnauthorizedException("User does not exist");
			}

			if (user.password !== pass) {
				throw new UnauthorizedException("Incorrect password");
			}

			let secretKey = "";
			let twoFaQrUrl = "";

			if (user.is_twofa_enabled === false) {
				const secret = await this.twoFactorAuthService.generate2faAuthCode(user.user_email);

				twoFaQrUrl = secret.qrUrl;
				secretKey = secret.base32;

				await this.prisma.user.update({
					where: { user_id: user.user_id },
					data: { twofa_auth_code: secret.base32 },
				});
			} else {
				secretKey = user.twofa_auth_code;
			}

			return {
				user: {
					id: user.user_id,
					username: user.user_name,
					email: user.user_email,
					role: user.role_id,
					profile_img: user.profile_img,
					org_id: user.org_id,
					is_twofa_enabled: user.is_twofa_enabled === true,
				},
				secretKey,
				twoFaQrUrl,
				expiresIn: 3600,
			};
		} catch (error) {
			throw new UnauthorizedException(error);
		}
	}

	// Verifies the OTP token from 2FA
	async verifyOTP(secret: string, token: string, email: string): Promise<any> {
		const isVerified = this.twoFactorAuthService.verify2faAuthCode(secret, token);

		if (isVerified) {
			// Update user to enable 2FA
			await this.prisma.user.update({
				where: { twofa_auth_code: secret },
				data: { is_twofa_enabled: true, last_login: new Date(), status: 1 },
			});
			const user = await this.prisma.user.findFirst({
				where: { user_email: email },
			});
			const payload = {
				id: user.user_id,
				username: user.user_name,
				email: user.user_email,
				role: user.role_id,
				org_id: user.org_id,
			};

			let token: string;
			try {
				token = await this.jwtService.signAsync(payload);
			} catch (error) {
				console.error("JWT Signing Error:", error);
				throw new UnauthorizedException("Error signing the token");
			}
			return {
				verified: true,
				user: {
					...user,
					token,
				},
				message: "OTP verification successful.",
			};
		} else {
			throw new UnauthorizedException({
				verified: false,
				message: "OTP verification failed.",
			});
		}
	}

	// Forgot Password Logic
	async forgotPassword(email: string): Promise<any> {
		const user = await this.prisma.user.findFirst({
			where: { user_email: email },
		});

		if (!user) {
			throw new NotFoundException("User with this email does not exist");
		}

		// Generate a password reset token and expiry
		const resetToken = uuidv4();
		const resetTokenExpiry = new Date();
		resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1); // Token valid for 1 hour

		// Save the reset token and expiry in the database
		await this.prisma.user.update({
			where: { user_id: user.user_id },
			data: {
				reset_password_token: resetToken,
				reset_password_expiry: resetTokenExpiry,
			},
		});

		// Send the reset email (replace with your email logic)
		await this.sendResetEmail(user.user_email, resetToken);

		return { message: "Password reset link has been sent to your email" };
	}

	// Reset Password Logic
	async resetPassword(token: string, newPassword: string): Promise<any> {
		const user = await this.prisma.user.findFirst({
			where: { reset_password_token: token },
		});

		if (!user || new Date() > user.reset_password_expiry) {
			throw new UnauthorizedException("Invalid or expired password reset token");
		}

		// Directly update the new password (without encryption)
		await this.prisma.user.update({
			where: { user_id: user.user_id },
			data: {
				password: newPassword,
				reset_password_token: null,
				reset_password_expiry: null,
			},
		});

		return { message: "Password has been reset successfully" };
	}

	private async sendResetEmail(email: string, token: string): Promise<void> {
		const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;

		// Use nodemailer to send the email
		const transporter = nodemailer.createTransport({
			service: "Gmail", // Example: replace with your email provider
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: email,
			subject: "Password Reset Request",
			text: `You requested a password reset. Click the link below to reset your password:\n\n${resetUrl}`,
		};

		try {
			await transporter.sendMail(mailOptions);
			console.log("Password reset email sent successfully.");
		} catch (error) {
			console.error("Error sending password reset email:", error);
			throw new Error("Failed to send password reset email");
		}
	}
}
