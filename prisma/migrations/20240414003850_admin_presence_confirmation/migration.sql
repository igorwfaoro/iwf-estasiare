/*
  Warnings:

  - You are about to drop the column `confirmationDate` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `isConfirmed` on the `Guest` table. All the data in the column will be lost.
  - Made the column `description` on table `Invitation` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "GuestStatus" AS ENUM ('PENDING', 'CONFIRMED', 'DECLINED');

-- AlterTable
ALTER TABLE "Guest" DROP COLUMN "confirmationDate",
DROP COLUMN "isConfirmed",
ADD COLUMN     "status" "GuestStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Invitation" ALTER COLUMN "description" SET NOT NULL;
