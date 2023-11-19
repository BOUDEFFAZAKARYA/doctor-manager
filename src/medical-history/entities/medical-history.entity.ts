/* eslint-disable prettier/prettier */
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity()
export class MedicalHistory {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Patient, patient => patient.medicalHistories)
  patient: Patient;

  @ManyToOne(() => Doctor, doctor => doctor.medicalHistories)
  doctor: Doctor;

  @Column()
  diagnosis: string;

  @Column()
  treatment: string;

  @Column('text')
  notes: string;
}
