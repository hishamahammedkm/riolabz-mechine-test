import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    name:string
    email:string
    place:string
    phone:string
    password:string
}

export class updateUserPermissionDto  {
    status:boolean
    id:string
  
}
