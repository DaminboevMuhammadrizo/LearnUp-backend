import { Module } from '@nestjs/common';
import { PruchasedCourseController } from './pruchased-course.controller';
import { PruchasedCourseService } from './pruchased-course.service';
import { PrismaModule } from 'src/Database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PruchasedCourseController],
  providers: [PruchasedCourseService]
})
export class PruchasedCourseModule {}
