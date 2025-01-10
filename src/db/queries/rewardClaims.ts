import type { RewardClaim, Reward } from "@prisma/client";
import { cache } from "react";
import { db } from "..";

export type RewardClaimWithReward = RewardClaim & {
  reward: Reward;
}

export const fetchRewardClaims = cache(async (userId: string): Promise<RewardClaimWithReward[]> => {
  return await db.rewardClaim.findMany({
    where: { userId },
    include: { reward: true },
  })
})

export const fetchRewardClaimsByRewardId = cache(async (rewardId: string): Promise<RewardClaim[]> => {
  return await db.rewardClaim.findMany({
    where: { rewardId },
  })
})

export const fetchRewardClaimByRewardClaimId = cache(async (rewardClaimId: string): Promise<RewardClaimWithReward> => {
  const rewardClaim = await db.rewardClaim.findUnique({
    where: { id: rewardClaimId },
    include: { reward: true },
  })
  if (!rewardClaim) {
    throw new Error("RewardClaim not found");
  }
  return rewardClaim;
})
