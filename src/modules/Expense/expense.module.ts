import { Module } from '@nestjs/common';
import { ExpenseService } from './services/expense.service';
import { ExpenseController } from './controller/expense.controller';
import { ConnectionService } from '../../config/connection.service';

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService, ConnectionService],
  exports: [ExpenseService],
})
export class ExpenseModule {}
