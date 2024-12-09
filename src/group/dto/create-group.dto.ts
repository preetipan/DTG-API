import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsDate,
} from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty()
  @IsString()
  idGroup: string;

  @IsNotEmpty()
  @IsString()
  groupName: string;

  @IsOptional()
  @IsBoolean()
  cockIsActive?: boolean;

  @IsOptional()
  @IsBoolean()
  hiloIsActive?: boolean;

  @IsOptional()
  @IsBoolean()
  openPlay?: boolean;

  @IsOptional()
  @IsString()
  subGroup?: string;

  @IsOptional()
  @IsString()
  subGroupname?: string;

  @IsOptional()
  @IsString()
  createBy?: string;

  @IsOptional()
  @IsString()
  updateBy?: string;

  @IsOptional()
  @IsDate()
  createDate?: Date;

  @IsOptional()
  @IsDate()
  updateDate?: Date;
}
