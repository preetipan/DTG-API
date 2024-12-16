import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubRoundService } from './sub-round.service';
import { SubRoundController } from './sub-round.controller';
import { SubRound } from '../entities/subRound.entity';
import { Round } from '../entities/round.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubRound, Round, User]),
  ],
  controllers: [SubRoundController],
  providers: [SubRoundService],
})
export class SubRoundModule {}
