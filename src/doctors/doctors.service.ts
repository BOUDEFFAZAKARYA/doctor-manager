/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DoctorsService {
  constructor(

    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) { }


  async create(user: User, createPatientDto: CreateDoctorDto) {
    return await this.doctorRepository.save({
      user,
      ...createPatientDto,
    });
  }

  async findbyId(id: number) {

    const doctor = await this.doctorRepository.findOne({
      where: {
        user: { id },
      },
      relations: ['user'],
    });

    if (!doctor) {
      throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);
    }

    return doctor;
  }


}
