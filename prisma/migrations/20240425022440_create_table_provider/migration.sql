/*
  Warnings:

  - A unique constraint covering the columns `[providerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "providerId" BIGINT;

-- CreateTable
CREATE TABLE "Provider" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(300) NOT NULL,
    "contactEmail" VARCHAR(300),
    "contactPhone" VARCHAR(300),
    "contactWhatsApp" VARCHAR(300),
    "profileImage" VARCHAR(500),
    "bio" VARCHAR(500),
    "link" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProviderProviderCategory" (
    "id" BIGSERIAL NOT NULL,
    "providerId" BIGINT NOT NULL,
    "categoryId" BIGINT NOT NULL,

    CONSTRAINT "ProviderProviderCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProviderCategory" (
    "id" BIGSERIAL NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "isOther" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ProviderCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_providerId_key" ON "User"("providerId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderProviderCategory" ADD CONSTRAINT "ProviderProviderCategory_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderProviderCategory" ADD CONSTRAINT "ProviderProviderCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProviderCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
