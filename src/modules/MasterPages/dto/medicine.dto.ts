import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateMedicineDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsInt()
    created_user_id: number;

    @IsInt()
    updated_user_id: number;
}

export class UpdateMedicineDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsInt()
    updated_user_id?: number;
}
