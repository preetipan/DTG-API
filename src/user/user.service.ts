import { Injectable, Patch } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import path from 'path';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const users = await this.userRepository.create(createUserDto);
    const toCreate = await this.userRepository.insert(users);

    return toCreate;
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ Id: id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let users = await this.userRepository.findOneBy({ Id: id });
    users = {
      ...users,
      ...updateUserDto,
    };
    const toUpdate = await this.userRepository.save(users);
    return toUpdate;
  }

  async remove(id: number) {
    const toDelete = await this.userRepository.delete(id)
    return toDelete;
  }
}
