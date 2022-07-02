import {
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  import { AuthDto } from './dto';
  import * as argon from 'argon2';
  import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
  import { JwtService } from '@nestjs/jwt';
  import { ConfigService } from '@nestjs/config';
  
  @Injectable()
  export class AuthService {
    constructor(
      private prisma: PrismaService,
      private jwt: JwtService,
      private config: ConfigService,
    ) {}
  
    // async signup(dto: AuthDto) {
    //   // generate the password hash
    //   const hash = await argon.hash(dto.password);
    //   // save the new user in the db
    //   try {
    //     const user = await this.prisma.user.create({
    //       data: {
    //         email: dto.email,
    //         hash,
    //       },
    //     });
  
    //     return this.signToken(user.id, user.email);
    //   } catch (error) {
    //     if (
    //       error instanceof
    //       PrismaClientKnownRequestError
    //     ) {
    //       if (error.code === 'P2002') {
    //         throw new ForbiddenException(
    //           'Credentials taken',
    //         );
    //       }
    //     }
    //     throw error;
    //   }
    // }
  
    async signin(dto: AuthDto) {
      // find the user by email
      const doctor =
        await this.prisma.doctor.findUnique({
          where: {
            asuNumber: dto.asuNumber,
          },
          
        });
      // if user does not exist throw exception
      if (!doctor)
        throw new ForbiddenException(
          'Credentials incorrect',
        );
  
      // compare password
      const pwMatches = await argon.verify(
        doctor.password,
        dto.password,
      );
      // if password incorrect throw exception
      if (!pwMatches)
        throw new ForbiddenException(
          'Credentials incorrect',
        );
      return this.signToken(doctor.id, doctor.email,doctor.name,doctor.slug,doctor.photo,doctor.hospital);
    }
  
    async signToken(
      doctorId: number,
      email: string,
      name:string,
      slug:string,
      photo:string,
      hospital:string
    ): Promise<any> {
      const payload = {
        sub: doctorId,
        email,
      };
      const secret = this.config.get('JWT_SECRET');
  
      const token = await this.jwt.signAsync(
        payload,
        {
          expiresIn: '15m',
          secret: secret,
        },
      );
  
      return {
        access_token: token,
        name,
        slug,
        photo,
        hospital
        


      };
    }
  }
  