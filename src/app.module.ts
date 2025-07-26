import { Module } from '@nestjs/common';
import { AssignedCourseModule } from './modules/assigned-course/assigned-course.module';
import { PruchasedCourseModule } from './modules/pruchased-course/pruchased-course.module';
import { RatingModule } from './modules/rating/rating.module';
import { LessonModuleModule } from './modules/lesson-module/lesson-module.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { VerificationsModule } from './modules/verifications/verifications.module';
import { RedisModule } from './common/config/redis/redis.module';
import { LastActivityModule } from './modules/last-activity/last-activity.module';
import { HomeworkModule } from './modules/homework/homework.module';
import { HomeworkSubmissionModule } from './modules/homework-submission/homework-submission.module';
import { ExamModule } from './modules/exam/exam.module';
import { ExamResultModule } from './modules/exam-result/exam-result.module';
import { QuestionModule } from './modules/question/question.module';
import { PrismaModule } from './Database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { CourseCategoryModule } from './modules/course-category/course-category.module';
import { UserModule } from './modules/user/user.module';
import { ProfileModule } from './modules/profile/profile.module';
import { LessonFileModule } from './modules/lesson-file/lesson-file.module';
import { ContactModule } from './modules/contact/contact.module';
import { FilesModule } from './modules/files/files.module';
import { ConfigModule } from '@nestjs/config';
import { CourseModule } from './modules/course/course.module';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }), 
    AuthModule,
    UserModule,
    ProfileModule,
    CourseModule, 
    CourseCategoryModule,
    AssignedCourseModule, 
    PruchasedCourseModule, 
    RatingModule,
    LessonModuleModule, 
    LessonModule, 
    VerificationsModule, 
    HomeworkModule,
    RedisModule, 
    LastActivityModule, 
    HomeworkModule, 
    HomeworkSubmissionModule, 
    ExamModule, 
    ExamResultModule,
    QuestionModule, 
    PrismaModule, 
    ProfileModule, 
    LessonFileModule, 
    ContactModule, 
    FilesModule,
  ]
})
export class AppModule {}
