-- CreateTable
CREATE TABLE "public"."peer" (
    "id" TEXT NOT NULL,
    "peerName" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "PresharedKey" TEXT NOT NULL,
    "AllowedIps" TEXT NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shelflife" TIMESTAMP(3) NOT NULL,
    "banned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "peer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "peer_peerName_key" ON "public"."peer"("peerName");

-- CreateIndex
CREATE UNIQUE INDEX "peer_AllowedIps_key" ON "public"."peer"("AllowedIps");
