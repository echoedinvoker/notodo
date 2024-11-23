import { Reward } from "@prisma/client";
import { db } from "..";

export async function fetchRewards(userId: string): Promise<Reward[]> {
  const rewards = await db.reward.findMany({
    where: { userId },
  })
  return rewards.sort((a, b) => {
    return b.pointCost - a.pointCost;
  });
}
