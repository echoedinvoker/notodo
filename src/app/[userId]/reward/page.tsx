import { fetchRewards } from "@/db/queries/rewards"
import { fetchNotodos } from "@/db/queries/notodos";
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
      <h1 className="text-xl font-bold text-stone-700">Reward List</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          {totalScore}
          {/* <NotodoList userId={userId} notodos={notodos} /> */}
        </div>
        {/* <NotodoListActions userId={userId} totalScore={totalScore} totalWeight={totalWeight} /> */}
      </div>
    </div>
  )
}
