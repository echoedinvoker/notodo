import { fetchRewards } from "@/db/queries/rewards"
import { fetchNotodos } from "@/db/queries/notodos";
import { RewardList } from "@/components/reward";
import { getNotodosResult } from "@/helpers/utils";
import NotodoListLoading from "@/components/notodo/notodo-list-loading";
import { Suspense } from "react";
import AbsoluteLink from "@/components/common/absolute-link";
import { paths } from "@/paths";

interface RewardsPageProps {
  params: {
    userId: string;
  }
}

// TODO: when there is no any result, redirect to create page
export default async function RewardsPage({ params: { userId } }: RewardsPageProps) {
  const notodos = await fetchNotodos(userId);
  const rewards = await fetchRewards(userId);
  const { totalScore } = getNotodosResult(notodos);

  return (
    <>
      <AbsoluteLink href={paths.rewardCreatePage(userId)} />
      <div className="flex flex-col gap-4 p-4">
        <div className="grid grid-cols-4 gap-4">
          {/* TODO: change to full parent width */}
          <div className="col-span-4">
            {/* TODO: RWD layout should be change to the same as NotodoList */}
            <Suspense fallback={<NotodoListLoading />}>
              <RewardList userId={userId} rewards={rewards} totalScore={totalScore} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}
