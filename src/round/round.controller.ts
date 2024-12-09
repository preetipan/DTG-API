import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, HttpCode, ValidationPipe, NotFoundException } from '@nestjs/common'; 
import { RoundService } from './round.service'; 
import { Round } from '../entities/round.entity';
import { CreateRoundDto } from './dto/create-round.dto'; 
import { UpdateRoundDto } from './dto/update-round.dto';

@Controller('round')
export class RoundController {
  constructor(private readonly roundService: RoundService) {}

  // Create Round
  @Post()
  @HttpCode(201) // กำหนดสถานะ HTTP ให้เป็น 201 (Created)
  async createUser(
    @Body(new ValidationPipe({ skipMissingProperties: true }))
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
  async findOneById(@Param('id') id: number): Promise<Round> {
    const user = await this.roundService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  // Update Round by ID
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    data: UpdateRoundDto,
  ): Promise<Round> {
    return await this.roundService.update(id, data);
  }

  // Remove Round by ID
  @Delete(':id')
  @HttpCode(204) // กำหนดสถานะ HTTP ให้เป็น 204 (No Content) หลังจากลบสำเร็จ
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.roundService.remove(id);
  }
}
