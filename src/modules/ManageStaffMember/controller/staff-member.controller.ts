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
import { StaffMemberService } from "../services/staff-member.service";
import {
  AddStaffMemberDto,
  UpdateStaffMemberDto,
} from "../dto/staff-member.dto";
import { AuthenticatedRequest } from "src/modules/Auth/auth-request.interface";
import { AuthGuard } from "src/modules/Auth/auth.guard";

@Controller("staff-member")
@UseGuards(AuthGuard)
export class StaffMemberController {
  constructor(private readonly staffMemberService: StaffMemberService) {}

  @Post()
  async create(
    @Body() staffMemberDto: AddStaffMemberDto,
    @Req() req: AuthenticatedRequest,
    @Res() res: Response
  ): Promise<any> {
    try {
      const data = {
        ...staffMemberDto,
        created_user_id: req.loggedInUser,
        updated_user_id: req.loggedInUser,
      };
      console.log('Data received on server:', data);
      const staffMember = await this.staffMemberService.addStaffMember(data);
      res.status(HttpStatus.CREATED).json({
        status: "success",
        data: staffMember,
        message: "Staff member created successfully",
      });
    } catch (error) {
      throw new HttpException(
        `Failed to create staff member: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  async findAll(@Res() res: Response): Promise<any> {
    try {
      const staffMembers = await this.staffMemberService.getAllStaffMembers();
      res.status(HttpStatus.OK).json({
        status: "success",
        data: staffMembers,
        message: "Staff members fetched successfully",
      });
    } catch (error) {
      throw new HttpException(
        `Failed to fetch staff members: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":id")
  async findOne(
    @Param("id") staffMemberId: number,
    @Res() res: Response
  ): Promise<any> {
    try {
      const staffMember =
        await this.staffMemberService.getStaffMemberById(staffMemberId);
      if (!staffMember)
        throw new HttpException("Staff member not found", HttpStatus.NOT_FOUND);
      res.status(HttpStatus.OK).json({
        status: "success",
        data: staffMember,
        message: "Staff member fetched successfully",
      });
    } catch (error) {
      throw new HttpException(
        `Failed to fetch staff member: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put(":id")
  async update(
    @Param("id") staffMemberId: number,
    @Body() staffMemberDto: UpdateStaffMemberDto,
    @Req() req: AuthenticatedRequest,
    @Res() res: Response
  ): Promise<any> {
    try {
      const data = { ...staffMemberDto, updated_user_id: req.loggedInUser };
      const staffMember = await this.staffMemberService.updateStaffMember(
        staffMemberId,
        data
      );
      res.status(HttpStatus.OK).json({
        status: "success",
        data: staffMember,
        message: "Staff member updated successfully",
      });
    } catch (error) {
      throw new HttpException(
        `Failed to update staff member: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(":id")
  async remove(
    @Param("id") staffMemberId: number,
    @Res() res: Response
  ): Promise<any> {
    try {
      await this.staffMemberService.deleteStaffMember(staffMemberId);
      res.status(HttpStatus.NO_CONTENT).json({
        status: "success",
        message: "Staff member deleted successfully",
      });
    } catch (error) {
      throw new HttpException(
        `Failed to delete staff member: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
