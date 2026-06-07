-- AlterEnum
ALTER TYPE "ServiceType" ADD VALUE 'TREKKING';

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "trekkingId" TEXT;

-- CreateTable
CREATE TABLE "trekkings" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "image" TEXT,
    "images" TEXT[],
    "difficulty" TEXT NOT NULL DEFAULT 'Moderate',
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 4.8,
    "reviewsCount" INTEGER NOT NULL DEFAULT 50,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "itinerary" TEXT,
    "included" TEXT[],
    "excluded" TEXT[],
    "highlights" TEXT[],
    "locationTags" TEXT[],
    "maxGroupSize" INTEGER NOT NULL DEFAULT 12,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trekkings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_trekkingId_fkey" FOREIGN KEY ("trekkingId") REFERENCES "trekkings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
