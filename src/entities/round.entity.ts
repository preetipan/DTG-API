// round.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Group } from './group.entity';
import { User } from './user.entity';
import { SubRound } from './subRound.entity';


export enum RoundStatusEnum {
  OPEN = 1,
  CLOSE = 2,
}


export enum RoundResultEnum {
  WIN_BLUE = 'WIN_BLUE',
  WIN_RED = 'WIN_RED',
  DRAW = 'DRAW',
}

@Entity()
export class Round {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RoundStatusEnum })
  round_status: RoundStatusEnum;

  @ManyToOne(() => Group, (group) => group.rounds)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @Column({ type: 'varchar', length: 100 })
  result: string;

  @ManyToOne(() => User, (user) => user.userID)
  createBy: User;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  createDate: Date;

  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column({ type: 'timestamp' })
  end_time: Date;

  @OneToMany(() => SubRound, (subRound) => subRound.round)
  subRounds: SubRound[];
}
