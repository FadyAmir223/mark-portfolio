-- CreateEnum
CREATE TYPE "Type" AS ENUM ('COMMERCIAL', 'RESIDENTIAL');

-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('AR', 'EN');

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "name" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectI18n" (
    "id" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "projectId" TEXT,

    CONSTRAINT "ProjectI18n_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectI18n_title_key" ON "ProjectI18n"("title");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectI18n_projectId_locale_key" ON "ProjectI18n"("projectId", "locale");

-- AddForeignKey
ALTER TABLE "ProjectI18n" ADD CONSTRAINT "ProjectI18n_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
