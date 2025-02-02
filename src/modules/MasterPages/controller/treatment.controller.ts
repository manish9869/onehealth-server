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
import { AddTreatmentDto, UpdateTreatmentDto } from "../dto/treatment.dto";
import { TreatmentService } from "../services/treatment.service";
import { Prisma } from "@prisma/client";
import { AuthGuard } from "src/modules/Auth/auth.guard";
import { AuthenticatedRequest } from "src/modules/Auth/auth-request.interface";

@Controller("treatment")
@UseGuards(AuthGuard)
export class TreatmentController {
  constructor(private readonly treatmentService: TreatmentService) {}

  @Post()
  async create(
    @Body() treatmentDto: AddTreatmentDto,
    @Req() req: AuthenticatedRequest,
    @Res() res: Response
  ): Promise<any> {
    try {
      const userId = req.loggedInUser;
      const data = {
        ...treatmentDto,
        created_user_id: userId,
        updated_user_id: userId, // Use logged-in user ID
      };
      const treatment = await this.treatmentService.addTreatment(data);
      res.status(HttpStatus.CREATED).json({
        status: "success",
        data: treatment,
        message: "Treatment created successfully",
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new HttpException(
            `Treatment with the same unique fields already exists: ${error.meta?.target}`,
            HttpStatus.BAD_REQUEST
          );
        }
      }
      throw new HttpException(
        `Failed to create treatment: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  async findAll(@Res() res: Response): Promise<any> {
    try {
      const treatments = await this.treatmentService.getAllTreatments();
      res.status(HttpStatus.OK).json({
        status: "success",
        data: treatments,
        message: "Treatments fetched successfully",
      });
    } catch (error) {
      throw new HttpException(
        `Failed to fetch treatments: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":id")
  async findOne(
    @Param("id") treatmentId: number,
    @Res() res: Response
  ): Promise<any> {
    try {
      const treatment =
        await this.treatmentService.getTreatmentById(treatmentId);
      if (!treatment) {
        throw new HttpException("Treatment not found", HttpStatus.NOT_FOUND);
      }
      res.status(HttpStatus.OK).json({
        status: "success",
        data: treatment,
        message: "Treatment fetched successfully",
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new HttpException("Treatment not found", HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        `Failed to fetch treatment: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put(":id")
  async update(
    @Param("id") treatmentId: number,
    @Body() treatmentDto: UpdateTreatmentDto,
    @Req() req: AuthenticatedRequest,
    @Res() res: Response
  ): Promise<any> {
    try {
      const userId = req.loggedInUser; // Retrieve logged-in user ID from request
      const data = {
        ...treatmentDto,
        created_user_id: userId,
        updated_user_id: userId,
      };
      const treatment = await this.treatmentService.updateTreatment(
        treatmentId,
        data
      );
      res.status(HttpStatus.OK).json({
        status: "success",
        data: treatment,
        message: "Treatment updated successfully",
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new HttpException(
          "Treatment not found for update",
          HttpStatus.NOT_FOUND
        );
      }
      throw new HttpException(
        `Failed to update treatment: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(":id")
  async remove(
    @Param("id") treatmentId: number,
    @Req() req: AuthenticatedRequest,
    @Res() res: Response
  ): Promise<any> {
    try {
      // Optionally, you can use the loggedInUser here for logging or other purposes
      const userId = req.loggedInUser;
      await this.treatmentService.deleteTreatment(treatmentId);
      res.status(HttpStatus.NO_CONTENT).json({
        status: "success",
        message: "Treatment deleted successfully",
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new HttpException(
          "Treatment not found for deletion",
          HttpStatus.NOT_FOUND
        );
      }
      throw new HttpException(
        `Failed to delete treatment: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
