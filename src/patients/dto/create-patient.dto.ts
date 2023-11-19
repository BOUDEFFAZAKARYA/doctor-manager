/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreatePatientDto {


  @IsDate()
  dob: Date;

  @IsString()
  @IsNotEmpty()
  @IsDate()
  address: string;
}