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

  // สร้างกลุ่มใหม่
  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const newGroup = this.groupRepository.create(createGroupDto); // ใช้ DTO ตรงๆ
    return await this.groupRepository.save(newGroup);
  }

  // ค้นหากลุ่มทั้งหมด
  findAll(): Promise<Group[]> {
    return this.groupRepository.find();
  }

  // ค้นหากลุ่มตาม ID
  async findOne(groupId: string): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { idGroup: groupId },
      relations: ['users', 'rounds', 'transactions'], // เชื่อมโยงข้อมูลที่เกี่ยวข้อง (ถ้าต้องการ)
    });

    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }
    return group;
  }

  // อัปเดตกกลุ่ม
  async update(groupId: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.findOne(groupId);
    // update ข้อมูลใน group
    Object.assign(group, updateGroupDto);
    return await this.groupRepository.save(group); // save ที่ได้รับการอัปเดตแล้ว
  }

  // ลบกลุ่ม
  async remove(groupId: string): Promise<void> {
    const group = await this.findOne(groupId);
    await this.groupRepository.remove(group); // ลบข้อมูล
  }
}
