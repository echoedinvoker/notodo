import type { Reward } from "@prisma/client";
import RewardListItem from "./reward-list-item";
import { NotodoWithData } from "@/db/queries/notodos";
import { getNotodosResult } from "@/helpers/utils";

interface RewardListProps {
  rewards: Reward[];
  notodos: NotodoWithData[];
}

export default function RewardListActions({ rewards, notodos }: RewardListProps) {
  const { totalScore } = getNotodosResult(notodos);

  return (
    <div className="flex flex-col gap-2">
      {rewards.map((reward) => (
        <RewardListItem key={reward.id} reward={reward} totalScore={totalScore} />
      ))}
    </div>
  )
}
