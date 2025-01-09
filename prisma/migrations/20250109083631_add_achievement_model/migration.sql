-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AchievementThreshold" (
    "id" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "thresholdId" TEXT NOT NULL,

    CONSTRAINT "AchievementThreshold_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AchievementReward" (
    "id" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "rewardId" TEXT NOT NULL,

    CONSTRAINT "AchievementReward_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AchievementThreshold_achievementId_thresholdId_key" ON "AchievementThreshold"("achievementId", "thresholdId");

-- CreateIndex
CREATE UNIQUE INDEX "AchievementReward_achievementId_rewardId_key" ON "AchievementReward"("achievementId", "rewardId");

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementThreshold" ADD CONSTRAINT "AchievementThreshold_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementThreshold" ADD CONSTRAINT "AchievementThreshold_thresholdId_fkey" FOREIGN KEY ("thresholdId") REFERENCES "Threshold"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementReward" ADD CONSTRAINT "AchievementReward_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementReward" ADD CONSTRAINT "AchievementReward_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "Reward"("id") ON DELETE CASCADE ON UPDATE CASCADE;
