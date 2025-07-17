import { Module } from '@nestjs/common';
import { VerificationsController } from './verifications.controller';
import { VerificationsService } from './verifications.service';
import { SmsService } from 'src/common/service/sms.service';

@Module({
  controllers: [VerificationsController],
  providers: [VerificationsService, SmsService],
  exports: [VerificationsService]
})
export class VerificationsModule {}
