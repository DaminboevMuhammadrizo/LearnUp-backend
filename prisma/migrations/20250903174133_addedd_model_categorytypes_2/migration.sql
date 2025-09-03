/*
  Warnings:

  - You are about to drop the column `courseCategoryId` on the `CategoryTypes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoryTypes" DROP CONSTRAINT "CategoryTypes_courseCategoryId_fkey";

-- AlterTable
ALTER TABLE "CategoryTypes" DROP COLUMN "courseCategoryId";

-- AlterTable
ALTER TABLE "CourseCategory" ADD COLUMN     "categoryTypesId" INTEGER;

-- AddForeignKey
ALTER TABLE "CourseCategory" ADD CONSTRAINT "CourseCategory_categoryTypesId_fkey" FOREIGN KEY ("categoryTypesId") REFERENCES "CategoryTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
