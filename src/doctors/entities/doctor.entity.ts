/* eslint-disable prettier/prettier */
import { Appointment } from 'src/appointements/entities/appointements.entiy';
import { MedicalHistory } from 'src/medical-history/entities/medical-history.entity';
import { Prescription } from 'src/prescriptions/entities/prescription.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';


@Entity()
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  userId: number;

  @OneToOne(() => User, {  cascade: true })
  @JoinColumn({ name: 'userId' })
  user: User;


  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];
 

  @Column()
  specialization: string;

  @OneToMany(() => Prescription, prescription => prescription.doctor)
  prescriptions: Prescription[];

  @OneToMany(() => MedicalHistory, history => history.doctor)
  medicalHistories: MedicalHistory[];
}
