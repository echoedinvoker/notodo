import RewardCreateForm from "@/components/reward/reward-create-form";

interface CreateRewardPageProps {
  params: {
    userId: string;
  };
}

export default function CreateRewardPage({ params }: CreateRewardPageProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg m-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Reward</h1>
      <RewardCreateForm userId={params.userId} />
    </div>
  );
}
