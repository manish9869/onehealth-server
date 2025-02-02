import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
} from "@nestjs/common";
import { ConnectionService } from "src/config/connection.service";
import { USER_FEATURE_PERMISSION } from "@prisma/client";
import {
    CreateFeaturePermissionDto,
} from "../dto/create-feature-permission.dto.js";

import {
    UpdateFeaturePermissionDto,
} from "../dto/update-feature-permission.dto.js";
import { FeaturePermission } from "src/interfaces/feature-permission.interface.js";


@Injectable()
export class FeaturePermissionService {
    constructor(private readonly prisma: ConnectionService) { }

    async createFeaturePermission(
        data: CreateFeaturePermissionDto,
    ): Promise<USER_FEATURE_PERMISSION> {
        try {
            return await this.prisma.uSER_FEATURE_PERMISSION.create({
                data: {
                    USER_TYPE_ID: data.USER_TYPE_ID,
                    FEATURE_ID: data.FEATURE_ID,
                    PERMISSION_ID: data.PERMISSION_ID,
                },
            });
        } catch (error) {
            throw new InternalServerErrorException("Failed to create feature permission");
        }
    }

    async getFeaturePermissionById(id: number): Promise<USER_FEATURE_PERMISSION | null> {
        try {
            const permission = await this.prisma.uSER_FEATURE_PERMISSION.findUnique({
                where: { ID: id },
                include: {
                    USER_TYPE_MASTER: true,
                    FEATURE_MASTER: true,
                    PERMISSION_MASTER: true,
                },
            });
            if (!permission) {
                throw new NotFoundException("Feature permission not found");
            }
            return permission;
        } catch (error) {
            throw new InternalServerErrorException("Failed to fetch feature permission");
        }
    }

    async getAllFeaturePermissions(): Promise<USER_FEATURE_PERMISSION[]> {
        try {
            return await this.prisma.uSER_FEATURE_PERMISSION.findMany({
                include: {
                    USER_TYPE_MASTER: true,
                    FEATURE_MASTER: true,
                    PERMISSION_MASTER: true,
                },
            });
        } catch (error) {
            throw new InternalServerErrorException("Failed to fetch feature permissions");
        }
    }

    async updateFeaturePermission(
        id: number,
        data: UpdateFeaturePermissionDto,
    ): Promise<USER_FEATURE_PERMISSION> {
        try {
            const updatedPermission = await this.prisma.uSER_FEATURE_PERMISSION.update({
                where: { ID: id },
                data: {
                    ...(data.USER_TYPE_ID !== undefined && { USER_TYPE_ID: data.USER_TYPE_ID }),
                    ...(data.FEATURE_ID !== undefined && { FEATURE_ID: data.FEATURE_ID }),
                    ...(data.PERMISSION_ID !== undefined && { PERMISSION_ID: data.PERMISSION_ID }),
                },
            });
            return updatedPermission;
        } catch (error) {
            if ((error as any).code === 'P2025') {
                throw new NotFoundException("Feature permission not found");
            }
            throw new InternalServerErrorException("Failed to update feature permission");
        }
    }

    async deleteFeaturePermission(id: number): Promise<void> {
        try {
            await this.prisma.uSER_FEATURE_PERMISSION.delete({
                where: { ID: id },
            });
        } catch (error) {
            if ((error as any).code === 'P2025') {
                throw new NotFoundException("Feature permission not found");
            }
            throw new InternalServerErrorException("Failed to delete feature permission");
        }
    }

    async getFeaturePermissionsByUserType(userTypeId: number): Promise<FeaturePermission> {
        try {
            let permission = await this.prisma.uSER_FEATURE_PERMISSION.findMany({
                where: { USER_TYPE_ID: userTypeId },
            });

            let userInfo = await this.prisma.uSER_TYPE_MASTER.findUnique({
                where: { ID: userTypeId },
                select: {
                    ID: true,
                    NAME: true,
                }
            }) as { ID: number; NAME: string; featurePermission: { [key: number]: number[] } };

            if (!userInfo.featurePermission) {
                userInfo.featurePermission = {};
            }

            let featurePermission: { [key: number]: number[] } = {};

            permission.forEach((p) => {
                if (featurePermission[p.FEATURE_ID]) {
                    featurePermission[p.FEATURE_ID].push(p.PERMISSION_ID);
                } else {
                    featurePermission[p.FEATURE_ID] = [p.PERMISSION_ID];
                }
            });

            // Add the feature permission object to the user type info

            userInfo.featurePermission = featurePermission;

            // Return the user type info

            return userInfo;


        } catch (error) {
            throw new InternalServerErrorException("Failed to fetch feature permissions");
        }
    }
}
