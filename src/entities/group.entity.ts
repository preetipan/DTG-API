import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Round } from './round.entity';
import { Transaction } from './transaction.entity';

@Entity()
export class Group {
  @PrimaryColumn({ type: 'varchar', length: 100, unique: true })
  idGroup: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  groupName: string;

  @Column({ type: 'boolean', default: false })
  cockIsActive: boolean;

  @Column({ type: 'boolean', default: false })
  hiloIsActive: boolean;

  @Column({ type: 'boolean', default: false })
  openPlay: boolean;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  subGroup: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  subGroupname: string;

  // เพิ่มจำนวนรอบใหญ่
  @Column({ type: 'int', default: 0 })
  main_round_number: number;

  // เพิ่มจำนวนรอบเล็ก
  @Column({ type: 'int', default: 0 })
  sub_round_count: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  createBy: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  updateBy: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  // การเชื่อมโยงกับ Round
  @OneToMany(() => Round, (round) => round.group)
  rounds: Round[];

  // การเชื่อมโยงกับ Transaction
  @OneToMany(() => Transaction, (transaction) => transaction.groupId)
  transactions: Transaction[];
}
