import { Module } from '@nestjs/common';
import { LessonFileController } from './lesson-file.controller';
import { LessonFileService } from './lesson-file.service';
import { PrismaModule } from 'src/Database/prisma.module';
import { JwtAccsesToken } from 'src/common/config/jwt/jwt';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register(JwtAccsesToken)],
  controllers: [LessonFileController],
  providers: [LessonFileService]
})
export class LessonFileModule {}
