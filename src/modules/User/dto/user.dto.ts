import { IsString, IsEmail, IsOptional, IsBoolean } from "class-validator";

export class AddUserDto {
  @IsString()
  user_name: string;

  @IsOptional()
  @IsString()
  profile_img?: string;

  @IsString()
  password?: string;

  @IsEmail()
  user_email?: string;

  @IsOptional()
  role_id?: string;

  @IsOptional()
  status?: string;

  @IsOptional()
  @IsString()
  twofa_auth_code?: string;

  @IsOptional()
  @IsBoolean()
  is_twofa_enabled?: boolean;

  @IsOptional()
  org_id?: number;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  user_name?: string;

  @IsOptional()
  @IsString()
  profile_img?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEmail()
  user_email?: string;

  @IsOptional()
  role_id?: number;

  @IsOptional()
  status?: number;

  @IsOptional()
  @IsString()
  twofa_auth_code?: string;

  @IsOptional()
  @IsBoolean()
  is_twofa_enabled?: boolean;
}
