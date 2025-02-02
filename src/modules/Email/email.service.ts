import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

interface EmailDTO {
  recipients: string[];
  subject: string;
  html: string;
  attachments?: any[];
}

@Injectable()
export class EmailService {
  private async createTransport() {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Verify the transporter configuration
      await transporter.verify();
      return transporter;
    } catch (error) {
      console.error("Error setting up email transport: ", error);
      throw new Error("Failed to create email transporter");
    }
  }

  async sendEmail(dto: EmailDTO) {
    const { recipients, subject, html, attachments } = dto;

    try {
      const transport = await this.createTransport();

      const options: nodemailer.SendMailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: recipients, // List of recipients
        subject, // Subject line
        html, // HTML content
        attachments,
      };

      await transport.sendMail(options);
    } catch (error) {
      throw new Error("Failed to send email");
    }
  }
}
