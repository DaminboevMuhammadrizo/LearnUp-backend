import { Module } from '@nestjs/common';
import { LastActivityController } from './last-activity.controller';
import { LastActivityService } from './last-activity.service';
import { PrismaModule } from 'src/Database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LastActivityController],
  providers: [LastActivityService]
})
export class LastActivityModule {}
