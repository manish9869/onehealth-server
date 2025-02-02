import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { ConnectionService } from 'src/config/connection.service';

@Module({
  controllers: [DashboardController],
  providers: [ConnectionService, DashboardService]
})
export class DashboardModule { }
