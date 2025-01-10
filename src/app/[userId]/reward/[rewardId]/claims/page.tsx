import { fetchRewardClaimsByRewardId } from "@/db/queries/rewardClaims";
import { fetchRewardWithRewardId } from "@/db/queries/rewards";
import { paths } from "@/paths";
import Link from "next/link";

interface RewardClaimListPageProps {
  params: {
    userId: string;
    rewardId: string;
  }
}
export default async function RewardClaimListPage({ params: { userId, rewardId } }: RewardClaimListPageProps) {
  const reward = await fetchRewardWithRewardId(rewardId);
  const rewardClaims = await fetchRewardClaimsByRewardId(rewardId);

  // TODO: style the page
  return (
    <div>
      <h3>{reward.name}</h3>
      <p>Points cost: <span>{reward.pointCost}</span></p>
      <p>Already consume <span>{rewardClaims.length}</span> times (<span>{reward.pointCost * rewardClaims.length} Points</span>)</p>
      {rewardClaims.map(claim => <div key={claim.id}>
        <div>{claim.claimedAt.toLocaleString()}</div>
        <Link href={paths.rewardClaimShowPage(userId, rewardId, claim.id)}>Notes</Link>
      </div>)}
    </div>
  );
}
