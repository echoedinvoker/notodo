import { fetchRewards } from "@/db/queries/rewards"
import { fetchNotodos } from "@/db/queries/notodos";
import { paths } from "@/paths";
import Link from "next/link";
import { RewardList, RewardListActions } from "@/components/reward";

interface RewardsPageProps {
  params: {
    userId: string;
  }
}

export default async function RewardsPage({ params: { userId } }: RewardsPageProps) {
  const notodos = await fetchNotodos(userId);
  const rewards = await fetchRewards(userId);

  return (
    <div className="flex flex-col gap-4 p-4">
      <Link href={paths.notodoListPage(userId)}>
        <h1 className="text-xl font-bold text-stone-700">Reward List</h1>
      </Link>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <RewardList rewards={rewards} notodos={notodos} />
        </div>
        <RewardListActions userId={userId} />
      </div>
    </div>
  )
}
