-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_courseCategoryId_fkey";

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_courseCategoryId_fkey" FOREIGN KEY ("courseCategoryId") REFERENCES "CourseCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
