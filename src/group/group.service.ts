import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const newGroup = this.groupRepository.create(createGroupDto); // ใช้ DTO ตรงๆ
    return await this.groupRepository.save(newGroup);
  }

  findAll() {
    return this.groupRepository.find();
  }

  async findOne(id: number) {
    const group = await this.groupRepository.findOneBy({ id });
    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const group = await this.findOne(id);
    const updatedGroup = Object.assign(group, updateGroupDto);
    return await this.groupRepository.save(updatedGroup);
  }

  async remove(id: number) {
    const group = await this.findOne(id);
    return await this.groupRepository.remove(group);
  }
}
