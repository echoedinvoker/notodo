import { fetchRewards } from "@/db/queries/rewards"
import { fetchNotodos } from "@/db/queries/notodos";
import { RewardList } from "@/components/reward";
import NotodoListLoading from "@/components/notodo/notodo-list-loading";
import { Suspense } from "react";
import AbsoluteLink from "@/components/common/absolute-link";
import { paths } from "@/paths";
import { fetchRewardClaims } from "@/db/queries/rewardClaims";

interface RewardsPageProps {
  params: {
    userId: string;
  }
}

// TODO: when there is no any result, redirect to create page
// TODO: Need somewhere to check the reward claim and give a chance to remove them
export default async function RewardsPage({ params: { userId } }: RewardsPageProps) {

  return (
    <>
      <AbsoluteLink href={paths.rewardCreatePage(userId)} />
      <div className="flex flex-col gap-4 p-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-4">
            {/* TODO: RWD layout should be change to the same as NotodoList, or maybe use different layout and long press to consume way to design... */}
            {/* TODO: Write new skeleton component */}
            <Suspense fallback={<NotodoListLoading />}>
              {/* TODO: disabled rewards are not easy to see, maybe change to outline style */}
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
