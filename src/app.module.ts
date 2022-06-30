import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PageModule } from './page/page.module';
import { DoctorModule } from './doctor/doctor.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, PageModule, DoctorModule, AuthModule],

})
export class AppModule {}
