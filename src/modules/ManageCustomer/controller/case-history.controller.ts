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
  AddCaseHistoryDto,
  UpdateCaseHistoryDto,
} from "./../dto/case-history.dto";
import { CaseHistoryService } from "./../services/case-history.service";
import { AuthenticatedRequest } from "src/modules/Auth/auth-request.interface";
import { AuthGuard } from "src/modules/Auth/auth.guard";

@Controller("case-history")
@UseGuards(AuthGuard)
export class CaseHistoryController {
  constructor(private readonly caseHistoryService: CaseHistoryService) {}

  @Post()
  async create(
    @Body() caseHistoryDto: AddCaseHistoryDto,
    @Req() req: AuthenticatedRequest,
    @Res() res: Response
  ): Promise<any> {
    try {
      const loggedUserId = req.loggedInUser;

      const caseHistory = await this.caseHistoryService.createCaseHistory({
        ...caseHistoryDto,
        created_user_id: loggedUserId,
        updated_user_id: loggedUserId,
      });
      res.status(HttpStatus.CREATED).json({
        status: "success",
        data: caseHistory,
        message: "Case history created successfully",
      });
    } catch (error) {
      throw new HttpException(
        `Failed to create case history: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  async findAll(@Res() res: Response): Promise<any> {
    try {
      const caseHistories = await this.caseHistoryService.getAllCaseHistories();
      res.status(HttpStatus.OK).json({
        status: "success",
        data: caseHistories,
        message: "Case histories fetched successfully",
      });
    } catch (error) {
      throw new HttpException(
        `Failed to fetch case histories: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":id")
  async findOne(
    @Param("id") caseId: number,
    @Res() res: Response
  ): Promise<any> {
    try {
      const caseHistory =
        await this.caseHistoryService.getCaseHistoryById(caseId);
      if (!caseHistory) {
        throw new HttpException("Case history not found", HttpStatus.NOT_FOUND);
      }
      res.status(HttpStatus.OK).json({
        status: "success",
        data: caseHistory,
        message: "Case history fetched successfully",
      });
    } catch (error) {
      throw new HttpException(
        `Failed to fetch case history: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("customer/:customerId")
  async getCaseHistoriesByCustomerId(@Param("customerId") customerId: number) {
    return this.caseHistoryService.getCaseHistoriesByCustomerId(customerId);
  }

  @Put(":id")
  async update(
    @Param("id") caseId: number,
    @Body() caseHistoryDto: UpdateCaseHistoryDto,
    @Req() req: AuthenticatedRequest,
    @Res() res: Response
  ): Promise<any> {
    try {
      const loggedUserId = req.loggedInUser;
      const caseHistory = await this.caseHistoryService.updateCaseHistory(
        caseId,
        {
          ...caseHistoryDto,
          updated_user_id: loggedUserId,
        }
      );
      res.status(HttpStatus.OK).json({
        status: "success",
        data: caseHistory,
        message: "Case history updated successfully",
      });
    } catch (error) {
      throw new HttpException(
        `Failed to update case history: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(":id")
  async remove(
    @Param("id") caseId: number,
    @Res() res: Response
  ): Promise<any> {
    try {
      await this.caseHistoryService.deleteCaseHistory(caseId);
      res.status(HttpStatus.OK).json({
        status: "success",
        message: "Case history deleted successfully",
      });
    } catch (error) {
      throw new HttpException(
        `Failed to delete case history: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
