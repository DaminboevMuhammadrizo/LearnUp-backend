import { Module } from '@nestjs/common';
import { HomeworkSubmissionController } from './homework-submission.controller';
import { HomeworkSubmissionService } from './homework-submission.service';
import { PrismaModule } from 'src/Database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HomeworkSubmissionController],
  providers: [HomeworkSubmissionService]
})
export class HomeworkSubmissionModule {}
