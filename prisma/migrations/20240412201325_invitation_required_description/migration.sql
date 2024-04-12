/*
  Warnings:

  - Made the column `description` on table `Invitation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Invitation" ALTER COLUMN "description" SET NOT NULL;
