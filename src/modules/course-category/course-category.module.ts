import { Module } from '@nestjs/common';
import { CourseCategoryController } from './course-category.controller';
import { CourseCategoryService } from './course-category.service';
import { PrismaModule } from 'src/Database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CourseCategoryController],
  providers: [CourseCategoryService]
})
export class CourseCategoryModule {}
