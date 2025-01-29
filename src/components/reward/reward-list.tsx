import type { Reward } from "@prisma/client";
import RewardListItem from "./reward-list-item";
import type { RewardClaimWithReward } from "@/db/queries/rewardClaims";
import type { NotodoWithData } from "@/db/queries/notodos";
import Link from "next/link";
import { paths } from "@/paths";

interface RewardListProps {
  userId: string;
  fetchNotodos: () => Promise<NotodoWithData[]>;
  fetchRewards: () => Promise<Reward[]>;
  fetchRewardClaims: () => Promise<RewardClaimWithReward[]>;
}

export default async function RewardList({ userId, fetchNotodos, fetchRewards, fetchRewardClaims }: RewardListProps) {
  const rewards = await fetchRewards();

  if (rewards.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600 mb-4">{`You don\'t have any rewards yet.`}</p>
        <Link
          className="text-blue-500 hover:text-blue-700 transition duration-300 text-lg font-semibold"
          href={paths.rewardCreatePage(userId)}
        >
          Create your first reward
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
