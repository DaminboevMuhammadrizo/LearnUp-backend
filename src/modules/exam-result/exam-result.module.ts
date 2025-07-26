import { Module } from '@nestjs/common';
import { ExamResultController } from './exam-result.controller';
import { ExamResultService } from './exam-result.service';
import { PrismaModule } from 'src/Database/prisma.module';
import { JwtAccsesToken } from 'src/common/config/jwt/jwt';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register(JwtAccsesToken)],
  controllers: [ExamResultController],
  providers: [ExamResultService]
})
export class ExamResultModule {}
