import { Module } from '@nestjs/common';
import { AuthModule } from './prisma/auth/auth.module';
import { UserModule } from './prisma/user/user.module';
import { MentorProfileModule } from './prisma/mentor-profile/mentor-profile.module';
import { CourseCategoryModule } from './prisma/course-category/course-category.module';
import { CourseModule } from './prisma/course/course.module';
import { AssignedCourseModule } from './modules/assigned-course/assigned-course.module';
import { PruchasedCourseModule } from './modules/pruchased-course/pruchased-course.module';
import { RatingModule } from './modules/rating/rating.module';
import { LessonModuleModule } from './modules/lesson-module/lesson-module.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { VerificationsModule } from './modules/verifications/verifications.module';
import { RedisModule } from './common/config/redis/redis.module';

@Module({
  imports: [AuthModule, UserModule, MentorProfileModule, CourseCategoryModule, CourseModule, AssignedCourseModule, PruchasedCourseModule, RatingModule, LessonModuleModule, LessonModule, VerificationsModule, RedisModule]
})
export class AppModule {}
