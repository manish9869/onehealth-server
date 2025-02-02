import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import { ConnectionService } from "src/config/connection.service";
import { StaffMember } from "@prisma/client";
import {
  AddStaffMemberDto,
  UpdateStaffMemberDto,
} from "../dto/staff-member.dto";

@Injectable()
export class StaffMemberService {
  constructor(private readonly prisma: ConnectionService) {}

  async addStaffMember(data: AddStaffMemberDto): Promise<StaffMember> {
    try {
      if (!data.DOB || isNaN(new Date(data.DOB).getTime())) {
        throw new Error("Invalid Date of Birth");
      }
      return await this.prisma.staffMember.create({
        data: {
          ...data,
          DOB: new Date(data.DOB),
        },
      });
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        "meta" in error &&
        (error as any).code === "P2002" &&
        (error as any).meta.target === "StaffMember_email_key"
      ) {
        throw new Error("Email already exists. Please use a different email.");
      }
      console.error("Error creating staff member:", error);
      throw error;
    }
  }  

  async updateStaffMember(
    staffMemberId: number,
    data: UpdateStaffMemberDto
  ): Promise<StaffMember> {
    try {
      return await this.prisma.staffMember.update({
        where: { staff_member_id: staffMemberId },
        data: { ...data, DOB: data.DOB ? new Date(data.DOB) : undefined },
      });
    } catch (error) {
      console.error("Error updating staff member:", error);
      throw new NotFoundException("Staff member not found");
    }
  }

  async getStaffMemberById(staffMemberId: number): Promise<StaffMember | null> {
    try {
      return await this.prisma.staffMember.findUnique({
        where: { staff_member_id: staffMemberId },
      });
    } catch (error) {
      console.error("Error fetching staff member:", error);
      throw new InternalServerErrorException("Failed to fetch staff member");
    }
  }

  async getAllStaffMembers(): Promise<StaffMember[]> {
    try {
      return await this.prisma.staffMember.findMany();
    } catch (error) {
      console.error("Error fetching staff members:", error);
      throw new InternalServerErrorException("Failed to fetch staff members");
    }
  }

  async deleteStaffMember(staffMemberId: number): Promise<void> {
    try {
      await this.prisma.staffMember.delete({
        where: { staff_member_id: staffMemberId },
      });
    } catch (error) {
      console.error("Error deleting staff member:", error);
      throw new NotFoundException("Staff member not found");
    }
  }
}
