/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/user/entities/user-role.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthRequest } from 'src/auth/types/authPayload.type';
import { AppoinetementService } from './appointements.service';
import { CreateAppointmentDto } from './dto/create-appontement.dto';


@Controller('appointements')
export class AppoinetementController {
  constructor(private readonly prescriptionsService: AppoinetementService) { }


  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.DOCTOR)
  async create(
    @Body() createPrescriptionDto: CreateAppointmentDto ,
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
  async AppointementsLisT(@Param('id') id: number) {
    const Appointements = await this.prescriptionsService.AppointementsListForPatient(id);

    return {
      "message": "Resource fetched successfully",
      "data": {
        Appointements
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
    @Body() updatePrescriptionDto: CreateAppointmentDto,
  ) {
    await this.prescriptionsService.update(id, updatePrescriptionDto);
    return {
      "message": "Resource updated successfully",

    }
  }
}
