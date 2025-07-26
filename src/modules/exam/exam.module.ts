import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { PrismaModule } from 'src/Database/prisma.module';
import { JwtAccsesToken } from 'src/common/config/jwt/jwt';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register(JwtAccsesToken)],
  controllers: [ExamController],
  providers: [ExamService]
})
export class ExamModule {}
