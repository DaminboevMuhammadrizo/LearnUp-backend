import { Module } from '@nestjs/common';
import { AssignedCourseController } from './assigned-course.controller';
import { AssignedCourseService } from './assigned-course.service';
import { PrismaModule } from 'src/Database/prisma.module';
import { RedisModule } from 'src/common/config/redis/redis.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccsesToken } from 'src/common/config/jwt/jwt';

@Module({
  imports: [PrismaModule, RedisModule, JwtModule.register(JwtAccsesToken)],
  controllers: [AssignedCourseController],
  providers: [AssignedCourseService]
 })



export class AssignedCourseModule {}
