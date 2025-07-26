import { Module } from '@nestjs/common';
import { LessonModuleController } from './lesson-module.controller';
import { LessonModuleService } from './lesson-module.service';
import { PrismaModule } from 'src/Database/prisma.module';
import { JwtAccsesToken } from 'src/common/config/jwt/jwt';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register(JwtAccsesToken)],
  controllers: [LessonModuleController],
  providers: [LessonModuleService]
})
export class LessonModuleModule {}
