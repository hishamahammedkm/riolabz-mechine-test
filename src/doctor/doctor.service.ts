import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) {}

  create(createDoctorDto: CreateDoctorDto) {
    return 'This action adds a new doctor';
  }

  async updateProfile(data:UpdateDoctorDto){
    const {id,...rest} = data
    return await this.prisma.doctor.update({
      where:{
        id
      },
      data:{
        ...rest
      }
    })
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
    });
    return doctors;
  }

 async findOne(slug: string) {
    return await this.prisma.doctor.findFirst({
      where:{
        slug
      }
    });
  }

  async findByAsu(asu: string) {
    return await this.prisma.doctor.findFirst({
      where:{
        asuNumber:asu
      }
    });
  }

  async findDoctorByAsuNumber(asuNumber: string) {
    return await this.prisma.doctor.findFirst({
      where:{
        asuNumber
      }
    });
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
