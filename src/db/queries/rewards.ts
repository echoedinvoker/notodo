import type { Reward, RewardClaim } from "@prisma/client";
import { db } from "..";
import { cache } from "react";
import { fetchNotodos } from "./notodos";
import { getNotodosResult } from "@/helpers/utils";
import { fetchRewardClaims } from "./rewardClaims";
import { fetchRelatedAchievementsByRewardId } from "./achievementsRewards";
import { fetchRelatedThresholdsByAchievementId } from "./achievementsThresholds";
import { ProcessedAchievement, ProcessedThreshold } from "./achievements";
import { areAllAchievementsCompleted } from "@/helpers/processAchievements";

export type RewardWithClaims = Reward & {
  rewardClaims: RewardClaim[]
}

export const fetchRewards = cache(async (userId: string): Promise<Reward[]> => {
  const rewards = await db.reward.findMany({
    where: { userId },
  })
  return rewards.sort((a, b) => {
    return b.pointCost - a.pointCost;
  });
})

export const fetchRewardWithClaims = cache(async (rewardId: string): Promise<RewardWithClaims> => {
  const reward = await db.reward.findUnique({
    where: { id: rewardId },
    include: { rewardClaims: true },
  })

  if (!reward) {
    throw new Error("Reward not found");
  }

  return reward;
})

export const fetchRewardWithRewardId = cache(async (rewardId: string): Promise<Reward> => {
  const reward = await db.reward.findUnique({
    where: { id: rewardId },
  })
  if (!reward) {
    throw new Error("Reward not found");
  }
  return reward;
})


export const fetchRewardData = cache(async (rewardId: string, userId: string) => {
  const reward = await fetchRewardWithRewardId(rewardId)
  if (!reward) return null

  const notodos = await fetchNotodos(userId)
  const { totalScore, totalWeight } = getNotodosResult(notodos)
  const rewardClaims = await fetchRewardClaims(userId)
  const totalConsumed = rewardClaims.reduce((acc, claim) => acc + claim.reward.pointCost, 0)

  const relatedAchievements = await fetchRelatedAchievementsByRewardId(reward.id)
  const achievementsWithThresholds = await Promise.all(
    relatedAchievements.map(async (achievement) => {
      const thresholds = await fetchRelatedThresholdsByAchievementId(achievement.id)
      return {
        ...achievement,
        thresholds: thresholds.map(threshold => ({
          ...threshold,
          challengeDuration: 0,
          isAchieved: false
        })) as ProcessedThreshold[]
      } as ProcessedAchievement
    })
  )

  const allAchievementsCompleted = areAllAchievementsCompleted(achievementsWithThresholds, totalWeight)
  const consumable = totalScore >= (totalConsumed + reward.pointCost) && allAchievementsCompleted

  return { reward, totalScore, totalConsumed, consumable }
})
