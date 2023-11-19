/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;
  
  @ApiProperty()
  @IsNotEmpty()
  time: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  date: Date;
}