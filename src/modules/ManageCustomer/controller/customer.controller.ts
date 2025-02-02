import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Res,
  HttpException,
  HttpStatus,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { AddCustomerDto, UpdateCustomerDto } from "../dto/customer.dto";
import { CustomerService } from "../services/customer.service";
import { Prisma } from "@prisma/client";
import { AuthGuard } from "src/modules/Auth/auth.guard";
import { AuthenticatedRequest } from "src/modules/Auth/auth-request.interface";
import { EmailService } from "src/modules/Email/email.service";
import * as bcrypt from "bcrypt";
@Controller("customer")
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly emailService: EmailService
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() customerDto: AddCustomerDto,
    @Req() req: AuthenticatedRequest,
    @Res() res: Response
  ): Promise<any> {
    try {
      const userId = req.loggedInUser;
      const hashedPassword = await bcrypt.hash(customerDto.password, 10);
      const data = {
        ...customerDto,
        password: hashedPassword,
        created_user_id: userId,
        updated_user_id: userId,
      };
      const customer = await this.customerService.addCustomer(data);
      res.status(HttpStatus.CREATED).json({
        status: "success",
        data: customer,
        message: "Customer created successfully",
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new HttpException(
            `Customer with the same unique fields already exists: ${error.meta?.target}`,
            HttpStatus.BAD_REQUEST
          );
        }
      }
      throw new HttpException(
        `Failed to create customer: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post(":id/send-email")
  @UseGuards(AuthGuard)
  async sendEmail(@Param("id") userId: number): Promise<void> {
    try {
      const user: any = await this.customerService.getCustomerById(userId);
      if (!user) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }

      const emailDTO = {
        recipients: [user.email],
        subject: "Your Credentials",
        html: `<h1>Hello ${user.fullname}</h1><p>Your credentials are... ${user.password}</p>`,
      };

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
  @UseGuards(AuthGuard)
  async findAll(@Res() res: Response): Promise<any> {
    try {
      const customers = await this.customerService.getAllCustomers();
      res.status(HttpStatus.OK).json({
        status: "success",
        data: customers,
        message: "Customers fetched successfully",
      });
    } catch (error) {
      throw new HttpException(
        `Failed to fetch customers: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  async findOne(
    @Param("id") customerId: number,
    @Res() res: Response
  ): Promise<any> {
    try {
      const customer = await this.customerService.getCustomerById(customerId);
      if (!customer) {
        throw new HttpException("Customer not found", HttpStatus.NOT_FOUND);
      }
      res.status(HttpStatus.OK).json({
        status: "success",
        data: customer,
        message: "Customer fetched successfully",
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new HttpException("Customer not found", HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        `Failed to fetch customer: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put(":id")
  @UseGuards(AuthGuard)
  async update(
    @Param("id") customerId: number,
    @Body() customerDto: UpdateCustomerDto,
    @Req() req: AuthenticatedRequest,
    @Res() res: Response
  ): Promise<any> {
    try {
      const userId = req.loggedInUser;
      if (customerDto.password) {
        customerDto.password = await bcrypt.hash(customerDto.password, 10); // Hash the new password
      }
      const data = {
        ...customerDto,
        updated_user_id: userId,
      };
      console.log("data update", data);
      const customer = await this.customerService.updateCustomer(
        customerId,
        data
      );
      res.status(HttpStatus.OK).json({
        status: "success",
        data: customer,
        message: "Customer updated successfully",
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new HttpException(
          "Customer not found for update",
          HttpStatus.NOT_FOUND
        );
      }
      throw new HttpException(
        `Failed to update customer: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  async remove(
    @Param("id") customerId: number,
    @Req() req: AuthenticatedRequest,
    @Res() res: Response
  ): Promise<any> {
    try {
      // Optionally, you can use the loggedInUser here for logging or other purposes
      const userId = req.loggedInUser;
      await this.customerService.deleteCustomer(customerId);
      res.status(HttpStatus.NO_CONTENT).json({
        status: "success",
        message: "Customer deleted successfully",
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new HttpException(
          "Customer not found for deletion",
          HttpStatus.NOT_FOUND
        );
      }
      throw new HttpException(
        `Failed to delete customer: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post("login")
  @UseGuards()
  async login(@Body() loginData: { email: string; password: string }) {
    return this.customerService.login(loginData.email, loginData.password);
  }
}
