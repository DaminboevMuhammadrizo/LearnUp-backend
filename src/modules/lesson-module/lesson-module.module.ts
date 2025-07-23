import { Module } from '@nestjs/common';
import { LessonModuleController } from './lesson-module.controller';
import { LessonModuleService } from './lesson-module.service';
import { PrismaModule } from 'src/Database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LessonModuleController],
  providers: [LessonModuleService]
})
export class LessonModuleModule {}
