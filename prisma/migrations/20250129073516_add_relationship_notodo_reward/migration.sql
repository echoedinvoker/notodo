-- CreateTable
CREATE TABLE "NotodoReward" (
    "id" TEXT NOT NULL,
    "notodoId" TEXT NOT NULL,
    "rewardId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotodoReward_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NotodoReward_notodoId_rewardId_key" ON "NotodoReward"("notodoId", "rewardId");

-- AddForeignKey
ALTER TABLE "NotodoReward" ADD CONSTRAINT "NotodoReward_notodoId_fkey" FOREIGN KEY ("notodoId") REFERENCES "Notodo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotodoReward" ADD CONSTRAINT "NotodoReward_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "Reward"("id") ON DELETE CASCADE ON UPDATE CASCADE;
