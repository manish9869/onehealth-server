import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConnectionService } from "src/config/connection.service";
import { Customer } from "@prisma/client";
import { AddCustomerDto, UpdateCustomerDto } from "./../dto/customer.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
@Injectable()
export class CustomerService {
  constructor(
    private readonly prisma: ConnectionService,
    private readonly jwtService: JwtService
  ) {}

  // Create a new customer
  async addCustomer(data: AddCustomerDto): Promise<Customer> {
    try {
      return await this.prisma.customer.create({
        data: {
          fullname: data.fullname,
          email: data.email,
          mobile: data.mobile,
          alt_mobile: data.alt_mobile,
          address: data.address,
          DOB: new Date(data.DOB),
          password: data.password,
          insurance_policy: data.insurance_policy,
          created_user_id: data.created_user_id,
          updated_user_id: data.updated_user_id,
        },
      });
    } catch (error) {
      console.error("Error creating customer:", error);
      throw new InternalServerErrorException("Failed to create customer");
    }
  }

  // Update an existing customer
  async updateCustomer(
    customerId: number,
    data: UpdateCustomerDto
  ): Promise<Customer> {
    try {
      console.log("data", data);
      const updatedCustomer = await this.prisma.customer.update({
        where: { customer_id: customerId },
        data: {
          fullname: data.fullname,
          email: data.email,
          mobile: data.mobile,
          alt_mobile: data.alt_mobile,
          address: data.address,
          password: data.password,
          DOB: data.DOB ? new Date(data.DOB) : undefined,
          insurance_policy: data.insurance_policy,
          updated_user_id: data.updated_user_id,
        },
      });
      return updatedCustomer;
    } catch (error) {
      console.error("Error updating customer:", error);
      throw new NotFoundException("Customer not found");
    }
  }

  // Get a customer by ID
  async getCustomerById(customerId: number): Promise<Customer | null> {
    try {
      const customer = await this.prisma.customer.findUnique({
        where: { customer_id: customerId },
      });
      if (!customer) {
        throw new NotFoundException("Customer not found");
      }
      return customer;
    } catch (error) {
      console.error("Error fetching customer:", error);
      throw new InternalServerErrorException("Failed to fetch customer");
    }
  }

  // Get all customers
  async getAllCustomers(): Promise<Customer[]> {
    try {
      return await this.prisma.customer.findMany();
    } catch (error) {
      console.error("Error fetching customers:", error);
      throw new InternalServerErrorException("Failed to fetch customers");
    }
  }

  // Delete a customer by ID
  async deleteCustomer(customerId: number): Promise<void> {
    try {
      await this.prisma.customer.delete({
        where: { customer_id: customerId },
      });
    } catch (error) {
      console.error("Error deleting customer:", error);
      throw new NotFoundException("Customer not found");
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      // TODO: Find the customer if not exist return error message
      let customer: any = await this.prisma.customer.findUnique({
        where: { email },
        select: {
          customer_id: true,
          email: true,
          password: true,
        },
      });
      if (!customer) {
        throw new NotFoundException("Customer not found");
      }

      const isPasswordValid = await bcrypt.compare(password, customer.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException("Invalid password");
      }

      const token = this.jwtService.sign(
        { email: customer.email, role: 7, id: customer.customer_id },
        { expiresIn: "1d", secret: process.env.JWT_SECRET_KEY }
      );
      return { token };
    } catch (error) {
      console.error("Error logging in:", error);
      throw new InternalServerErrorException("Failed to log in");
    }
  }
}
