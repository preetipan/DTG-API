import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ฟังก์ชันสำหรับสร้างผู้ใช้ใหม่
  @Post()
  @HttpCode(201) // กำหนดสถานะ HTTP ให้เป็น 201 (Created)
  async createUser(
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    data: CreateUserDto,
  ): Promise<User> {
    return await this.userService.create(data);
  }

  // ฟังก์ชันสำหรับค้นหาผู้ใช้ทั้งหมด
  @Get()
  async findAllUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  // ฟังก์ชันสำหรับค้นหาผู้ใช้โดยใช้ userId
  @Get(':userID')
  async findUserByUserId(@Param('userID') userID: string): Promise<User> {
    const user = await this.userService.findOneByUserId(userID);
    if (!user) {
      throw new NotFoundException(`User with userId ${userID} not found`);
    }
    return user;
  }

  @Get('id/:id') // เพิ่มเส้นทางใหม่สำหรับค้นหาผู้ใช้โดยใช้ id
  async findOneById(@Param('id') id: number): Promise<User> {
    const user = await this.userService.findOneById(id); // ใช้ฟังก์ชันค้นหาผู้ใช้ตาม id
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  // ฟังก์ชันสำหรับอัปเดตข้อมูลผู้ใช้โดยใช้ userId
  @Patch(':userID')
  async updateUser(
    @Param('userID') userID: string,
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    data: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(userID, data);
  }

  @Patch('id/:id') // เพิ่มเส้นทางใหม่สำหรับอัปเดตข้อมูลผู้ใช้โดยใช้ id
  async updateUserById(
    @Param('id') id: number,
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    data: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.updateById(id, data); // เรียกฟังก์ชันใหม่สำหรับค้นหาโดย id
  }

  // ฟังก์ชันตรวจสอบบทบาทของผู้ใช้
  @Get(':userID/role')
  async checkRole(@Param('userID') userID: string): Promise<string> {
    const role = await this.userService.checkRole(userID);
    if (!role) {
      throw new NotFoundException(
        `Role for user with userId ${userID} not found`,
      );
    }
    return role;
  }

  // ฟังก์ชันสำหรับลบผู้ใช้โดยใช้ userId
  @Delete(':userID')
  @HttpCode(204) // กำหนดสถานะ HTTP ให้เป็น 204 (No Content) หลังจากลบสำเร็จ
  async deleteUser(@Param('userID') userID: string): Promise<void> {
    await this.userService.remove(userID);
  }
}
