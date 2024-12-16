import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Group } from './group.entity';
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

  @Column({ type: 'enum', enum: RoundStatusEnum, nullable: true })
  round_status: RoundStatusEnum;

  @ManyToOne(() => Group, (group) => group.rounds)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @Column({ type: 'enum', enum: RoundResultEnum, nullable: true })
  result?: RoundResultEnum;

  @Column({ type: 'varchar', length: 100, nullable: true })
  createBy: string;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  createDate: Date;

  @Column({ type: 'timestamp', nullable: true }) // ทำให้ start_time ไม่บังคับใส่ค่า
  start_time: Date;

  @Column({ type: 'timestamp', nullable: true }) // ทำให้ end_time ไม่บังคับใส่ค่า
  end_time: Date;

  @OneToMany(() => SubRound, (subRound) => subRound.round)
  subRounds: SubRound[];
}
