/*
  Warnings:

  - A unique constraint covering the columns `[contactInfoId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "contactInfoId" BIGINT;

-- CreateTable
CREATE TABLE "EventContactInfo" (
    "id" BIGSERIAL NOT NULL,
    "description" VARCHAR(100),
    "phoneNumber" VARCHAR(30),
    "whatsAppNumber" VARCHAR(30),
    "email" VARCHAR(100),

    CONSTRAINT "EventContactInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_contactInfoId_key" ON "Event"("contactInfoId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_contactInfoId_fkey" FOREIGN KEY ("contactInfoId") REFERENCES "EventContactInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
