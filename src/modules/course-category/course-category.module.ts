import { Module } from '@nestjs/common';
import { CourseCategoryController } from './course-category.controller';
import { CourseCategoryService } from './course-category.service';
import { PrismaModule } from 'src/Database/prisma.module';
import { JwtAccsesToken } from 'src/common/config/jwt/jwt';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register(JwtAccsesToken)],
  controllers: [CourseCategoryController],
  providers: [CourseCategoryService]
})
export class CourseCategoryModule {}
