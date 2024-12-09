import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  // สร้างกลุ่มใหม่
  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const existingGroup = await this.groupRepository.findOne({
      where: [
        { idGroup: createGroupDto.idGroup },
        { groupName: createGroupDto.groupName },
      ],
    });

    if (existingGroup) {
      throw new Error('Group with the same ID or name already exists');
    }

    const newGroup = this.groupRepository.create(createGroupDto);
    return await this.groupRepository.save(newGroup);
  }

  // ค้นหากลุ่มทั้งหมด
  async findAll(): Promise<Group[]> {
    return await this.groupRepository.find({
      relations: ['users', 'rounds', 'transactions'], // เพิ่ม relations ถ้าจำเป็น
    });
  }

  // ค้นหากลุ่มตาม ID
  async findOne(groupId: string): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { idGroup: groupId },
      relations: ['rounds', 'transactions'],
    });

    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }
    return group;
  }

  async findByName(groupName: string): Promise<Group> {
    return await this.groupRepository.findOne({
      where: { groupName },
      relations: ['rounds', 'transactions'],
    });
  }

  // อัปเดตกกลุ่ม
  async update(
    groupId: string,
    updateGroupDto: UpdateGroupDto,
  ): Promise<Group> {
    const group = await this.findOne(groupId);
    Object.assign(group, updateGroupDto);
    return await this.groupRepository.save(group);
  }

  async updateByGroupName(groupName: string, updateGroupDto: UpdateGroupDto) {
    try {
      // ค้นหากลุ่มโดยใช้ชื่อกลุ่ม
      const group = await this.groupRepository.findOne({
        where: { groupName },
      });

      if (!group) {
        throw new NotFoundException(`ไม่พบกลุ่มชื่อ "${groupName}"`);
      }

      // อัปเดตข้อมูลกลุ่ม
      Object.assign(group, updateGroupDto);
      await this.groupRepository.save(group); // บันทึกการอัปเดตลงในฐานข้อมูล

      return group; // ส่งคืนกลุ่มที่ได้รับการอัปเดต
    } catch (error) {
      throw new InternalServerErrorException(
        `การอัปเดตกลุ่มล้มเหลว: ${error.message}`,
      );
    }
  }

  // ลบกลุ่ม (Physical Delete)
  async remove(groupId: string): Promise<void> {
    const group = await this.findOne(groupId); // ตรวจสอบว่ากลุ่มมีอยู่หรือไม่
    await this.groupRepository.remove(group); // ใช้ remove เพื่อลบข้อมูลจริง
  }
}
