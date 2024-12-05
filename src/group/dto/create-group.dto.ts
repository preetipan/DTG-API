import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

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
}
