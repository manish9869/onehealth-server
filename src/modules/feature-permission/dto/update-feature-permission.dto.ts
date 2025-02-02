import { PartialType } from '@nestjs/mapped-types';
import { CreateFeaturePermissionDto } from './create-feature-permission.dto';

export class UpdateFeaturePermissionDto extends PartialType(CreateFeaturePermissionDto) { }
