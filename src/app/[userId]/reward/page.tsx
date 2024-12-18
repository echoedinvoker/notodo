import { fetchRewards } from "@/db/queries/rewards"
import { fetchNotodos } from "@/db/queries/notodos";
import { RewardList, RewardListActions } from "@/components/reward";
import { getNotodosResult } from "@/helpers/utils";

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
    <div className="flex flex-col gap-4 p-4">
      <div className="grid grid-cols-4 gap-4">
        {/* TODO: change to full parent width */}
        <div className="col-span-3">
          {/* TODO: RWD layout should be change to the same as NotodoList */}
          <RewardList userId={userId} rewards={rewards} totalScore={totalScore} />
        </div>
        {/* TODO: remove this, replace with create result button in line with the breadcrumb just like notodo-create-link */}
        <RewardListActions userId={userId} totalScore={totalScore} />
      </div>
    </div>
  )
}
