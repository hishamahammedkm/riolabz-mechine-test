import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateFoodMenuDto } from './create-food-menu.dto';

export class UpdateFoodMenuDto extends PartialType(CreateFoodMenuDto) {
  
  id: string;
}
