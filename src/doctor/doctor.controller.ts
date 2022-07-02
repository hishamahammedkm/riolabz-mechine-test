import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';

import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Get('/all')
  findAll(
    @Query('latitude') latitude?: string,
    @Query('longitude') longitude?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.doctorService.findAll(
      latitude,
      longitude,
      Number(page),
      Number(limit),
    );
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.doctorService.findOne(slug);
  }
  @UseGuards(JwtGuard)
  @Get('asu/:asu')
  findByAsu(@Param('asu') asu: string) {
    return this.doctorService.findByAsu(asu);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
  //   return this.doctorService.update(+id, updateDoctorDto);
  // }

  @UseGuards(JwtGuard)
  @Post('/updateProfile')
  updateProfile(
    @Body() @Body() updateDoctorDto: UpdateDoctorDto,
    @GetUser('id') doctorId: number,
  ) {
    return this.doctorService.updateProfile(updateDoctorDto, doctorId);
  }
}
