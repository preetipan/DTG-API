import { IsNotEmpty, IsInt, IsEnum, IsBoolean, IsString, Min } from 'class-validator';
import { UserStatusEnum, StatusFundEnum } from '../../entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty({ message: 'userID is required' })
  userID: string;

  @IsNotEmpty({ message: 'Status is required' })
  @IsEnum(UserStatusEnum, { message: 'Status must be a valid enum value' })
  status: UserStatusEnum;

  @IsNotEmpty({ message: 'Role ID is required' })
  @IsInt({ message: 'Role ID must be an integer' })
  roleId: number;

  @IsNotEmpty({ message: 'Fund is required' })
  @IsInt({ message: 'Fund must be an integer' })
  @Min(0, { message: 'Fund must be greater than or equal to 0' })
  fund: number;

  @IsNotEmpty({ message: 'Remaining fund is required' })
  @IsInt({ message: 'Remaining fund must be an integer' })
  @Min(0, { message: 'Remaining fund must be greater than or equal to 0' })
  remaining_fund: number;

  @IsNotEmpty({ message: 'Daily cashback is required' })
  @IsInt({ message: 'Daily cashback must be an integer' })
  @Min(0, { message: 'Daily cashback must be greater than or equal to 0' })
  dailyCashback: number;

  @IsNotEmpty({ message: 'Status fund is required' })
  @IsEnum(StatusFundEnum, { message: 'Status fund must be a valid enum value' })
  statusFund: StatusFundEnum;

  @IsNotEmpty({ message: 'isActive is required' })
  @IsBoolean({ message: 'isActive must be a boolean value' })
  isActive: boolean;

  @IsNotEmpty({ message: 'Group ID is required' })
  @IsString({ message: 'Group ID must be a string' })  // เปลี่ยนเป็น @IsString()
  groupId: string;  // เปลี่ยนเป็น string แทนที่จะเป็น number
}
