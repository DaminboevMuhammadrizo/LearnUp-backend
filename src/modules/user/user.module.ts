import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/Database/prisma.module';
import { JwtAccsesToken } from 'src/common/config/jwt/jwt';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register(JwtAccsesToken)],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
