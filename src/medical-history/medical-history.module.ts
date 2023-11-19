import { Module } from '@nestjs/common';
import { MedicalHistoryService } from './medical-history.service';
import { MedicalHistoryController } from './medical-history.controller';
import { MedicalHistory } from './entities/medical-history.entity';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { PatientsModule } from 'src/patients/patients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicalHistory]),
    DoctorsModule,
    PatientsModule,
  ],
  controllers: [MedicalHistoryController],
  providers: [MedicalHistoryService, JwtService],
})
export class MedicalHistoryModule {}
