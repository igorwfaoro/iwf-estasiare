/*
  Warnings:

  - You are about to drop the column `isOther` on the `ProviderCategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProviderCategory" DROP COLUMN "isOther";

-- AlterTable
ALTER TABLE "ProviderLinkType" ADD COLUMN     "index" INTEGER NOT NULL DEFAULT 0;
