import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateFoodMenuDto {
    @IsNotEmpty()
    @IsString()
    name:string
    @IsNotEmpty()
    @IsNumber()
    price:number
}
