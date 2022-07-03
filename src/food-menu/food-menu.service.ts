import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFoodMenuDto } from './dto/create-food-menu.dto';
import { UpdateFoodMenuDto } from './dto/update-food-menu.dto';

@Injectable()
export class FoodMenuService {
  constructor(private prisma: PrismaService) {}

  async create(createFoodMenuDto: CreateFoodMenuDto) {
    return await this.prisma.foodMenu.create({
      data: {
        ...createFoodMenuDto,
      },
    });
  }

  async findAll() {
    return await this.prisma.foodMenu.findMany({});
  }

 async update(id: string, updateFoodMenuDto: UpdateFoodMenuDto) {
    return await this.prisma.foodMenu.update({
      where:{
        id,
      },
      data:{
        ...updateFoodMenuDto
      }
    })
  }

 
}
