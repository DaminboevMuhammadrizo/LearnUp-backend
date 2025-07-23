/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `CourseCategory` will be added. If there are existing duplicate values, this will fail.
  - Made the column `usersId` on table `Course` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_usersId_fkey";

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "usersId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CourseCategory_name_key" ON "CourseCategory"("name");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
