/*
  Warnings:

  - The primary key for the `peer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `AllowedIps` on the `peer` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `peer` table. All the data in the column will be lost.
  - You are about to drop the column `publicKey` on the `peer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[AllowedIPs]` on the table `peer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `AllowedIPs` to the `peer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PublicKey` to the `peer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."peer_AllowedIps_key";

-- AlterTable
ALTER TABLE "public"."peer" DROP CONSTRAINT "peer_pkey",
DROP COLUMN "AllowedIps",
DROP COLUMN "id",
DROP COLUMN "publicKey",
ADD COLUMN     "AllowedIPs" TEXT NOT NULL,
ADD COLUMN     "PublicKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "peer_AllowedIPs_key" ON "public"."peer"("AllowedIPs");
