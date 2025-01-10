import { fetchRewardClaimByRewardClaimId } from "@/db/queries/rewardClaims";

interface RewardClaimShowPageProps {
  params: {
    userId: string;
    rewardId: string;
    rewardClaimId: string;
  }
}

export default async function RewardClaimShowPage({ params: { userId, rewardId, rewardClaimId } }: RewardClaimShowPageProps) {
  const rewardClaim = await fetchRewardClaimByRewardClaimId(rewardClaimId)

  return (
    <div>
      <h3>{rewardClaim.id}</h3>
    </div>
  );
}
