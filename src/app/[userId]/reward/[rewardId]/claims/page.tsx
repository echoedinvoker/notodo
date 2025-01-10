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

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg m-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{reward.name}</h1>

      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <p className="text-lg">
          Points cost: <span className="font-semibold text-blue-600">{reward.pointCost}</span>
        </p>
        <p className="text-lg mt-2">
          Already consumed <span className="font-semibold text-green-600">{rewardClaims.length}</span> times
          (<span className="font-semibold text-purple-600">{reward.pointCost * rewardClaims.length} Points</span>)
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Claim History</h2>

      {rewardClaims.length > 0 ? (
        <ul className="space-y-4">
          {rewardClaims.map(claim => (
            <li key={claim.id} className="bg-gray-50 p-4 rounded-md shadow-sm">
              <div className="flex justify-between items-center">
                <time className="text-gray-600">{claim.claimedAt.toLocaleString()}</time>
                <div className="flex gap-4">
                  <Link
                    href={paths.rewardClaimShowPage(userId, rewardId, claim.id)}
                    className="text-blue-500 hover:text-blue-700 transition duration-300"
                    prefetch
                  >
                    View Notes
                  </Link>
                  <Link
                    href="#"
                    className="text-red-500 hover:text-blue-700 transition duration-300"
                  >Delete</Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No claims yet.</p>
      )}
    </div>
  );
}
