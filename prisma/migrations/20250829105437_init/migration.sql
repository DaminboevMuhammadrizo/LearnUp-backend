/*
  Warnings:

  - You are about to drop the column `phone` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Users_phone_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "phone",
ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
