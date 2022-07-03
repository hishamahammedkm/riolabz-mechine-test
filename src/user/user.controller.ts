import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }
  // @UseGuards(JwtGuard)
  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }
  

  @UseGuards(JwtGuard)
  @Patch('/updateProfile')
  update(@GetUser('email') email:string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateProfile(email, updateUserDto);
  }


}
