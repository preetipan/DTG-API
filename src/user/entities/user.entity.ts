import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    UserID: string;

    @Column({ type: 'varchar', length: 200 })
    DisplayName: string;

    @Column({ type: 'varchar', length: 200 })
    PictureURL: string;

    @Column({ type: 'varchar', length: 100 })
    Role: string;

    @Column({ type: 'integer' })  // เปลี่ยนจาก 'int' เป็น 'integer'
    Balance: number;

    @CreateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    CreateDate: string;

    @UpdateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    UpdateDate: string;
}
