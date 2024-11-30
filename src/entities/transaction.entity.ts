// transaction.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Group } from './group.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  userID: string;

  @Column({ type: 'varchar', length: 50 })
  type: string;

  @Column({ type: 'integer' })
  status: number;

  @Column({ type: 'integer' })
  createBy: number;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  createDate: Date;

  // การเชื่อมโยงกับ Group
  @ManyToOne(() => Group, (group) => group.transactions)  // เชื่อมโยงกับ transactions ใน Group
  groupId: Group;
}
