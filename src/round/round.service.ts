import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoundDto } from './dto/create-round.dto';
import { UpdateRoundDto } from './dto/update-round.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Round } from '../entities/round.entity';
import { Group } from '../entities/group.entity';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoundService {
  constructor(
    @InjectRepository(Round)
    private roundRepository: Repository<Round>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Create Round
  async create(data: CreateRoundDto): Promise<Round> {
    const group = await this.groupRepository.findOne({ where: { idGroup: data.groupId } });
    if (!group) {
      throw new NotFoundException(`Group with ID ${data.groupId} not found`);
    }

    const user = await this.userRepository.findOne({ where: { id: data.createBy } });
    if (!user) {
      throw new NotFoundException(`User with ID ${data.createBy} not found`);
    }

    const round = this.roundRepository.create({
      round_status: data.round_status,
      group,
      result: data.result,
      createBy: user,
      start_time: new Date(data.start_time),
      end_time: new Date(data.end_time),  
    });

    return await this.roundRepository.save(round);
  }

  // Find all Rounds
  async   findAll() {
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

  async update(id: number, updateRoundDto: UpdateRoundDto): Promise<Round> {
    const round = await this.findOne(id);
    const updatedRound = Object.assign(round, updateRoundDto);
    return await this.roundRepository.save(updatedRound);
  }

  // Remove Round
  async remove(id: number): Promise<void> {
    const round = await this.findOne(id);
    await this.roundRepository.remove(round);
  }
}
