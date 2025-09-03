/*
  Warnings:

  - Made the column `categoryTypesId` on table `CourseCategory` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CourseCategory" DROP CONSTRAINT "CourseCategory_categoryTypesId_fkey";

-- AlterTable
ALTER TABLE "CourseCategory" ALTER COLUMN "categoryTypesId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "CourseCategory" ADD CONSTRAINT "CourseCategory_categoryTypesId_fkey" FOREIGN KEY ("categoryTypesId") REFERENCES "CategoryTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
