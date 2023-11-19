/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient } from './entities/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {

  constructor(

    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,


    @InjectRepository(User)
    private userRepository: Repository<User>,

  ) { }


  async create(user: User, createPatientDto: CreatePatientDto) {
    return await this.patientRepository.save({
      user,
      ...createPatientDto,
    });
  }

  async getAll(): Promise<Patient[]> {
    return  await this.patientRepository.find({
      relations: ['user'],
    });

  }

  async getById(id: number): Promise<Patient> {
    const user = await this.patientRepository.findOne({  
      
      where: {
      user: { id }
    },
    relations: ['user'], 
    
  })



    if (!user) {
      throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getByEmail(email: string): Promise<Patient> {
    const user = await this.patientRepository.findOne({  
      
      where: {
      user: { email }
    },
    relations: ['user'], 
    
  })



    if (!user) {
      throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {

    
    const patientToUpdate = await this.getById(id);
    const { name, ...patientData } = updatePatientDto;
  
    if (Object.keys(patientData).length !== 0) {
      await this.patientRepository.update(id, patientData);
    }
  
    if (name) {
      await this.userRepository.update(id, { name });
    }
  }

  async delete(id: number): Promise<void> {
    const user = await this.getById(id); // Reusing the previously defined method
    await this.patientRepository.remove(user);
  }





}
