/*
  Warnings:

  - Changed the type of `shelflife` on the `peer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."peer" DROP COLUMN "shelflife",
ADD COLUMN     "shelflife" TIMESTAMP(3) NOT NULL;
