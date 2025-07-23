/*
  Warnings:

  - A unique constraint covering the columns `[usersId,lessonId]` on the table `LastActivity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LastActivity_usersId_lessonId_key" ON "LastActivity"("usersId", "lessonId");
