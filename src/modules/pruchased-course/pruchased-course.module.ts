import { Module } from '@nestjs/common';
import { PruchasedCourseController } from './pruchased-course.controller';
import { PruchasedCourseService } from './pruchased-course.service';
import { PrismaModule } from 'src/Database/prisma.module';
import { JwtAccsesToken } from 'src/common/config/jwt/jwt';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register(JwtAccsesToken)],
  controllers: [PruchasedCourseController],
  providers: [PruchasedCourseService]
})
export class PruchasedCourseModule {}
