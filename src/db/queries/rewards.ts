import type { Reward, RewardClaim } from "@prisma/client";
import { db } from "..";
import { cache } from "react";

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
