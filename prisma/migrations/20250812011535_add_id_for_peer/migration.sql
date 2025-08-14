-- AlterTable
ALTER TABLE "public"."peer" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "peer_pkey" PRIMARY KEY ("id");
