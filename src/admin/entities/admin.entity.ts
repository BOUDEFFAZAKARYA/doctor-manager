/* eslint-disable prettier/prettier */
import { User } from 'src/user/entities/user.entity';
import { Entity, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryColumn()
  userId: number;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'userId' })
  user: User;

}