import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { PrismaModule } from 'src/Database/prisma.module';
import { JwtAccsesToken } from 'src/common/config/jwt/jwt';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register(JwtAccsesToken)],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
