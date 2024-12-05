import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserRole } from './userRole.entity';
import { Group } from './group.entity';

export enum StatusFundEnum {
  CASH = 1,
  CREDIT = 2,
}

export enum UserStatusEnum {
  NORMAL = 1,
  BLACKLIST = 2,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  userID: string;

  @Column({ type: 'enum', enum: UserStatusEnum })
  status: UserStatusEnum;

  @ManyToOne(() => UserRole, (userRole) => userRole.users)
  @JoinColumn({ name: 'roleId' })
  role: UserRole;

  @Column({ type: 'integer', default: 0 })
  fund: number;

  @Column({ name: 'remaining_fund', type: 'integer', default: 0 })
  remainingFund: number;

  @Column({ name: 'daily_cashback', type: 'integer', default: 0 })
  dailyCashback: number;

  @Column({ type: 'enum', enum: StatusFundEnum })
  statusFund: StatusFundEnum;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => Group, (group) => group.users)
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateDate: Date;
}
