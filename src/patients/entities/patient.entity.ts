/* eslint-disable prettier/prettier */
import { Appointment } from 'src/appointements/entities/appointements.entiy';
import { MedicalHistory } from 'src/medical-history/entities/medical-history.entity';
import { Prescription } from 'src/prescriptions/entities/prescription.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';


@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  userId: number;

  @OneToOne(() => User, {  cascade: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  dob: Date;

  @Column()
  address: string;

  @OneToMany(() => Prescription, prescription => prescription.patient)
  prescriptions: Prescription[];

  @OneToMany(() => MedicalHistory, history => history.patient)
  medicalHistories: MedicalHistory[];

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];
}
