import { IsNotEmpty, IsInt, IsEnum, IsBoolean } from 'class-validator';
import { statusEnum, StatusFundEnum } from '../../entities/user.entity'; // นำเข้า enum ที่กำหนดใน entity

export class CreateUserDto {
  @IsNotEmpty()
  userID: string;

  @IsNotEmpty()
  @IsEnum(statusEnum) // กำหนดให้ status เป็นค่า enum
  status: statusEnum;

  @IsNotEmpty()
  @IsInt()
  roleId: number; // แทนที่การใช้งาน DeepPartial<UserRole>

  @IsNotEmpty()
  @IsInt()
  fund: number;

  @IsNotEmpty()
  @IsInt()
  remaining_fund: number;

  @IsNotEmpty()
  @IsInt()
  dailyCashback: number;

  @IsNotEmpty()
  @IsEnum(StatusFundEnum) // กำหนดให้ statusFund เป็นค่า enum
  statusFund: StatusFundEnum;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @IsNotEmpty()
  @IsInt()
  groupId: number; // แทนที่การใช้งาน DeepPartial<Group>
}
