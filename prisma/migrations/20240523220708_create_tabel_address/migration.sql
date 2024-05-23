-- AlterTable: Add new optional addressId column to Event and Provider
ALTER TABLE "Event" ADD COLUMN "addressId" BIGINT;
ALTER TABLE "Provider" ADD COLUMN "addressId" BIGINT;

-- CreateTable: Create the Address table
CREATE TABLE "Address" (
    "id" BIGSERIAL NOT NULL,
    "formattedAddress" VARCHAR(500) NOT NULL,
    "street" VARCHAR(200),
    "number" VARCHAR(20),
    "zipCode" VARCHAR(20),
    "neighborhood" VARCHAR(200),
    "city" VARCHAR(200),
    "state" VARCHAR(20),
    "country" VARCHAR(100),
    "latitude" DECIMAL(10,7) NOT NULL,
    "longitude" DECIMAL(10,7) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- Insert addresses for existing events
INSERT INTO "Address" ("formattedAddress", "latitude", "longitude")
SELECT DISTINCT
    e."address" AS "formattedAddress",
    0.0 AS "latitude",
    0.0 AS "longitude"
FROM "Event" e
WHERE e."address" IS NOT NULL;

-- Update events to reference the newly created addresses
WITH address_ids AS (
    SELECT
        id AS "addressId",
        "formattedAddress"
    FROM "Address"
),
event_ids AS (
    SELECT
        id AS "eventId",
        "address"
    FROM "Event"
    WHERE "address" IS NOT NULL
)
UPDATE "Event"
SET "addressId" = address_ids."addressId"
FROM address_ids
WHERE "Event"."address" = address_ids."formattedAddress";

-- AlterTable: Set the addressId column as NOT NULL in Event
ALTER TABLE "Event" ALTER COLUMN "addressId" SET NOT NULL;

-- Drop the old address columns
ALTER TABLE "Event" DROP COLUMN "address";
ALTER TABLE "Provider" DROP COLUMN "address";

-- CreateIndex: Ensure unique addressId in Event and Provider
CREATE UNIQUE INDEX "Event_addressId_key" ON "Event"("addressId");
CREATE UNIQUE INDEX "Provider_addressId_key" ON "Provider"("addressId");

-- AddForeignKey: Add foreign key constraints
ALTER TABLE "Event" ADD CONSTRAINT "Event_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
