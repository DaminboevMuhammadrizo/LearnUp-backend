-- DropForeignKey
ALTER TABLE "CourseCategory" DROP CONSTRAINT "CourseCategory_categoryTypesId_fkey";

-- AddForeignKey
ALTER TABLE "CourseCategory" ADD CONSTRAINT "CourseCategory_categoryTypesId_fkey" FOREIGN KEY ("categoryTypesId") REFERENCES "CategoryTypes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
