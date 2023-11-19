/* eslint-disable prettier/prettier */
import { UpdateUserDto } from "src/user/dto/update-user.dto";

export class UpdatePatientDto extends UpdateUserDto {
  dateOfBirth?: Date;
  address?: string;
}