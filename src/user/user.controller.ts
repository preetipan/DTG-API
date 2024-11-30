import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
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
  async createUser(@Body(new ValidationPipe()) data: CreateUserDto): Promise<User> {
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
    try {
      return await this.userService.findOneByUserId(userID);
    } catch (error) {
      throw new NotFoundException(`User with userId ${userID} not found`);
    }
  }

  // ฟังก์ชันสำหรับอัปเดตข้อมูลผู้ใช้โดยใช้ userId
  @Put(':userID')
  async updateUser(
    @Param('userID') userID: string,
    @Body(new ValidationPipe()) data: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(userID, data);
  }

  // ฟังก์ชันตรวจสอบบทบาทของผู้ใช้
  @Get(':userID/role')
  async checkRole(@Param('userID') userID: string): Promise<string> {
    try {
      return await this.userService.checkRole(userID);
    } catch (error) {
      throw new NotFoundException(`Role for user with userId ${userID} not found`);
    }
  }

  // ฟังก์ชันสำหรับลบผู้ใช้โดยใช้ userId
  @Delete(':userID')
  async deleteUser(@Param('userID') userID: string): Promise<void> {
    await this.userService.remove(userID);
  }
}
