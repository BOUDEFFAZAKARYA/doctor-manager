/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { PrescriptionsController } from './prescriptions.controller';
import { Prescription } from './entities/prescription.entity';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { PatientsModule } from 'src/patients/patients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prescription]),
    DoctorsModule,
    PatientsModule,
  ],
  controllers: [PrescriptionsController],
  providers: [PrescriptionsService , JwtService],
})
export class PrescriptionsModule {}
