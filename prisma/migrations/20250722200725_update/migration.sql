/*
  Warnings:

  - A unique constraint covering the columns `[lessonId,usersId]` on the table `LessonView` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LessonView_lessonId_usersId_key" ON "LessonView"("lessonId", "usersId");
