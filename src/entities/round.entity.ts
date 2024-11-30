// round.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Group } from './group.entity';
import { User } from './user.entity';
import { SubRound } from './subRound.entity';

@Entity()
export class Round {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  round_status: number;

  @ManyToOne(() => Group, (group) => group.idGroup)
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
