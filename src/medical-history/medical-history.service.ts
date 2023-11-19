/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorsService } from 'src/doctors/doctors.service';
import { PatientsService } from 'src/patients/patients.service';
import { Repository } from 'typeorm';
import { MedicalHistory } from './entities/medical-history.entity';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';

@Injectable()
export class MedicalHistoryService {


    constructor(
    @InjectRepository(MedicalHistory)
    private Repository: Repository<MedicalHistory>,
    private doctorService: DoctorsService,
    private patientService: PatientsService,
  ) {}


  async create(doctorId: number, createMedicalHistoryDto: CreateMedicalHistoryDto) {


    const { email, ...data } = createMedicalHistoryDto;

    const doctor = await this.doctorService.findbyId(doctorId);
    const patient = await this.patientService.getByEmail(email);

    return await this.Repository.save({
      doctor,
      patient,
      ...data,
    });
  }

  async MedicalhistoiesListForPatient(patientId: number) {
    return await this.Repository.find({
      where: {
        patient: { userId: patientId },
      },
      relations: {
        doctor: {
          user: true,
        },
      },
    });
  }

  async findById(id: number) {
    const prescription = await this.Repository.findOne({
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

    if (!prescription) {
      throw new HttpException('Prescription not found', HttpStatus.NOT_FOUND);
    }

    return prescription;
  }

  async delete(id: number) {
    await this.findById(id);
    await this.Repository.delete(id);
  }


  async update(id: number,createMedicalHistoryDto: CreateMedicalHistoryDto ) {
    await this.findById(id);
    return await this.Repository.update(id, createMedicalHistoryDto);
  }
  
}
