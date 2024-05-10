-- CreateTable
CREATE TABLE "EventWeddingDetailGiftRegistry" (
    "id" BIGSERIAL NOT NULL,
    "eventWeddingDetailId" BIGINT NOT NULL,
    "giftRegistryId" BIGINT NOT NULL,

    CONSTRAINT "EventWeddingDetailGiftRegistry_pkey" PRIMARY KEY ("id")
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
ALTER TABLE "EventWeddingDetailGiftRegistry" ADD CONSTRAINT "EventWeddingDetailGiftRegistry_eventWeddingDetailId_fkey" FOREIGN KEY ("eventWeddingDetailId") REFERENCES "EventWeddingDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventWeddingDetailGiftRegistry" ADD CONSTRAINT "EventWeddingDetailGiftRegistry_giftRegistryId_fkey" FOREIGN KEY ("giftRegistryId") REFERENCES "GiftRegistry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
