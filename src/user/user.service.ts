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
    return await this.userRepository.save(data);
  }

  // ฟังก์ชันค้นหาผู้ใช้ทั้งหมด
  findAll() {
    return this.userRepository.find();
  }

  async findOneByUserId(userID: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { userID },
    });

    if (!user) {
      throw new NotFoundException(`User with userId ${userID} not found`);
    }

    return user;
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with userId ${id} not found`);
    }

    return user;
  }

  async checkRole(userID: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { userID },
      relations: ['role'],
    });

    if (!user?.role?.nameRole) {
      throw new NotFoundException(
        `Role for user with userId ${userID} is missing or invalid`,
      );
    }

    return user.role.nameRole;
  }

  // ฟังก์ชันอัปเดตข้อมูลผู้ใช้
  async update(userID: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOneByUserId(userID);
    const updatedUser = Object.assign(user, updateUserDto);
    return await this.userRepository.save(updatedUser);
  }

  // ฟังก์ชันอัปเดตข้อมูลผู้ใช้
  async updateById(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOneById(id);
    const updatedUser = Object.assign(user, updateUserDto);
    return await this.userRepository.save(updatedUser);
  }

  // ฟังก์ชันลบผู้ใช้
  async remove(userID: string) {
    const user = await this.findOneByUserId(userID);
    return await this.userRepository.remove(user);
  }
}
