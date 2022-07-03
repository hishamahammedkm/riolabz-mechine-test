import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { FoodMenuModule } from './food-menu/food-menu.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule,ConfigModule.forRoot({isGlobal:true}), FoodMenuModule],

})
export class AppModule {}
