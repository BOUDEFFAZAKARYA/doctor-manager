/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/user/entities/user-role.enum';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthRequest } from 'src/auth/types/authPayload.type';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';


@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) { }


  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.DOCTOR)
  async create(
    @Body() createPrescriptionDto: CreatePrescriptionDto,
    @Req() req: AuthRequest,
  ) {
    const doctorid = req.user.sub;
    console.log(doctorid);
    const { id } = await this.prescriptionsService.create(
      doctorid,
      createPrescriptionDto,
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
  async prescriptionsLisT(@Param('id') id: number) {
    const patientPrescriptions = await this.prescriptionsService.PrescriptionsListForPatient(id);

    return {
      "message": "Resource fetched successfully",
      "data": {
        patientPrescriptions
      }
    }
  }

  @Delete('/:id')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.DOCTOR)
  async delete(@Param('id') id: number) {
    await this.prescriptionsService.delete(id);
    return {
      "message": "Resource deleted successfully",

    }
  }
  @Patch('/:id')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.DOCTOR)
  async update(
    @Param('id') id: number,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto,
  ) {
    await this.prescriptionsService.update(id, updatePrescriptionDto);
    return {
      "message": "Resource updated successfully",

    }
  }
}
