import {
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class CreateSubRoundDto {
    @IsNotEmpty({ message: 'Number of round is required.' })
    @IsNumber({}, { message: 'Number of round must be a number.' })
    numberRound: number;
  
    @IsNotEmpty({ message: 'Round is required.' })
    @IsNumber({}, { message: 'Round must be a number.' })
    round: number;
  
    @IsNotEmpty({ message: 'Price is required.' })
    @IsString({ message: 'Price must be a valid string.' })  // แก้ไขข้อความให้ตรงกับประเภทข้อมูล string
    price: string;
  
    @IsNotEmpty({ message: 'Status is required.' })
    @IsNumber({}, { message: 'Status must be a number.' })
    status: number;
  
    @IsOptional()
    @IsDateString(
      {},
      {
        message:
          'Start time must be a valid ISO date string (e.g., YYYY-MM-DDTHH:mm:ssZ).',
      },
    )
    start_time?: string;
  
    @IsOptional()
    @IsDateString(
      {},
      {
        message:
          'End time must be a valid ISO date string (e.g., YYYY-MM-DDTHH:mm:ssZ).',
      },
    )
    end_time?: string;
  
    @IsNotEmpty({ message: 'The "createBy" field is required.' })
    @IsString({ message: 'CreateBy must be a valid string.' })
    createBy: string;
  }
  