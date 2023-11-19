/* eslint-disable prettier/prettier */
import { Admin, DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Prescription } from 'src/prescriptions/entities/prescription.entity';
import { MedicalHistory } from 'src/medical-history/entities/medical-history.entity';
import { User } from 'src/user/entities/user.entity';
import { Appointment } from 'src/appointements/entities/appointements.entiy';
import { DropAllTables1637587000000 } from 'src/migrations/DropAllTables1637587000000';


config();

// const configService = new ConfigService();

export default new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'Doc',
    entities: [Doctor, Patient, Prescription, MedicalHistory,User , Appointment , Admin],
    synchronize: false,
  migrations: [ DropAllTables1637587000000 ],
});