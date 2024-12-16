import { 
  IsNotEmpty, 
  IsEnum, 
  IsString, 
  IsDateString, 
  IsOptional 
 } from 'class-validator';
 import { Transform } from 'class-transformer';
 import { RoundStatusEnum, RoundResultEnum } from '../../entities/round.entity';
 
 export class CreateRoundDto {
  @IsNotEmpty({ message: 'Round status is required' })
  @IsEnum(RoundStatusEnum, { message: 'Round status must be either OPEN (1) or CLOSE (2).' })
  round_status: RoundStatusEnum;
 
  @IsNotEmpty({ message: 'Group ID is required.' })
  @IsString({ message: 'Group ID must be a string.' })
  @Transform(({ value }) => value.toString().trim())
  groupId: string;
 
  @IsOptional()
  @IsEnum(RoundResultEnum, {
    message: 'Result must be one of the following values: WIN_BLUE, WIN_RED, DRAW.',
  })
  result?: RoundResultEnum;
 
  @IsNotEmpty({ message: 'The "createBy" field is required.' })
  @IsString({ message: 'CreateBy must be a valid string.' })
  createBy: string;
 
  @IsOptional() 
  @IsDateString({}, { message: 'Start time must be a valid ISO date string (e.g., YYYY-MM-DDTHH:mm:ssZ).' })
  start_time?: string;
 
  @IsOptional() 
  @IsDateString({}, { message: 'End time must be a valid ISO date string (e.g., YYYY-MM-DDTHH:mm:ssZ).' })
  end_time?: string;
 }