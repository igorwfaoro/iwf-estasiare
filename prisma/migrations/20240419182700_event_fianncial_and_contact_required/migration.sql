-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_contactInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_financialId_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "financialId" SET NOT NULL,
ALTER COLUMN "contactInfoId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_financialId_fkey" FOREIGN KEY ("financialId") REFERENCES "EventFinancial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_contactInfoId_fkey" FOREIGN KEY ("contactInfoId") REFERENCES "EventContactInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
