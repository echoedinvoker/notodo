import type { Reward } from "@prisma/client";
import RewardListItem from "./reward-list-item";
import { RewardClaimWithReward } from "@/db/queries/rewardClaims";

interface RewardListProps {
  userId: string;
  rewards: Reward[];
  totalScore: number;
  fetchRewardClaims: () => Promise<RewardClaimWithReward[]>;
}

export default function RewardListActions({ userId, rewards, totalScore, fetchRewardClaims }: RewardListProps) {

  return (
    <div className="flex flex-col gap-2">
      {rewards.map((reward) => (
        <RewardListItem
          key={reward.id}
          reward={reward}
          totalScore={totalScore}
          fetchRewardClaims={fetchRewardClaims}
        />
      ))}
    </div>
  )
}
