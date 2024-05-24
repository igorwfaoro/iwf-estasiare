/*
  Warnings:

  - You are about to drop the column `contactEmail` on the `Provider` table. All the data in the column will be lost.
  - You are about to drop the column `contactPhone` on the `Provider` table. All the data in the column will be lost.
  - You are about to drop the column `contactWhatsApp` on the `Provider` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Provider` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "contactEmail",
DROP COLUMN "contactPhone",
DROP COLUMN "contactWhatsApp",
DROP COLUMN "link";

-- CreateTable
CREATE TABLE "ProviderLinkType" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "icon" VARCHAR(100) NOT NULL,
    "urlStructure" VARCHAR(600),

    CONSTRAINT "ProviderLinkType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProviderLink" (
    "id" BIGSERIAL NOT NULL,
    "label" VARCHAR(100) NOT NULL,
    "url" VARCHAR(600) NOT NULL,
    "urlKey" VARCHAR(200),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "typeId" BIGINT NOT NULL,
    "providerId" BIGINT NOT NULL,

    CONSTRAINT "ProviderLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProviderLink" ADD CONSTRAINT "ProviderLink_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ProviderLinkType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderLink" ADD CONSTRAINT "ProviderLink_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
