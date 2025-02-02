import { Injectable, NotFoundException } from '@nestjs/common';
import { ConnectionService } from '../../../config/connection.service';
import { CreateExpenseDto, UpdateExpenseDto } from '../dto/expense.dto';

@Injectable()
export class ExpenseService {
  constructor(private readonly connectionService: ConnectionService) {}

  async create(userId: number, data: CreateExpenseDto) {
    try {
      const expenseDate = new Date(`${data.expense_date}T00:00:00`); 
  
      return await this.connectionService.expense.create({
        data: {
          ...data,
          expense_date: expenseDate, 
          user_id: userId,
        },
      });
    } catch (error) {
      console.error('Error creating expense:', error);
      throw new Error('Failed to create expense');
    }
  }

  async findAll(userId: number) {
    return this.connectionService.expense.findMany({
      where: { user_id: userId },
      orderBy: { expense_date: 'desc' },
    });
  }

  async findOne(userId: number, id: number) {
    const expense = await this.connectionService.expense.findFirst({
      where: { expense_id: id, user_id: userId },
    });
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    return expense;
  }

  async update(userId: number, id: number, data: UpdateExpenseDto) {
    try {
      await this.findOne(userId, id);

      const expenseDate = data.expense_date
        ? new Date(`${data.expense_date}T00:00:00Z`) 
        : undefined;
  
      return await this.connectionService.expense.update({
        where: { expense_id: id },
        data: {
          ...data,
          expense_date: expenseDate, 
        },
      });
    } catch (error) {
      console.error('Error updating expense:', error);
      throw new Error('Failed to update expense');
    }
  }  

  async remove(userId: number, id: number) {
    await this.findOne(userId, id);
    return this.connectionService.expense.delete({
      where: { expense_id: id },
    });
  }
}
