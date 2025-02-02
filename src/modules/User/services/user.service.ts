import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import { ConnectionService } from "src/config/connection.service";
import { User } from "@prisma/client";
import { AddUserDto, UpdateUserDto } from "../dto/user.dto";
import * as bcrypt from "bcrypt";
@Injectable()
export class UserService {
  constructor(private readonly prisma: ConnectionService) {}

  async addUser(data: AddUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      return await this.prisma.user.create({
        data: {
          user_name: data.user_name,
          profile_img: data.profile_img,
          password: hashedPassword,
          user_email: data.user_email,
          role_id: Number(data.role_id),
          status: data.status ? Number(data.status) : 1,
          twofa_auth_code: null,
          is_twofa_enabled: false,
          org_id: data.org_id,
        },
      });
    } catch (error) {
      console.log("error", error);
      throw new InternalServerErrorException("Failed to create user");
    }
  }

  async updateUserData(userId: number, data: UpdateUserDto): Promise<User> {
    try {
      const updatedData: any = {
        user_name: data.user_name,
        profile_img: data.profile_img,
        user_email: data.user_email,
        role_id: data.role_id,
        ...(data.status !== undefined && { status: data.status }),
        ...(data.twofa_auth_code !== undefined && {
          twofa_auth_code: data.twofa_auth_code,
        }),
        ...(data.is_twofa_enabled !== undefined && {
          is_twofa_enabled: data.is_twofa_enabled,
        }),
      };

      // Hash the password if it's being updated
      if (data.password) {
        updatedData.password = await bcrypt.hash(data.password, 10);
      }

      return await this.prisma.user.update({
        where: { user_id: Number(userId) },
        data: updatedData,
      });
    } catch (error) {
      if (error) {
        throw new NotFoundException("User not found");
      }
      throw new InternalServerErrorException("Failed to update user");
    }
  }

  async getUserDataById(userId: number): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { user_id: userId },
      });
    } catch (error) {
      throw new InternalServerErrorException("Failed to fetch user");
    }
  }

  async getAllUserData(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      throw new InternalServerErrorException("Failed to fetch users");
    }
  }

  async deleteUserData(userId: number): Promise<void> {
    try {
      console.log("userId", userId);
      await this.prisma.user.delete({
        where: { user_id: Number(userId) },
      });
    } catch (error) {
      console.log("error", error);
      if (error) {
        throw new NotFoundException("User not found");
      }
      throw new InternalServerErrorException("Failed to delete user");
    }
  }
}
