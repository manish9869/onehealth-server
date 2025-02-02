import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '../Auth/auth.guard';


@UseGuards(AuthGuard)
@Controller('dashboard')
export class DashboardController {

    // Get total users
    constructor(private readonly dashboardService: DashboardService) { }
    @Get('total-users')
    async getTotalUsers(): Promise<number> {
        return await this.dashboardService.getTotalUsers();
    }

    // Get total Active users
    @Get('total-active-users')
    async getTotalActiveUsers(): Promise<number> {
        return await this.dashboardService.getTotalActiveUsers();
    }

    // Get total Idle users
    @Get('total-idle-users')
    async getTotalIdleUsers(): Promise<number> {
        return await this.dashboardService.getTotalIdleUsers();
    }

    @Get('monthly-active-users')
    async getMonthlyActiveUsersPerecentage(@Req() req: Request | any): Promise<number | any> {
        console.log("Request arrived here:", req.user);
        const { org_id } = req.user;
        return await this.dashboardService.getMonthlyActiveUsersPerecentage(org_id);
    }

}