-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('WEDDING');

-- CreateTable
CREATE TABLE "Event" (
    "id" BIGSERIAL NOT NULL,
    "eventType" "EventType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "address" VARCHAR(300) NOT NULL,
    "designDetailId" BIGINT NOT NULL,
    "financialDetailId" BIGINT,
    "weddingDetailId" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventDesignDetail" (
    "id" BIGSERIAL NOT NULL,
    "primaryColor" VARCHAR(7) NOT NULL,
    "secondaryColor" VARCHAR(7),
    "bannerImage" VARCHAR(500),

    CONSTRAINT "EventDesignDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeddingDetail" (
    "id" BIGSERIAL NOT NULL,
    "brideName" VARCHAR(100) NOT NULL,
    "groomName" VARCHAR(100) NOT NULL,

    CONSTRAINT "WeddingDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "id" BIGSERIAL NOT NULL,
    "description" VARCHAR(200),
    "eventId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guest" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "confirmationDate" TIMESTAMP(3),
    "invitationId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gift" (
    "id" BIGSERIAL NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "image" VARCHAR(500) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "eventId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Gift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventFinancialDetail" (
    "id" BIGSERIAL NOT NULL,
    "paypalBussinessCode" VARCHAR(100),

    CONSTRAINT "EventFinancialDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_designDetailId_key" ON "Event"("designDetailId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_financialDetailId_key" ON "Event"("financialDetailId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_weddingDetailId_key" ON "Event"("weddingDetailId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_designDetailId_fkey" FOREIGN KEY ("designDetailId") REFERENCES "EventDesignDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_financialDetailId_fkey" FOREIGN KEY ("financialDetailId") REFERENCES "EventFinancialDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_weddingDetailId_fkey" FOREIGN KEY ("weddingDetailId") REFERENCES "WeddingDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "Invitation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gift" ADD CONSTRAINT "Gift_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
