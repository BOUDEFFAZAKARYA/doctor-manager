/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';



@Entity()
export class Prescription {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Patient, patient => patient.prescriptions)
  patient: Patient;

  @ManyToOne(() => Doctor, doctor => doctor.prescriptions)
  doctor: Doctor;

  @Column()
  medication: string;

  @Column()
  dosage: string;

  @Column()
  frequency: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;
}
