import { Module } from '@nestjs/common';
import { HomeworkSubmissionController } from './homework-submission.controller';
import { HomeworkSubmissionService } from './homework-submission.service';
import { PrismaModule } from 'src/Database/prisma.module';
import { JwtAccsesToken } from 'src/common/config/jwt/jwt';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register(JwtAccsesToken)],
  controllers: [HomeworkSubmissionController],
  providers: [HomeworkSubmissionService]
})
export class HomeworkSubmissionModule {}
