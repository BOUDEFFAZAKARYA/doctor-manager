/* eslint-disable prettier/prettier */
// src/users/dto/create-user.dto.ts
import { IsString, IsEmail, IsEnum, IsUUID, IsNotEmpty, IsOptional, IsDate } from 'class-validator';
import { UserRole } from '../entities/user-role.enum';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
  
    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole;
  
    @IsOptional()
    @IsNotEmpty({ groups: ['patient'] })
    @IsString({ groups: ['patient'] })
    address?: string;
  
    @IsOptional()
    @IsNotEmpty({ groups: ['patient'] })
    @IsDate({ groups: ['patient'] })
    dob?: Date;
  
    @IsOptional()
    @IsNotEmpty({ groups: ['doctor'] })
    @IsString({ groups: ['doctor'] })
    specialization?: string;
  }

export class UserDto {
    @IsUUID()
    id: string;
  
    @IsString()
    name: string;
  
    @IsEmail()
    email: string;
  
    @IsEnum(UserRole)
    role: UserRole;
  }