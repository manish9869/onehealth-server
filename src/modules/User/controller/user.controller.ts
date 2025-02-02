import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { UserService } from "../services/user.service";
import { AddUserDto, UpdateUserDto } from "../dto/user.dto";
import { AuthGuard } from "../../Auth/auth.guard";
import { EmailService } from "src/modules/Email/email.service";

@Controller("users")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService
  ) {}

  @Post()
  async create(@Body() userDto: AddUserDto): Promise<User> {
    try {
      console.log("userDto", userDto);
      return await this.userService.addUser(userDto);
    } catch (error) {
      throw new HttpException(
        "Failed to create user",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post(":id/send-email")
  async sendEmail(@Param("id") userId: number): Promise<void> {
    try {
      // Retrieve user data
      const user: any = await this.userService.getUserDataById(userId);
      if (!user) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }

      // Prepare email data
      const emailDTO = {
        recipients: [user.user_email], // Assuming the user object contains an email field
        subject: "Your Credentials",
        html: `<h1>Hello ${user.user_name}</h1><p>Your credentials are... ${user.password}</p>`,
      };

      // Send email
      await this.emailService.sendEmail(emailDTO);

      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      throw new HttpException(
        "Failed to send email",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  @Get()
  async findAll(): Promise<User[]> {
    try {
      return await this.userService.getAllUserData();
    } catch (error) {
      throw new HttpException(
        "Failed to fetch users",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async findOne(@Param("id") userId: number): Promise<User> {
    try {
      const user = await this.userService.getUserDataById(userId);
      if (!user) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException(
        "Failed to fetch user",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put(":id")
  async update(
    @Param("id") userId: number,
    @Body() userDto: UpdateUserDto
  ): Promise<User> {
    try {
      return await this.userService.updateUserData(userId, userDto);
    } catch (error) {
      throw new HttpException(
        "Failed to update user",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(":id")
  async remove(@Param("id") userId: number): Promise<void> {
    try {
      console.log("userId--", userId);
      await this.userService.deleteUserData(userId);
    } catch (error) {
      throw new HttpException(
        "Failed to delete user",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
