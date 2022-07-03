import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, updateUserPermissionDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @UseGuards(JwtGuard)
  @Get('find-all-users')
  findAll(@GetUser('isAdmin') isAdmin: boolean) {
    if (!isAdmin) throw new ForbiddenException();
    return this.userService.findAll();
  }
  @Post('/update-permission')
  updatePermission(
    @GetUser('isAdmin') isAdmin: boolean,
    @Body() updateUserPermissionDto: updateUserPermissionDto,
  ) {
    if (!isAdmin) throw new ForbiddenException();
    return this.userService.updatePermission(updateUserPermissionDto);
  }

  @UseGuards(JwtGuard)
  @Patch('/update-profile')
  update(
    @GetUser('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateProfile(email, updateUserDto);
  }
}
