/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
;
import { Prescription } from '../entities/prescription.entity';
import { PatientPresenter } from 'src/patients/presenters/patient.presneter';
import { DoctorPresenter } from 'src/doctors/presenters/doctors.presneter';

export class PrescriptionsPresenter {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  medication?: string;

  @ApiProperty()
  dosage?: string;

  @ApiProperty()
  frequency?: string;

  @ApiProperty()
  startDate?: Date;

  @ApiProperty()
  endDate?: Date;

  @ApiProperty()
  doctor?: DoctorPresenter;

  @ApiProperty()
  patient?: PatientPresenter;

  constructor(prescription: Prescription) {
    this.id = prescription.id;
    this.medication = prescription.medication;
    this.dosage = prescription.dosage;
    this.frequency = prescription.frequency;
    this.startDate = prescription.startDate;
    this.endDate = prescription.endDate;

    this.doctor = prescription.doctor
      ? new DoctorPresenter(prescription.doctor)
      : undefined;
    this.patient = prescription.patient
      ? new PatientPresenter(prescription.patient)
      : undefined;
  }
}
