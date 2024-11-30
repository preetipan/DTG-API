import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // ฟังก์ชันสร้างผู้ใช้
  async create(data: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(data); // ใช้ create กับข้อมูลเดียว
    return await this.userRepository.save(user); // save() ควรส่งคืน User หนึ่งตัว
  }

  // ฟังก์ชันค้นหาผู้ใช้ทั้งหมด
  findAll() {
    return this.userRepository.find();
  }

  async findOneByUserId(userID: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { userID: userID } as any,
    });

    if (!user) {
      throw new NotFoundException(`User with userId ${userID} not found`);
    }

    return user;
  }

  async checkRole(userID: string): Promise<string> {
    // ค้นหาผู้ใช้โดยใช้ userID พร้อมกับเชื่อมโยงข้อมูล role
    const user = await this.userRepository.findOne({
      where: { userID: userID },
      relations: ['role'], // เชื่อมโยงข้อมูลบทบาท (role)
    });
  
    // ตรวจสอบว่า user หรือ role ไม่เป็น undefined หรือ null
    if (!user) {
      throw new NotFoundException(`User with userId ${userID} not found`);
    }
  
    if (!user.role) {
      throw new NotFoundException(`Role for user with userId ${userID} is missing`);
    }
  
    // ตรวจสอบว่า role มี nameRole
    if (!user.role.nameRole) {
      throw new NotFoundException(`Role does not have nameRole`);
    }
  
    // ส่งค่าบทบาทที่ถูกต้อง
    return user.role.nameRole;
  }
  

  // ฟังก์ชันอัปเดตข้อมูลผู้ใช้
  async update(userID: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOneByUserId(userID);
    const updatedUser = Object.assign(user, updateUserDto);
    return await this.userRepository.save(updatedUser);
  }

  // ฟังก์ชันลบผู้ใช้
  async remove(userID: string) {
    const user = await this.findOneByUserId(userID);
    return await this.userRepository.remove(user);
  }
}
