import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubRound } from '../entities/subRound.entity';
import { CreateSubRoundDto } from './dto/create-sub-round.dto';
import { UpdateSubRoundDto } from './dto/update-sub-round.dto';
import { Round } from '../entities/round.entity';
import { User } from '../entities/user.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class SubRoundService {
  constructor(
    @InjectRepository(SubRound)
    private subRoundRepository: Repository<SubRound>,
    @InjectRepository(Round) private roundRepository: Repository<Round>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // สร้าง SubRound ใหม่
  async create(createSubRoundDto: CreateSubRoundDto) {
    // ค้นหา round โดยใช้ id ที่ได้จาก DTO
    const round = await this.roundRepository.findOneBy({
      id: createSubRoundDto.round,
    });
    if (!round) {
      throw new NotFoundException('Round not found');
    }

    // ค้นหา user โดยใช้ createBy (userID)
    const createBy = await this.userRepository.findOneBy({
      userID: createSubRoundDto.createBy,
    });
    if (!createBy) {
      throw new NotFoundException('User not found');
    }

    // สร้าง SubRound ใหม่
    const subRound = this.subRoundRepository.create({
      ...createSubRoundDto,
      round, // ตั้งค่า round เป็น entity
      createBy, // ตั้งค่า createBy เป็น entity
    });

    return await this.subRoundRepository.save(subRound); // บันทึกข้อมูล
  }

  // ค้นหาทุก SubRound
  async findAll() {
    return await this.subRoundRepository.find();
  }

  // ค้นหาด้วย id
  async findOne(id: number) {
    const subRound = await this.subRoundRepository.findOneBy({ id });
    if (!subRound) {
      throw new NotFoundException(`SubRound with id ${id} not found`);
    }
    return subRound;
  }

  // ฟังก์ชันค้นหาสถานะรอบล่าสุด
  async findLatestSubRoundStatus(): Promise<boolean> {
    const latestSubRound = await this.subRoundRepository.findOne({
      where: { status: 1 },
      order: { createDate: 'DESC' },
    });

    // ตรวจสอบว่า status ของรอบล่าสุดเป็น 1 หรือไม่
    if (latestSubRound) {
      return true; // สถานะเป็น 1 (เปิด)
    }

    return false; // ไม่พบรอบ หรือสถานะไม่ใช่ 1
  }


  async findLatestSubRoundWithDetails(): Promise<SubRound> {
    // ค้นหาข้อมูล SubRound ที่มีข้อมูลครบถ้วน
    const latestSubRound = await this.subRoundRepository.findOne({
      where: {},
      order: { createDate: 'DESC' }, // เรียงลำดับจากล่าสุด
      relations: ['round', 'createBy'], // โหลดความสัมพันธ์ 'round' และ 'createBy'
    });
  
    if (!latestSubRound) {
      throw new NotFoundException('ไม่พบข้อมูล SubRound ล่าสุด');
    }
  
    return latestSubRound;
  }

  // อัปเดต SubRound ด้วย id
  async update(id: number, updateSubRoundDto: UpdateSubRoundDto) {
    const subRound = await this.subRoundRepository.findOneBy({ id });
    if (!subRound) {
      throw new NotFoundException('SubRound not found');
    }

    // ตรวจสอบเฉพาะฟิลด์ที่เปลี่ยนแปลง
    Object.assign(subRound, updateSubRoundDto); // ใช้ข้อมูลจาก DTO อัปเดต
    return await this.subRoundRepository.save(subRound); // บันทึกการอัปเดต
  }

  // ลบ SubRound ด้วย id
  async remove(id: number) {
    const subRound = await this.subRoundRepository.findOneBy({ id });
    if (!subRound) {
      throw new NotFoundException(`SubRound with id ${id} not found`);
    }
    await this.subRoundRepository.remove(subRound); // ลบข้อมูลจากฐานข้อมูล
    return { message: `SubRound with id ${id} has been removed.` }; // ส่งข้อความหลังจากลบเสร็จ
  }
}
