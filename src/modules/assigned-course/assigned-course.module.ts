import { Module } from '@nestjs/common';
import { AssignedCourseController } from './assigned-course.controller';
import { AssignedCourseService } from './assigned-course.service';
import { PrismaModule } from 'src/Database/prisma.module';
import { RedisModule } from 'src/common/config/redis/redis.module';

@Module({
  imports: [PrismaModule, RedisModule],
  controllers: [AssignedCourseController],
  providers: [AssignedCourseService]
 })



export class AssignedCourseModule {}
