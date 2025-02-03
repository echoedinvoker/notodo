import type { Reward } from "@prisma/client";
import RewardListItem from "./reward-list-item";
import type { RewardClaimWithReward } from "@/db/queries/rewardClaims";
import type { NotodoWithData } from "@/db/queries/notodos";
import Link from "next/link";
import { paths } from "@/paths";
import { db } from "@/db";
import { getNotodosResult } from "@/helpers/utils";

interface RewardListProps {
  userId: string;
  fetchNotodos: () => Promise<NotodoWithData[]>;
  fetchRewards: () => Promise<Reward[]>;
  fetchRewardClaims: () => Promise<RewardClaimWithReward[]>;
}

export default async function RewardList({ userId, fetchNotodos, fetchRewards, fetchRewardClaims }: RewardListProps) {
  const [rewards, notodos, rewardClaims, user] = await Promise.all([
    fetchRewards(),
    fetchNotodos(),
    fetchRewardClaims(),
    db.user.findUnique({ where: { id: userId } })
  ]);

  const usedRewardIds = new Set(notodos.flatMap(notodo => notodo.rewards.map(r => r.rewardId)));
  
  const availableRewards = rewards.filter(reward => !usedRewardIds.has(reward.id));

  const { totalScore, totalWeight } = getNotodosResult(notodos);
  const totalConsumed = rewardClaims.reduce((acc, claim) => acc + claim.reward.pointCost, 0);
  const currentPoints = (user?.score || 0) + totalScore - totalConsumed;

  if (availableRewards.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600 mb-4">
          {rewards.length === 0 
            ? "You don't have any rewards yet." 
            : "All rewards are currently in use."}
        </p>
        <Link
          className="text-blue-500 hover:text-blue-700 transition duration-300 text-lg font-semibold"
          href={paths.rewardCreatePage(userId)}
        >
          Create a new reward
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {availableRewards.map((reward) => (
        <RewardListItem
          key={reward.id}
          reward={reward}
          fetchNotodos={fetchNotodos}
          fetchRewardClaims={fetchRewardClaims}
          currentPoints={currentPoints}
        />
      ))}
    </div>
  )
}
