/*
  Warnings:

  - You are about to drop the column `name` on the `peer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[peerName]` on the table `peer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[AllowedIps]` on the table `peer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `AllowedIps` to the `peer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PresharedKey` to the `peer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peerName` to the `peer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicKey` to the `peer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shelflife` to the `peer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."peer" DROP COLUMN "name",
ADD COLUMN     "AllowedIps" TEXT NOT NULL,
ADD COLUMN     "PresharedKey" TEXT NOT NULL,
ADD COLUMN     "banned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "peerName" TEXT NOT NULL,
ADD COLUMN     "publicKey" TEXT NOT NULL,
ADD COLUMN     "shelflife" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "peer_peerName_key" ON "public"."peer"("peerName");

-- CreateIndex
CREATE UNIQUE INDEX "peer_AllowedIps_key" ON "public"."peer"("AllowedIps");
