/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {

  constructor(

    @InjectRepository(Admin)
    private patientRepository: Repository<Admin>,


    @InjectRepository(User)
    private userRepository: Repository<User>,

  ) { }


  async create(user: User, createPatientDto: Admin) {
    return await this.patientRepository.save({
      user,
      ...createPatientDto,
    });
  }

 

  async getById(id: number): Promise<Admin> {
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


}
