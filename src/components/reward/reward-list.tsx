import type { Reward } from "@prisma/client";
import RewardListItem from "./reward-list-item";
import type { RewardClaimWithReward } from "@/db/queries/rewardClaims";
import type { NotodoWithData } from "@/db/queries/notodos";

interface RewardListProps {
  fetchNotodos: () => Promise<NotodoWithData[]>;
  fetchRewards: () => Promise<Reward[]>;
  fetchRewardClaims: () => Promise<RewardClaimWithReward[]>;
}

export default async function RewardListActions({ fetchNotodos, fetchRewards, fetchRewardClaims }: RewardListProps) {
  const rewards = await fetchRewards();

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
