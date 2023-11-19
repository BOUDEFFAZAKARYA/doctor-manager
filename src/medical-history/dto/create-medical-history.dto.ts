/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateMedicalHistoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  diagnosis: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  treatment: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  notes: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}