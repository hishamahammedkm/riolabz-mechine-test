import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, updateUserPermissionDto } from './dto/update-user.dto';
import * as argon from 'argon2';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany({});
  }
  async updatePermission(updateUserPermissionDto:updateUserPermissionDto) {
    return await this.prisma.user.update({
      where:{id:updateUserPermissionDto.id},
      data:{
        isAdmin:updateUserPermissionDto.status
      }
    })
  }
  async updateProfile(email: string, updateUserDto: UpdateUserDto) {
    const { password, ...rest } = updateUserDto;
    let hashedPassword: string;
    if (password) {
      try {
        hashedPassword = await argon.hash(password);
      } catch (err) {
        //...
      }
    }

    return await this.prisma.user.update({
      where: {
        email: email,
      },
      data: {
        ...rest,
        ...(hashedPassword && { password: hashedPassword }),
      },
    });
  }
}
