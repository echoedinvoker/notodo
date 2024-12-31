import { fetchRewards } from "@/db/queries/rewards"
import { fetchNotodos } from "@/db/queries/notodos";
import { RewardList } from "@/components/reward";
import { Suspense } from "react";
import AbsoluteLink from "@/components/common/absolute-link";
import { paths } from "@/paths";
import { fetchRewardClaims } from "@/db/queries/rewardClaims";
import RewardListSkeleton from "@/components/reward/reward-list-skeleton";

interface RewardsPageProps {
  params: {
    userId: string;
  }
}

export default async function RewardsPage({ params: { userId } }: RewardsPageProps) {

  return (
    <>
      <AbsoluteLink href={paths.rewardCreatePage(userId)} />
      <div className="flex flex-col gap-4 p-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-4">
            <Suspense fallback={<RewardListSkeleton />}>
              {/* TODO: need to create a new page to show claims */}
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
    </>
  )
}
