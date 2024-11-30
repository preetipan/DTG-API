// group.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Round } from './round.entity';
import { Transaction } from './transaction.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  idGroup: string;

  @Column({ type: 'varchar', length: 100 })
  groupName: string;

  @Column({ type: 'boolean', default: false })
  cockIsActive: boolean;

  @Column({ type: 'boolean', default: false })
  hiloIsActive: boolean;

  // การเชื่อมโยงกับ User
  @OneToMany(() => User, (user) => user.group)
  users: User[];

  // การเชื่อมโยงกับ Round
  @OneToMany(() => Round, (round) => round.group)
  rounds: Round[];

  // การเชื่อมโยงกับ Transaction
  @OneToMany(() => Transaction, (transaction) => transaction.groupId)
  transactions: Transaction[];
}
