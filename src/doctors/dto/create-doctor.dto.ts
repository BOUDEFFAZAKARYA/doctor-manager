/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDoctorDto {

  @IsNotEmpty()
  @IsString()
  specialization: string;
}