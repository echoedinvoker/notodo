import { fetchRewards } from "@/db/queries/rewards"
import { fetchNotodos } from "@/db/queries/notodos";
import { RewardList, RewardListActions } from "@/components/reward";
import { getNotodosResult } from "@/helpers/utils";

interface RewardsPageProps {
  params: {
    userId: string;
  }
}

export default async function RewardsPage({ params: { userId } }: RewardsPageProps) {
  const notodos = await fetchNotodos(userId);
  const rewards = await fetchRewards(userId);
  const { totalScore } = getNotodosResult(notodos);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <RewardList userId={userId} rewards={rewards} totalScore={totalScore} />
        </div>
        {/* TODO: hidden when small screen, show + button instead */}
        <RewardListActions userId={userId} totalScore={totalScore} />
      </div>
    </div>
  )
}
