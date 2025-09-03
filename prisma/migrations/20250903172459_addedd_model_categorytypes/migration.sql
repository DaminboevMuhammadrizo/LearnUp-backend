-- CreateTable
CREATE TABLE "CategoryTypes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "courseCategoryId" INTEGER NOT NULL,

    CONSTRAINT "CategoryTypes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CategoryTypes" ADD CONSTRAINT "CategoryTypes_courseCategoryId_fkey" FOREIGN KEY ("courseCategoryId") REFERENCES "CourseCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
