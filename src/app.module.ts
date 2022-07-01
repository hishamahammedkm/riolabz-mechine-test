import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PageModule } from './page/page.module';
import { DoctorModule } from './doctor/doctor.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, PageModule, DoctorModule, PrismaModule, AuthModule,ConfigModule.forRoot({isGlobal:true})],

})
export class AppModule {}
