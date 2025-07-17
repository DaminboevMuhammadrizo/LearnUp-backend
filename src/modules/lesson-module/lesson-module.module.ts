import { Module } from '@nestjs/common';
import { LessonModuleController } from './lesson-module.controller';
import { LessonModuleService } from './lesson-module.service';

@Module({
  controllers: [LessonModuleController],
  providers: [LessonModuleService]
})
export class LessonModuleModule {}
