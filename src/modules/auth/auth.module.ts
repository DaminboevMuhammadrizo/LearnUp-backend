import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/Database/prisma.module';
import { RedisModule } from 'src/common/config/redis/redis.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccsesToken } from 'src/common/config/jwt/jwt';
import { VerificationsModule } from '../verifications/verifications.module';
import { SmsService } from 'src/common/service/sms.service';

@Module({
  imports: [PrismaModule, RedisModule, JwtModule.register(JwtAccsesToken), VerificationsModule],
  controllers: [AuthController],
  providers: [AuthService, SmsService],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
