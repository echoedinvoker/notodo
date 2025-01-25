
import RewardEditForm from "@/components/reward/reward-edit-form";
import { db } from "@/db";

interface EditRewardPageProps {
  params: {
    rewardId: string;
    userId: string;
  }
}

export default async function EditRewardPage({ params: { rewardId, userId } }: EditRewardPageProps) {
  const reward = await db.reward.findFirst({
    where: {
      id: rewardId
    }
  })

  if (!reward) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg m-4">
        <h1 className="text-2xl font-bold text-gray-800">Reward Not Found</h1>
        <p className="mt-4 text-gray-600">No reward found with id {rewardId}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg m-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Reward</h1>
      <RewardEditForm reward={reward!} userId={userId} />
    </div>
  );
}
