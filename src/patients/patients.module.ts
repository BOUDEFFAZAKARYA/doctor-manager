/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient,User]),],
  controllers: [PatientsController],
  providers: [PatientsService, JwtService],
  exports: [PatientsService],

})
export class PatientsModule {}
