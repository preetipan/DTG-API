import { Module } from '@nestjs/common';
import { RoundService } from './round.service';
import { RoundController } from './round.controller';
import { Round } from '../entities/round.entity';
import { Group } from '../entities/group.entity';
import { User } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Round, Group])],
  controllers: [RoundController],
  providers: [RoundService],
  exports: [RoundService],
})
export class RoundModule {}