import { Module } from '@nestjs/common';
import { PruchasedCourseController } from './pruchased-course.controller';
import { PruchasedCourseService } from './pruchased-course.service';

@Module({
  controllers: [PruchasedCourseController],
  providers: [PruchasedCourseService]
})
export class PruchasedCourseModule {}
