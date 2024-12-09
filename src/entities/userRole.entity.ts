import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';

// 1 Superadmin
// 2 Admin
// 3 User
@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nameRole: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
