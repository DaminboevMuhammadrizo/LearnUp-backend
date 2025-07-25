import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { PrismaModule } from 'src/Database/prisma.module';
import { VerificationsModule } from '../verifications/verifications.module';

@Module({
  imports: [PrismaModule, VerificationsModule],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
