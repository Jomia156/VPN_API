/*
  Warnings:

  - Added the required column `PrivateKey` to the `peer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."peer" ADD COLUMN     "PrivateKey" TEXT NOT NULL;
