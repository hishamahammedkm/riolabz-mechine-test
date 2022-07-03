import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { FoodMenuService } from './food-menu.service';
import { CreateFoodMenuDto } from './dto/create-food-menu.dto';
import { UpdateFoodMenuDto } from './dto/update-food-menu.dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';

@Controller('food-menu')
export class FoodMenuController {
  constructor(private readonly foodMenuService: FoodMenuService) {}

  @UseGuards(JwtGuard)
  @Post('/create')
  create(
    @GetUser('isAdmin') isAdmin: boolean,
    @Body() createFoodMenuDto: CreateFoodMenuDto,
  ) {
    if (!isAdmin) throw new ForbiddenException();
    return this.foodMenuService.create(createFoodMenuDto);
  }
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.foodMenuService.findAll();
  }

  @Patch('update/:id')
  update(
    @GetUser('isAdmin') isAdmin: boolean,
    @Param('id') id: string,
    @Body() updateFoodMenuDto: UpdateFoodMenuDto,
  ) {
    if (!isAdmin) throw new ForbiddenException();

    return this.foodMenuService.update(id, updateFoodMenuDto);
  }
}
