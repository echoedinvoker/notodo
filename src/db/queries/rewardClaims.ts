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
