-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('WEDDING');

-- CreateTable
CREATE TABLE "Event" (
    "id" BIGSERIAL NOT NULL,
    "eventType" "EventType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "addressId" BIGINT NOT NULL,
    "contentId" BIGINT NOT NULL,
    "financialId" BIGINT,
    "weddingDetailId" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventAddress" (
    "id" BIGSERIAL NOT NULL,
    "shortDescription" VARCHAR(300) NOT NULL,
    "fullDescription" VARCHAR(500) NOT NULL,

    CONSTRAINT "EventAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventContent" (
    "id" BIGSERIAL NOT NULL,
    "primaryColor" VARCHAR(7) NOT NULL,
    "bannerImage" VARCHAR(500) NOT NULL,
    "logoImage" VARCHAR(500),
    "icon" VARCHAR(500),
    "spotifyPlaylistUrl" VARCHAR(100),

    CONSTRAINT "EventContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventContentImage" (
    "id" BIGSERIAL NOT NULL,
    "image" VARCHAR(500) NOT NULL,
    "eventContentId" BIGINT NOT NULL,

    CONSTRAINT "EventContentImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventWeddingDetail" (
    "id" BIGSERIAL NOT NULL,
    "brideName" VARCHAR(100) NOT NULL,
    "groomName" VARCHAR(100) NOT NULL,

    CONSTRAINT "EventWeddingDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventFinancial" (
    "id" BIGSERIAL NOT NULL,
    "paypalBusinessCode" VARCHAR(100),

    CONSTRAINT "EventFinancial_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Event_addressId_key" ON "Event"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_contentId_key" ON "Event"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_financialId_key" ON "Event"("financialId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_weddingDetailId_key" ON "Event"("weddingDetailId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "EventAddress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "EventContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_financialId_fkey" FOREIGN KEY ("financialId") REFERENCES "EventFinancial"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_weddingDetailId_fkey" FOREIGN KEY ("weddingDetailId") REFERENCES "EventWeddingDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventContentImage" ADD CONSTRAINT "EventContentImage_eventContentId_fkey" FOREIGN KEY ("eventContentId") REFERENCES "EventContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "Invitation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gift" ADD CONSTRAINT "Gift_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
