import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubRoundService } from './sub-round.service';
import { CreateSubRoundDto } from './dto/create-sub-round.dto';
import { UpdateSubRoundDto } from './dto/update-sub-round.dto';
import { SubRound } from '../entities/subRound.entity';
import { ParseIntPipe } from '@nestjs/common';

@Controller('sub-round')
export class SubRoundController {
  constructor(private readonly subRoundService: SubRoundService) {}

  // สร้าง SubRound ใหม่
  @Post()
  create(@Body() createSubRoundDto: CreateSubRoundDto) {
    return this.subRoundService.create(createSubRoundDto);
  }

  // ค้นหาทุก SubRound
  @Get()
  findAll() {
    return this.subRoundService.findAll();
  }

  // ค้นหา SubRound โดยใช้ ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    // ใช้ ParseIntPipe เพื่อแปลง id ให้เป็น number
    return this.subRoundService.findOne(id);
  }

  @Get('statusSubMain/latest')
  async checkLatestRoundStatus(): Promise<boolean> {
    const isOpen = await this.subRoundService.findLatestSubRoundStatus();
    return isOpen;
  }

  @Get('latest-details')
  async findLatestRoundWithDetails(): Promise<SubRound> {
    // เรียกใช้ฟังก์ชันใน Service
    return await this.subRoundService.findLatestSubRoundWithDetails();
  }

  // อัปเดต SubRound โดยใช้ ID
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubRoundDto: UpdateSubRoundDto,
  ) {
    return this.subRoundService.update(id, updateSubRoundDto);
  }

  // ลบ SubRound โดยใช้ ID
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.subRoundService.remove(id);
  }
}
