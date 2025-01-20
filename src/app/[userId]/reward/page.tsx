import { fetchRewards } from "@/db/queries/rewards"
import { fetchNotodos } from "@/db/queries/notodos";
import { RewardList } from "@/components/reward";
import { Suspense } from "react";
import AbsoluteLink from "@/components/common/absolute-link";
import { paths } from "@/paths";
import { fetchRewardClaims } from "@/db/queries/rewardClaims";
import RewardListSkeleton from "@/components/reward/reward-list-skeleton";
import { FaPlus } from "react-icons/fa";

interface RewardsPageProps {
  params: {
    userId: string;
  }
}

export default async function RewardsPage({ params: { userId } }: RewardsPageProps) {

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Rewards</h1>
        <AbsoluteLink href={paths.rewardCreatePage(userId)}>
          <FaPlus /> Reward
        </AbsoluteLink>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-4">
            <Suspense fallback={<RewardListSkeleton />}>
              <RewardList
                userId={userId}
                fetchNotodos={() => fetchNotodos(userId)}
                fetchRewards={() => fetchRewards(userId)}
                fetchRewardClaims={() => fetchRewardClaims(userId)}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
