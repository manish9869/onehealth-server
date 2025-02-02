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
import {
  AddMedicalConditionDto,
  UpdateMedicalConditionDto,
} from "../dto/medical-condition.dto";
import { MedicalConditionService } from "../services/medical-condition.service";
import { AuthenticatedRequest } from "src/modules/Auth/auth-request.interface";
import { AuthGuard } from "src/modules/Auth/auth.guard";

@Controller("medical-condition")
@UseGuards(AuthGuard)
export class MedicalConditionController {
  constructor(
    private readonly medicalConditionService: MedicalConditionService
  ) {}

  @Post()
  async create(
    @Body() medicalConditionDto: AddMedicalConditionDto,
    @Req() req: AuthenticatedRequest,
    @Res() res: Response
  ): Promise<any> {
    try {
      const loggedUserId = req.loggedInUser;

      const medicalCondition =
        await this.medicalConditionService.createMedicalCondition({
          ...medicalConditionDto,
          created_user_id: loggedUserId,
          updated_user_id: loggedUserId,
        });
      res.status(HttpStatus.CREATED).json({
        status: "success",
        data: medicalCondition,
        message: "Medical condition created successfully",
      });
    } catch (error) {
      throw new HttpException(
        `Failed to create medical condition: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  async findAll(@Res() res: Response): Promise<any> {
    try {
      const conditions =
        await this.medicalConditionService.getAllMedicalConditions();
      res.status(HttpStatus.OK).json({
        status: "success",
        data: conditions,
        message: "Medical conditions fetched successfully",
      });
    } catch (error) {
      throw new HttpException(
        `Failed to fetch medical conditions: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":id")
  async findOne(
    @Param("id") conditionId: number,
    @Res() res: Response
  ): Promise<any> {
    try {
      const condition =
        await this.medicalConditionService.getMedicalConditionById(conditionId);
      if (!condition) {
        throw new HttpException(
          "Medical condition not found",
          HttpStatus.NOT_FOUND
        );
      }
      res.status(HttpStatus.OK).json({
        status: "success",
        data: condition,
        message: "Medical condition fetched successfully",
      });
    } catch (error) {
      throw new HttpException(
        `Failed to fetch medical condition: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put(":id")
  async update(
    @Param("id") conditionId: number,
    @Body() medicalConditionDto: UpdateMedicalConditionDto,
    @Req() req: AuthenticatedRequest,
    @Res() res: Response
  ): Promise<any> {
    try {
      const loggedUserId = req.loggedInUser;
      const condition =
        await this.medicalConditionService.updateMedicalCondition(conditionId, {
          ...medicalConditionDto,
          updated_user_id: loggedUserId,
        });
      res.status(HttpStatus.OK).json({
        status: "success",
        data: condition,
        message: "Medical condition updated successfully",
      });
    } catch (error) {
      throw new HttpException(
        `Failed to update medical condition: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(":id")
  async remove(
    @Param("id") conditionId: number,
    @Res() res: Response
  ): Promise<any> {
    try {
      await this.medicalConditionService.deleteMedicalCondition(conditionId);
      res.status(HttpStatus.OK).json({
        status: "success",
        message: "Medical condition deleted successfully",
      });
    } catch (error) {
      throw new HttpException(
        `Failed to delete medical condition: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
