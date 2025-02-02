import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateFeaturePermissionDto {
    @IsInt()
    @IsNotEmpty()
    USER_TYPE_ID: number;

    @IsInt()
    @IsNotEmpty()
    FEATURE_ID: number;

    @IsInt()
    @IsNotEmpty()
    PERMISSION_ID: number;
}
