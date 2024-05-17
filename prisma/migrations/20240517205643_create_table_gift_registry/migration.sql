-- CreateTable
CREATE TABLE "EventGiftRegistry" (
    "id" BIGSERIAL NOT NULL,
    "eventId" BIGINT NOT NULL,
    "giftRegistryId" BIGINT NOT NULL,

    CONSTRAINT "EventGiftRegistry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GiftRegistry" (
    "id" BIGSERIAL NOT NULL,
    "storeName" VARCHAR(100) NOT NULL,
    "description" VARCHAR(100),
    "url" VARCHAR(100),

    CONSTRAINT "GiftRegistry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventGiftRegistry" ADD CONSTRAINT "EventGiftRegistry_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventGiftRegistry" ADD CONSTRAINT "EventGiftRegistry_giftRegistryId_fkey" FOREIGN KEY ("giftRegistryId") REFERENCES "GiftRegistry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
