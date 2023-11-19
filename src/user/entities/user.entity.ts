/* eslint-disable prettier/prettier */
// src/users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: ['doctor', 'patient' , 'admin'], default: 'patient' })
    role: string;

    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
      }
}
