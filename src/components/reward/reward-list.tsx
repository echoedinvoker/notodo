import type { Reward } from "@prisma/client";
import RewardListItem from "./reward-list-item";

interface RewardListProps {
  rewards: Reward[];
  totalScore: number;
}

export default function RewardListActions({ rewards, totalScore }: RewardListProps) {

  return (
    <div className="flex flex-col gap-2">
      {rewards.map((reward) => (
        <RewardListItem key={reward.id} reward={reward} totalScore={totalScore} />
      ))}
    </div>
  )
}
