import {
    IsNotEmpty,
    IsEnum,
    IsInt,
    IsString,
    IsDateString,
  } from 'class-validator';
  import { RoundStatusEnum } from '../../entities/round.entity';
  
  export class CreateRoundDto {
    @IsNotEmpty({ message: 'Round status is required' })
    @IsEnum(RoundStatusEnum, { message: 'Round status must be either OPEN (1) or CLOSE (2)' })
    round_status: RoundStatusEnum;
  
    @IsNotEmpty({ message: 'Group ID is required' })
    @IsString({ message: 'Group ID must be a string' })
    groupId: string;
  
    @IsNotEmpty({ message: 'Result is required' })
    @IsString({ message: 'Result must be a string' })
    result: string;
  
    @IsNotEmpty({ message: 'Created by (user ID) is required' })
    @IsInt({ message: 'Created by must be an integer' })
    createBy: number;
  
    @IsNotEmpty({ message: 'Start time is required' })
    @IsDateString({}, { message: 'Start time must be a valid date string' })
    start_time: string;
  
    @IsNotEmpty({ message: 'End time is required' })
    @IsDateString({}, { message: 'End time must be a valid date string' })
    end_time: string;
  }
  