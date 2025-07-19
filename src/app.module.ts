import { Module } from '@nestjs/common';
import { AssignedCourseModule } from './modules/assigned-course/assigned-course.module';
import { PruchasedCourseModule } from './modules/pruchased-course/pruchased-course.module';
import { RatingModule } from './modules/rating/rating.module';
import { LessonModuleModule } from './modules/lesson-module/lesson-module.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { VerificationsModule } from './modules/verifications/verifications.module';
import { RedisModule } from './common/config/redis/redis.module';
import { LastActivityModule } from './modules/last-activity/last-activity.module';
import { LessonViewModule } from './modules/lesson-view/lesson-view.module';
import { HomeworkModule } from './modules/homework/homework.module';
import { HomeworkSubmissionModule } from './modules/homework-submission/homework-submission.module';
import { ExamModule } from './modules/exam/exam.module';
import { ExamResultModule } from './modules/exam-result/exam-result.module';
import { QuestionModule } from './modules/question/question.module';
import { QuestionAnswerModule } from './modules/question-answer/question-answer.module';
import { PrismaModule } from './Database/prisma.module';

@Module({
  imports: [ AssignedCourseModule, PruchasedCourseModule, RatingModule, LessonModuleModule, LessonModule, VerificationsModule, RedisModule, LastActivityModule, LessonViewModule, HomeworkModule, HomeworkSubmissionModule, ExamModule, ExamResultModule, QuestionModule, QuestionAnswerModule, PrismaModule]
})
export class AppModule {}
