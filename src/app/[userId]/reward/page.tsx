import { fetchRewards } from "@/db/queries/rewards"
import { fetchNotodos } from "@/db/queries/notodos";
import { RewardList } from "@/components/reward";
import { Suspense } from "react";
import AbsoluteLink from "@/components/common/absolute-link";
import { paths } from "@/paths";
import { fetchRewardClaims } from "@/db/queries/rewardClaims";
import RewardListSkeleton from "@/components/reward/reward-list-skeleton";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";

interface RewardsPageProps {
  params: {
    userId: string;
  }
}

export default async function RewardsPage({ params: { userId } }: RewardsPageProps) {
  const rewards = await fetchRewards(userId);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Rewards</h1>
        <AbsoluteLink href={paths.rewardCreatePage(userId)}>
          <FaPlus /> Reward
        </AbsoluteLink>
      </div>
      <div className="max-w-4xl mx-auto">
        {rewards.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">{`You don\'t have any rewards yet.`}</p>
            <Link
              className="text-blue-500 hover:text-blue-700 transition duration-300 text-lg font-semibold"
              href={paths.rewardCreatePage(userId)}
            >
              Create your first reward
            </Link>
          </div>
        ) : (
          <Suspense fallback={<RewardListSkeleton />}>
            <RewardList
              userId={userId}
              fetchNotodos={() => fetchNotodos(userId)}
              fetchRewards={() => fetchRewards(userId)}
              fetchRewardClaims={() => fetchRewardClaims(userId)}
            />
          </Suspense>
        )}
      </div>
    </div>
  )
}
