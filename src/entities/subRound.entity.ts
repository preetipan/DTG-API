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

  @Column({ type: 'varchar' })  // เปลี่ยนเป็น 'varchar' เพื่อเก็บเป็น string
  price: string;  // เปลี่ยนประเภทจาก number เป็น string

  @Column({ type: 'integer' })
  status: number;

  @Column({ type: 'timestamp', nullable: true })
  start_time: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_time: Date;

  @ManyToOne(() => User, (user) => user.userID)
  createBy: User;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  createDate: Date;
}