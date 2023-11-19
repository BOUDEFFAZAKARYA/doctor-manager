/* eslint-disable prettier/prettier */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorsService } from 'src/doctors/doctors.service';
import { PatientsService } from 'src/patients/patients.service';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointements.entiy';
import { CreateAppointmentDto } from './dto/create-appontement.dto';


@Injectable()
export class AppoinetementService {


    constructor(
    @InjectRepository(Appointment)
    private Repository: Repository<Appointment>,
    private doctorService: DoctorsService,
    private patientService: PatientsService,
  ) {}


  private async isAppointmentTimeSlotTaken(doctorId: number, date: Date, time: string): Promise<boolean> {
    // Check if the specified time slot for the given doctor is already booked
  
    const existingAppointment = await this.Repository.findOne({
      where: {
        doctor: { userId: doctorId },
        date: new Date(date),
        time,
      },
    });
  
    return !!existingAppointment;
  }

  async create(doctorId: number, createMedicalHistoryDto: CreateAppointmentDto) {


    const { email, ...data } = createMedicalHistoryDto;

    if (!this.isAppointmentTimeSlotTaken(doctorId,data.date,data.time)
    ) {
        throw new HttpException('Appoinetement not accessible in this time with this doctor ', HttpStatus.CONFLICT);
      }


    const doctor = await this.doctorService.findbyId(doctorId);
    const patient = await this.patientService.getByEmail(email);

    return await this.Repository.save({
      doctor,
      patient,
      ...data,
    });
  }

  async AppointementsListForPatient(patientId: number) {
    return await this.Repository.find({
      where: {
        patient: { userId: patientId },
      },
      relations: ['doctor', 'doctor.user'],

    });
  }

  async findById(id: number) {
    const appointement = await this.Repository.findOne({
      where: {
        id,
      },
      relations: {
        doctor: {
          user: true,
        },
        patient: {
          user: true,
        },
      },
    });

    if (!appointement) {
      throw new HttpException('Prescription not found', HttpStatus.NOT_FOUND);
    }

    return appointement;
  }

  async delete(id: number) {
    await this.findById(id);
    await this.Repository.delete(id);
  }


  async update(id: number,createMedicalHistoryDto: CreateAppointmentDto ) {
    await this.findById(id);
    return await this.Repository.update(id, createMedicalHistoryDto);
  }
  
}
