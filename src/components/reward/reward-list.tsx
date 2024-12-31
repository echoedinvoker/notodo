import type { Reward } from "@prisma/client";
import RewardListItem from "./reward-list-item";
import type { RewardClaimWithReward } from "@/db/queries/rewardClaims";
import type { NotodoWithData } from "@/db/queries/notodos";
import { redirect } from "next/navigation";
import { paths } from "@/paths";

interface RewardListProps {
  userId: string;
  fetchNotodos: () => Promise<NotodoWithData[]>;
  fetchRewards: () => Promise<Reward[]>;
  fetchRewardClaims: () => Promise<RewardClaimWithReward[]>;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function RewardListActions({ userId, fetchNotodos, fetchRewards, fetchRewardClaims }: RewardListProps) {
  
  await wait(5000);
  const rewards = await fetchRewards();

  if (rewards.length === 0) redirect(paths.rewardCreatePage(userId));

  return (
    <div className="flex flex-col gap-2">
      {rewards.map((reward) => (
        <RewardListItem
          key={reward.id}
          reward={reward}
          fetchNotodos={fetchNotodos}
          fetchRewardClaims={fetchRewardClaims}
        />
      ))}
    </div>
  )
}
