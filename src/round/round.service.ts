import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoundDto } from './dto/create-round.dto';
import { UpdateRoundDto } from './dto/update-round.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Round } from '../entities/round.entity';
import { Group } from '../entities/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoundService {
  constructor(
    @InjectRepository(Round)
    private roundRepository: Repository<Round>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  async create(data: CreateRoundDto): Promise<Round> {
    // ค้นหา Group โดยใช้ groupId
    const group = await this.groupRepository.findOne({
      where: { idGroup: data.groupId },
    });

    if (!group) {
      throw new NotFoundException(`Group with ID ${data.groupId} not found`);
    }

    // แปลง start_time และ end_time ถ้ามีค่า
    const startTime = data.start_time ? new Date(data.start_time) : null;
    const endTime = data.end_time ? new Date(data.end_time) : null;

    // ตรวจสอบรูปแบบ start_time และ end_time ถ้ามีค่า
    if (data.start_time && isNaN(startTime.getTime())) {
      throw new BadRequestException('Invalid start_time format');
    }
    if (data.end_time && isNaN(endTime.getTime())) {
      throw new BadRequestException('Invalid end_time format');
    }

    // ตรวจสอบความสัมพันธ์ระหว่าง start_time และ end_time
    if (startTime && endTime && startTime > endTime) {
      throw new BadRequestException('end_time must be after start_time');
    }

    // สร้างรอบใหม่
    const round = this.roundRepository.create({
      round_status: data.round_status,
      group, // ส่ง Group entity ที่ค้นพบมา
      result: data.result || null,
      createBy: data.createBy,
      start_time: startTime,
      end_time: endTime,
    });

    try {
      return await this.roundRepository.save(round); // บันทึกข้อมูลลงฐานข้อมูล
    } catch (error) {
      console.error('Error saving round:', error);

      if (error.code === '23502') {
        throw new BadRequestException('A required field is missing');
      }

      throw new InternalServerErrorException('Failed to create the round');
    }
  }

  // Find all Rounds
  async findAll() {
    return this.roundRepository.find();
  }

  // Find Round by ID
  async findOne(id: number): Promise<Round> {
    const round = await this.roundRepository.findOne({
      where: { id },
    });

    if (!round) {
      throw new NotFoundException(`Round with ID ${id} not found`);
    }

    return round;
  }

  // ฟังก์ชันค้นหาสถานะรอบล่าสุด
  async findLatestRoundStatus(): Promise<boolean> {
    const latestRound = await this.roundRepository.findOne({
      where: { round_status: 1 }, // ค้นหารอบที่สถานะเป็น "เปิด"
      order: { createDate: 'DESC' },
    });

    // ถ้าพบว่ามีรอบที่ยังเปิดอยู่ (สถานะ = 1) ก็จะคืนค่า true
    if (latestRound) {
      return true;
    }
    // หากไม่พบรอบที่เปิดอยู่ จะหมายความว่ารอบล่าสุดถูกปิดแล้ว (สถานะ = 2)
    return false;
  }


  async findLatestRoundWithDetails(): Promise<Round> {
    const latestRound = await this.roundRepository.findOne({
      where: {}, // ดึงข้อมูลรอบล่าสุด
      order: { createDate: 'DESC' }, // เรียงลำดับจากล่าสุด
      relations: ['group', 'subRounds'], // โหลดความสัมพันธ์ที่ต้องการ
    });
  
    if (!latestRound) {
      throw new NotFoundException('ไม่พบข้อมูลรอบล่าสุด');
    }
  
    return latestRound;
  }

  // Update Round by ID
  async update(id: number, updateRoundDto: UpdateRoundDto): Promise<Round> {
    const round = await this.findOne(id);

    // แปลง start_time และ end_time ถ้ามีค่า
    const startTime = updateRoundDto.start_time
      ? new Date(updateRoundDto.start_time)
      : round.start_time;
    const endTime = updateRoundDto.end_time
      ? new Date(updateRoundDto.end_time)
      : round.end_time;

    // ตรวจสอบรูปแบบ start_time และ end_time ถ้ามีค่า
    if (updateRoundDto.start_time && isNaN(startTime.getTime())) {
      throw new BadRequestException('Invalid start_time format');
    }
    if (updateRoundDto.end_time && isNaN(endTime.getTime())) {
      throw new BadRequestException('Invalid end_time format');
    }

    // ตรวจสอบความสัมพันธ์ระหว่าง start_time และ end_time
    if (startTime && endTime && startTime > endTime) {
      throw new BadRequestException('end_time must be after start_time');
    }

    // รวมข้อมูลใหม่กับข้อมูลเดิม
    Object.assign(round, updateRoundDto, {
      start_time: startTime,
      end_time: endTime,
    });

    try {
      return await this.roundRepository.save(round);
    } catch (error) {
      console.error('Error updating round:', error);
      throw new InternalServerErrorException('Failed to update the round');
    }
  }

  // Remove Round
  async remove(id: number): Promise<void> {
    const round = await this.findOne(id);
    await this.roundRepository.remove(round);
  }
}
