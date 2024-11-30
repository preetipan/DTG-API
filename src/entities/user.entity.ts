import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserRole } from './userRole.entity';
import { Group } from './group.entity';


export enum StatusFundEnum {
  CASH = 1,
  CREDIT = 2,
}

export enum statusEnum {
  Normal = 1,
  Blacklis = 2,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  userID: string;

  @Column({ type: 'enum', enum: statusEnum })
  status: statusEnum;

  @ManyToOne(() => UserRole, (userRole) => userRole.users)
  @JoinColumn({ name: 'roleId' })
  role: UserRole;

  @Column({ type: 'integer', nullable: true })
  fund: number;

  @Column({ type: 'integer', nullable: true })
  remaining_fund: number;

  @Column({ type: 'integer', nullable: true })
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

