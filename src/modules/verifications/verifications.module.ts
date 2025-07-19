import { Module } from '@nestjs/common';
import { VerificationsController } from './verifications.controller';
import { VerificationsService } from './verifications.service';
import { SmsService } from 'src/common/service/sms.service';
import { PrismaModule } from 'src/Database/prisma.module';
import { RedisModule } from 'src/common/config/redis/redis.module';

@Module({
  imports: [PrismaModule, RedisModule],
  controllers: [VerificationsController],
  providers: [VerificationsService, SmsService],
  exports: [VerificationsService]
})
export class VerificationsModule {}
