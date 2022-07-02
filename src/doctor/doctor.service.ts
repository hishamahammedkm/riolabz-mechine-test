import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import * as argon from 'argon2';

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) {}

  create(createDoctorDto: CreateDoctorDto) {
    return 'This action adds a new doctor';
  }

  async updateProfile(data: UpdateDoctorDto, doctorId: number) {
   const {password,...rest} = data
   let hashedPassword:string
    if (password) {
      try {
        hashedPassword = await argon.hash(password);

      } catch (err) {
        //...
      }
    }

    return await this.prisma.doctor.update({
      where: {
        id: doctorId,
      },
      data: {
        ...rest,
        ...(hashedPassword &&  {password:hashedPassword})
      },
    });
  }

  async findAll(
    latitude?: string,
    longitude?: string,
    page: number = 1,
    limit: number = 10,
  ) {
    console.log(page, limit);

    const doctors = await this.prisma.doctor.findMany({
      take: limit,
      skip: limit * (page - 1),
      where: {},
      select: {
        name: true,
        photo: true,
        hospital: true,
        slug: true,
      },
    });

    return doctors;
  }

  async findOne(slug: string) {
    return await this.prisma.doctor.findFirst({
      where: {
        slug,
      },
      select: {
        name: true,
        photo: true,
        hospital: true,
        slug: true,
        phone: true,
        experience: true,
        speciality: true,
        qualifications: true,
        location: true,
      },
    });
  }

  async findByAsu(asu: string) {
    return await this.prisma.doctor.findFirst({
      where: {
        asuNumber: asu,
      },
      select: {
        name: true,
        photo: true,
        hospital: true,
        slug: true,
        phone: true,
        experience: true,
        speciality: true,
        qualifications: true,
        location: true,
      },
    });
  }

  async findDoctorByAsuNumber(asuNumber: string) {
    return await this.prisma.doctor.findFirst({
      where: {
        asuNumber,
      },
    });
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
