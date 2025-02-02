import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    ParseIntPipe,
    UseGuards,
    Req,
} from '@nestjs/common';
import { FeaturePermissionService } from '../services/feature-permission.service';
import {
    CreateFeaturePermissionDto,
} from '../dto/create-feature-permission.dto';
import {
    UpdateFeaturePermissionDto,
} from '../dto/update-feature-permission.dto';
import { USER_FEATURE_PERMISSION } from '@prisma/client';
import { AuthGuard } from 'src/modules/Auth/auth.guard';
import { FeaturePermission } from 'src/interfaces/feature-permission.interface';

// @UseGuards(AuthGuard)
@Controller('feature-permission')
@UseGuards(AuthGuard)
export class FeaturePermissionController {
    constructor(private readonly featurePermissionService: FeaturePermissionService) { }

    @Post()
    async createFeaturePermission(
        @Body() createFeaturePermissionDto: CreateFeaturePermissionDto,
    ): Promise<USER_FEATURE_PERMISSION> {
        return await this.featurePermissionService.createFeaturePermission(
            createFeaturePermissionDto,
        );
    }

    @Get(':id')
    async getFeaturePermissionById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<USER_FEATURE_PERMISSION | null> {
        return await this.featurePermissionService.getFeaturePermissionById(id);
    }

    @Get()
    async getAllFeaturePermissions(): Promise<USER_FEATURE_PERMISSION[]> {
        return await this.featurePermissionService.getAllFeaturePermissions();
    }

    @Patch(':id')
    async updateFeaturePermission(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateFeaturePermissionDto: UpdateFeaturePermissionDto,
    ): Promise<USER_FEATURE_PERMISSION> {
        return await this.featurePermissionService.updateFeaturePermission(
            id,
            updateFeaturePermissionDto,
        );
    }

    @Delete(':id')
    async deleteFeaturePermission(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<void> {
        return await this.featurePermissionService.deleteFeaturePermission(id);
    }

    @Get('user/permission')
    async getFeaturePermissionsByUserType(
        @Req() req: any,
    ): Promise<FeaturePermission | any> {
        return await this.featurePermissionService.getFeaturePermissionsByUserType(
            req.user.role,
        );
    }

    
}
