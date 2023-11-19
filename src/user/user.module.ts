/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { PatientsModule } from 'src/patients/patients.module';
import { Patient } from 'src/patients/entities/patient.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';

@Module({

  imports: [TypeOrmModule.forFeature([User, Patient, Doctor]), 
  DoctorsModule,
  PatientsModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]

})
export class UserModule {}
