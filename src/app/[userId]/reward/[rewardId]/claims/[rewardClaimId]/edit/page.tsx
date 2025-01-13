import RewardClaimEditForm from "@/components/reward/reward-claim-edit-form";
import { fetchRewardClaimByRewardClaimId } from "@/db/queries/rewardClaims";

interface EditRewardClaimPageProps {
  params: {
    userId: string;
    rewardId: string;
    rewardClaimId: string;
  }
}

export default async function EditRewardClaimPage({ params: { userId, rewardId, rewardClaimId } }: EditRewardClaimPageProps) {
  const rewardClaim = await fetchRewardClaimByRewardClaimId(rewardClaimId);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg m-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{rewardClaim.reward.name}</h1>

      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <p className="text-lg">
          Claim date: <time className="font-semibold text-blue-600">{rewardClaim.claimedAt.toLocaleString()}</time>
        </p>
      </div>

      <RewardClaimEditForm rewardClaim={rewardClaim} userId={userId} />
    </div>
  );
}
