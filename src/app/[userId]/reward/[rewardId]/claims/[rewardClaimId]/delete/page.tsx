import { RewardClaimDelete, RewardClaimDeleteKeepEffect } from "@/components/reward";
import { fetchRewardWithRewardId } from "@/db/queries/rewards";
import { paths } from "@/paths";
import Link from "next/link";

interface DeleteRewardClaimPageProps {
  params: {
    userId: string;
    rewardId: string;
    rewardClaimId: string;
  }
}

export default async function DeleteRewardClaimPage({ params: { userId, rewardId, rewardClaimId } }: DeleteRewardClaimPageProps) {
  const rewardClaim = await fetchRewardWithRewardId(rewardId);
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg m-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Delete Reward Claim</h1>

      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <p className="text-lg">
          Points consumed: <span className="font-semibold text-blue-600">{rewardClaim.pointCost} points</span>
        </p>
      </div>

      <div className="space-y-4">
        {/* TODO: create actions seperately and useFormState hook in RewardClaimDelete and RewardClaimDelete */}
        <RewardClaimDelete />
        <RewardClaimDeleteKeepEffect />
      </div>

      <div className="mt-6">
        <Link
          href={paths.rewardClaimListPage(userId, rewardId)}
          className="text-blue-500 hover:text-blue-700 transition duration-300"
        >
          Cancel
        </Link>
      </div>
    </div>
  )
}
