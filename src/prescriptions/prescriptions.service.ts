/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prescription } from './entities/prescription.entity';
import { Repository } from 'typeorm';
import { DoctorsService } from 'src/doctors/doctors.service';
import { PatientsService } from 'src/patients/patients.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';

@Injectable()
export class PrescriptionsService {

    constructor(
        @InjectRepository(Prescription)
        private prescriptionRepository: Repository<Prescription>,
        private doctorService: DoctorsService,
        private patientService: PatientsService,
      ) {}


      async create(doctorId: number, createPrescriptionDto: CreatePrescriptionDto) {


        const { email, ...data } = createPrescriptionDto;
    
        const doctor = await this.doctorService.findbyId(doctorId);
        const patient = await this.patientService.getByEmail(email);
    
        return await this.prescriptionRepository.save({
          doctor,
          patient,
          ...data,
        });
      }

      async PrescriptionsListForPatient(patientId: number) {
        return await this.prescriptionRepository.find({
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
        const prescription = await this.prescriptionRepository.findOne({
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
        await this.prescriptionRepository.delete(id);
      }


      async update(id: number, updatePrescriptionDto:CreatePrescriptionDto ) {
        await this.findById(id);
        return await this.prescriptionRepository.update(id, updatePrescriptionDto);
      }
    
  
}
