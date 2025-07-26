import { Module } from '@nestjs/common';
import { HomeworkController } from './homework.controller';
import { HomeworkService } from './homework.service';
import { PrismaModule } from 'src/Database/prisma.module';
import { JwtAccsesToken } from 'src/common/config/jwt/jwt';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register(JwtAccsesToken)],
  controllers: [HomeworkController],
  providers: [HomeworkService]
})
export class HomeworkModule {}
