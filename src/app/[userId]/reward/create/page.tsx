import RewardCreateForm from "@/components/reward/reward-create-form";
import { fetchRawAchievements } from "@/db/queries/achievements";
import { fetchNotodos } from "@/db/queries/notodos";

interface CreateRewardPageProps {
  params: {
    userId: string;
  };
}

export default async function CreateRewardPage({
  params,
}: CreateRewardPageProps) {
  const achievements = await fetchRawAchievements(params.userId);
  const notodos = await fetchNotodos(params.userId);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg m-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Reward</h1>
      <RewardCreateForm
        userId={params.userId}
        achievements={achievements}
        notodos={notodos}
      />
    </div>
  );
}
