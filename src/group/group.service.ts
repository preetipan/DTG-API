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
      relations: ['rounds', 'transactions'],
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


  async getMainRound(groupId: string): Promise<number> {
    const group = await this.groupRepository.findOne({
      where: { idGroup: groupId }, // ใช้ where ในการระบุเงื่อนไข
    });
  
    if (!group) {
      throw new NotFoundException(`Group with ID '${groupId}' not found`);
    }
  
    return group.main_round_number;
  }


  async getSubRound(groupId: string): Promise<number> {
    const group = await this.groupRepository.findOne({
      where: { idGroup: groupId }, // ใช้ where ในการระบุเงื่อนไข
    });
  
    if (!group) {
      throw new NotFoundException(`Group with ID '${groupId}' not found`);
    }
  
    return group.sub_round_count;
  }
  
  

  async checkSubGroupExists(subGroup: string): Promise<boolean> {
    const group = await this.groupRepository.findOne({ where: { subGroup } });
    return !!group; // ถ้ามีกลุ่มจะคืนค่า true ถ้าไม่มีกลุ่มจะคืนค่า false
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

  // ฟังก์ชันเพื่อเพิ่ม main_round_number ทีละ 1
  async incrementMainRoundNumber(groupId: string): Promise<Group> {
    const group = await this.findOne(groupId); // ค้นหากลุ่มตาม ID

    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    group.main_round_number += 1; // เพิ่ม main_round_number ทีละ 1

    return await this.groupRepository.save(group); // บันทึกการอัปเดตลงในฐานข้อมูล
  }

  // ฟังก์ชันเพื่อรีเซ็ต main_round_number เป็น 0
  async resetMainRoundNumber(groupId: string): Promise<Group> {
    const group = await this.findOne(groupId); // ค้นหากลุ่มตาม ID

    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    group.main_round_number = 0; // รีเซ็ต main_round_number เป็น 0

    return await this.groupRepository.save(group); // บันทึกการอัปเดตลงในฐานข้อมูล
  }

  // ฟังก์ชันเพิ่ม sub_round_count ทีละ 1
  async incrementSubRoundCount(groupId: string): Promise<Group> {
    const group = await this.findOne(groupId);

    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    group.sub_round_count += 1; // เพิ่ม sub_round_count ทีละ 1

    return await this.groupRepository.save(group);
  }

  // ฟังก์ชันรีเซ็ต sub_round_count เป็น 0
  async resetSubRoundCount(groupId: string): Promise<Group> {
    const group = await this.findOne(groupId);

    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    group.sub_round_count = 0; // รีเซ็ต sub_round_count เป็น 0

    return await this.groupRepository.save(group);
  }

  // ลบกลุ่ม (Physical Delete)
  async remove(groupId: string): Promise<void> {
    const group = await this.findOne(groupId); // ตรวจสอบว่ากลุ่มมีอยู่หรือไม่
    await this.groupRepository.remove(group); // ใช้ remove เพื่อลบข้อมูลจริง
  }
}
