import { ConflictException, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/Database/prisma.service';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}
  private logger = new Logger(SeederService.name);

  onModuleInit() {
    this.seedUsers();
  }

  async seedUsers() {
    const users = {
        fullName: 'Muhammadrizo_Daminboev',
        email: 'm701rizo@gmail.com',
        password: '10101010',
        role: UserRole.ADMIN,
      }

      if(await this.prisma.users.findUnique({where: { email: users.email }})) {
        this.logger.log('user alredy exsists !')
        return
      }

      const hashed = await hash(users.password, 10);

      await this.prisma.users.create({
        data: {
          email: users.email,
          password: hashed,
          role: users.role,
          fullName: users.fullName,
        },
      });

      this.logger.log(`${users.role} created (${users.email})`);
  }
}
