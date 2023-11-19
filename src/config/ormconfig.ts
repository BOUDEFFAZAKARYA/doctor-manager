/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { Appointment } from 'src/appointements/entities/appointements.entiy';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { MedicalHistory } from 'src/medical-history/entities/medical-history.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Prescription } from 'src/prescriptions/entities/prescription.entity';
import { User } from 'src/user/entities/user.entity';

const ormconfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'Doc',
    entities: [Doctor, Patient, Prescription, MedicalHistory,User , Appointment , Admin],
    synchronize: false,
   

      };

export default ormconfig;

