/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicalHistoryModule } from './medical-history/medical-history.module';
import { DoctorsModule } from './doctors/doctors.module';
import { PatientsModule } from './patients/patients.module';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import  ormconfig from './config/ormconfig';
import { AppoinetementModule } from './appointements/appointements.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports:  [    TypeOrmModule.forRoot({
    ...ormconfig,
   
  }),
  
  MedicalHistoryModule, DoctorsModule, PatientsModule, PrescriptionsModule, UserModule, AuthModule , AppoinetementModule , AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
