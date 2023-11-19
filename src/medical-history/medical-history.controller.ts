/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { MedicalHistoryService } from './medical-history.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/user/entities/user-role.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthRequest } from 'src/auth/types/authPayload.type';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';


@Controller('medical-history')
export class MedicalHistoryController {
  constructor(private readonly medicalHistoryService: MedicalHistoryService) {}



  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.DOCTOR)
  async create(
    @Body() createMedicalHistoryDto: CreateMedicalHistoryDto,
    @Req() req: AuthRequest,
  ) {
    const doctorid = req.user.sub;
    console.log(doctorid);
    const { id } = await this.medicalHistoryService.create(
      doctorid,
      createMedicalHistoryDto,
    );
    return {
      "message": "Resource created successfully",
      "data": {
        id
      }
    };
  }

  @UseGuards(AuthGuard)
  @Get('patient/:id')
  async medicalhistoiesLisT(@Param('id') id: number) {
    const medicalhistories = await this.medicalHistoryService.MedicalhistoiesListForPatient(id);

    return {
      "message": "Resource fetched successfully",
      "data": {
        medicalhistories
      }
    }
  }

  @Delete('/:id')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.DOCTOR)
  async delete(@Param('id') id: number) {
    await this.medicalHistoryService.delete(id);
    return {
      "message": "Resource deleted successfully",

    }
  }
  @Patch('/:id')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.DOCTOR)
  async update(
    @Param('id') id: number,
    @Body() createMedicalHistoryDto: CreateMedicalHistoryDto,
  ) {
    await this.medicalHistoryService.update(id, createMedicalHistoryDto);
    return {
      "message": "Resource updated successfully",

    }
  }

  
}
