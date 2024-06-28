/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ProjectI18n_title_key";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "video" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProjectI18n" ALTER COLUMN "description" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "Project"("name");
