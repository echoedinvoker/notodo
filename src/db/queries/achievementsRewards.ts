import { cache } from "react";
import { db } from "..";
import { Achievement, Reward } from "@prisma/client";

export const fetchRelatedRewardsByAchievementId = cache(async (achievementId: string): Promise<Reward[]> => {
  const results = await db.achievementReward.findMany({
    where: {
      achievementId
    },
    include: {
      reward: true
    }
  })
  return results.map(result => result.reward);
});

export const fetchRelatedAchievementsByRewardId = cache(async (rewardId: string): Promise<Achievement[]> => {
  const results = await db.achievementReward.findMany({
    where: {
      rewardId
    },
    include: {
      achievement: true
    }
  })
  return results.map(result => result.achievement);
});
