/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './entities/user-role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { DoctorsService } from 'src/doctors/doctors.service';
import { PatientsService } from 'src/patients/patients.service';


@Injectable()
export class UserService {

  constructor(

    @InjectRepository(User)
    private userRepository: Repository<User>,
    private doctorService: DoctorsService,
    private patientService: PatientsService,

  ) { }


  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      console.log('user not found')
    }

    return user;
  }

  /* async create(createUserDto: CreateUserDto , userData: { user: User, additionalData: any }) {
    const { name, email, password, role } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.userRepository.save({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const additionalData = this.extractAdditionalData(createUserDto, role);

    if (additionalData) {
      const { user, additionalData } = userData;

      await this.userService.create(user, additionalData);
    }

    return user;
  } */


  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, role } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.userRepository.save({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (role === UserRole.PATIENT) {

      const { dob, address } = createUserDto;


      this.patientService.create(user, {
        address,
        dob
      });
    }

    if (role === UserRole.DOCTOR) {
      const { specialization} = createUserDto;


      this.doctorService.create(user, {
        specialization
      });
    }




    return user;
  }
  async validateUser(email: string, password: string): Promise<User | null> {

    const user = await this.findUserByEmail(email );

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

}
