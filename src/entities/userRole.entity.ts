import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nameRole: string;  // This stores the role name (e.g., 'admin', 'user')

  @OneToMany(() => User, (user) => user.role)
  users: User[];  // This establishes the relation with the User entity
}
