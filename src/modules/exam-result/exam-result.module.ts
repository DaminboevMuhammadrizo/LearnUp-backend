import { Module } from '@nestjs/common';
import { ExamResultController } from './exam-result.controller';
import { ExamResultService } from './exam-result.service';
import { PrismaModule } from 'src/Database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExamResultController],
  providers: [ExamResultService]
})
export class ExamResultModule {}
