
import RewardEditForm from "@/components/reward/reward-edit-form";
import { db } from "@/db";

interface EditRewardPageProps {
  params: {
    rewardId: string;
  }
}

export default async function EditRewardPage({ params: { rewardId } }: EditRewardPageProps) {
  const reward = await db.reward.findFirst({
    where: {
      id: rewardId
    }
  })

  if (!reward) {
    return (
      <div className="p-4">
        No reward found with id {rewardId}
      </div>
    );
  }


  return (
    <div className="p-4">
      <RewardEditForm reward={reward!} />
    </div>
  );
}
