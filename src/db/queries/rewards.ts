import type { Reward } from "@prisma/client";
import { db } from "..";
import { cache } from "react";

export const fetchRewards = cache(async (userId: string): Promise<Reward[]> => {
  const rewards = await db.reward.findMany({
    where: { userId },
  })
  return rewards.sort((a, b) => {
    return b.pointCost - a.pointCost;
  });
})
