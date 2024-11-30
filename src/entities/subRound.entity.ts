// subRound.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Round } from './round.entity';
import { User } from './user.entity';

@Entity()
export class SubRound {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  numberRound: number;

  @ManyToOne(() => Round, (round) => round.id)
  round: Round;

  @Column({ type: 'integer' })
  price: number;

  @Column({ type: 'integer' })
  status: number;

  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column({ type: 'timestamp' })
  end_time: Date;

  @ManyToOne(() => User, (user) => user.userID)
  createBy: User;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  createDate: Date;
}
