/*
  Warnings:

  - A unique constraint covering the columns `[bookingNumber]` on the table `bookings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookingNumber` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerEmail` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerPhone` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerEmail` to the `custom_trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `custom_trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerPhone` to the `custom_trips` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_userId_fkey";

-- DropForeignKey
ALTER TABLE "custom_trips" DROP CONSTRAINT "custom_trips_userId_fkey";

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "bookingNumber" TEXT NOT NULL,
ADD COLUMN     "customerEmail" TEXT NOT NULL,
ADD COLUMN     "customerName" TEXT NOT NULL,
ADD COLUMN     "customerPhone" TEXT NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "custom_trips" ADD COLUMN     "customerEmail" TEXT NOT NULL,
ADD COLUMN     "customerName" TEXT NOT NULL,
ADD COLUMN     "customerPhone" TEXT NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "bookings_bookingNumber_key" ON "bookings"("bookingNumber");

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "custom_trips" ADD CONSTRAINT "custom_trips_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
