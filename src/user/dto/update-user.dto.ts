import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  place: string;
  @IsString()
  phone: string;
  @IsString()
  password: string;
}

export class updateUserPermissionDto {
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
  @IsNotEmpty()
  @IsString()
  id: string;
}
