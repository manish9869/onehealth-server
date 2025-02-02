import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ExpenseService } from '../services/expense.service';
import { CreateExpenseDto, UpdateExpenseDto } from '../dto/expense.dto';
import { AuthGuard } from '../../Auth/auth.guard';
import { AuthenticatedRequest } from '../../Auth/auth-request.interface';

@Controller('expense')
@UseGuards(AuthGuard)
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    const userId = req.loggedInUser;
    return this.expenseService.create(userId, createExpenseDto);
  }

  @Get()
  async findAll(@Req() req: AuthenticatedRequest) {
    const userId = req.loggedInUser;
    return this.expenseService.findAll(userId);
  }

  @Get(':id')
  async findOne(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: number,
  ) {
    const userId = req.loggedInUser;
    return this.expenseService.findOne(userId, id);
  }

  @Put(':id')
  async update(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    const userId = req.loggedInUser;
    return this.expenseService.update(userId, id, updateExpenseDto);
  }

  @Delete(':id')
  async remove(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: number,
  ) {
    const userId = req.loggedInUser;
    return this.expenseService.remove(userId, id);
  }
}
