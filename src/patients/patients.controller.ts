/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/user/entities/user-role.enum';
import { UpdatePatientDto } from './dto/update-patient.dto';




@ApiTags('Patients APIs')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}


  @Patch('/:id')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.PATIENT)
  async update(
    @Param('id') id: number,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    await this.patientsService.update(id, updatePatientDto);
    return  {
      "message": "Resource updated successfully",
 
    }
  }


  @Get()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.DOCTOR)
  async getAll() {
    const patients = await this.patientsService.getAll();

    return patients ;
  
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async prescriptionsLisT(@Param('id') id: number) {
    const patient = await this.patientsService.getById(id);

    return {
      "message": "Resource fetched successfully",
      "data": {
        patient
      }
    }
  }


  
}
