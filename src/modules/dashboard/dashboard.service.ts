import { Injectable } from '@nestjs/common';
// Import Prisma Client to interact with the database
import { Prisma } from "@prisma/client";
import { start } from 'repl';
import { ConnectionService } from 'src/config/connection.service';


@Injectable()
export class DashboardService {
    constructor(private readonly prisma: ConnectionService) { }

    async getTotalUsers(): Promise<number> {
        return await this.prisma.user.count();
    }

    async getTotalActiveUsers(): Promise<number> {
        return await this.prisma.user.count({
            where: {
                status: 1
            }
        });
    }

    async getTotalIdleUsers(): Promise<number> {
        return await this.prisma.user.count({
            where: {
                status: 0
            }
        });
    }

    async getMonthlyActiveUsersPerecentage(org_id: number): Promise<{ month: string, users: number }[]> {
        const data = await this.prisma.oRGANIZATION_DASHBOARD.findMany({
            select: {
                createdOn: true,
                monthlyActiveUsers: true
            },
            where: {
                org_id: org_id,
                // Fetch for the last 12 months
                createdOn: {
                    gte: new Date(new Date().setMonth(new Date().getMonth() - 12)),
                    lte: new Date()
                }
            }
        });

        const result = data.map((item) => {
            return {
                month: item.createdOn.toLocaleString('default', { month: 'short' }),
                users: item.monthlyActiveUsers
            }
        });
        return result;
    }

}