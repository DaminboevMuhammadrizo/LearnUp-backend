import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { PrismaModule } from 'src/Database/prisma.module';
import { VerificationsModule } from '../verifications/verifications.module';
import { JwtAccsesToken } from 'src/common/config/jwt/jwt';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, VerificationsModule, JwtModule.register(JwtAccsesToken)],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
