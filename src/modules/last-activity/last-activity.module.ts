import { Module } from '@nestjs/common';
import { LastActivityController } from './last-activity.controller';
import { LastActivityService } from './last-activity.service';
import { PrismaModule } from 'src/Database/prisma.module';
import { JwtAccsesToken } from 'src/common/config/jwt/jwt';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register(JwtAccsesToken)],
  controllers: [LastActivityController],
  providers: [LastActivityService]
})
export class LastActivityModule {}
