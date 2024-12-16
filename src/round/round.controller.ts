import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  ValidationPipe,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { RoundService } from './round.service';
import { Round } from '../entities/round.entity';
import { CreateRoundDto } from './dto/create-round.dto';
import { UpdateRoundDto } from './dto/update-round.dto';

@Controller('round')
export class RoundController {
  constructor(private readonly roundService: RoundService) {}


  @Get('latest-details')
  async findLatestRoundWithDetails(): Promise<Round> {
    return await this.roundService.findLatestRoundWithDetails();
  }

  // Create Round
  @Post()
  @HttpCode(201) // กำหนดสถานะ HTTP ให้เป็น 201 (Created)
  async createRound(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    data: CreateRoundDto,
  ): Promise<Round> {
    return await this.roundService.create(data);
  }

  // Find all Rounds
  @Get()
  async findAll(): Promise<Round[]> {
    return await this.roundService.findAll();
  }

  // Find Round by ID with validation for `id` to be number
  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number): Promise<Round> {
    return await this.roundService.findOne(id); // หากไม่พบ Round, Service จะ throw NotFoundException เอง
  }

  @Get('statusMain/latest')
  async checkLatestRoundStatus(): Promise<boolean> {
    const isOpen = await this.roundService.findLatestRoundStatus();
    return isOpen; // ถ้า isOpen เป็น true (หมายถึงรอบเปิดอยู่), จะคืนค่า true; ถ้าเป็น false (หมายถึงรอบปิด), จะคืนค่า false
  }

  // Update Round by ID
  @Patch(':id')
  async updateRound(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    data: UpdateRoundDto,
  ): Promise<Round> {
    return await this.roundService.update(id, data);
  }

  // Remove Round by ID
  @Delete(':id')
  @HttpCode(204) // กำหนดสถานะ HTTP ให้เป็น 204 (No Content) หลังจากลบสำเร็จ
  async deleteRound(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.roundService.remove(id);
  }
}
