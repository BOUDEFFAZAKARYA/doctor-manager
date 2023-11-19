/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { DoctorsModule } from 'src/doctors/doctors.module';
import { PatientsModule } from 'src/patients/patients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Appointment } from './entities/appointements.entiy';
import { AppoinetementController } from './appointements.controller';
import { AppoinetementService } from './appointements.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    DoctorsModule,
    PatientsModule,
  ],
  controllers: [AppoinetementController],
  providers: [AppoinetementService, JwtService],
})
export class AppoinetementModule {}
