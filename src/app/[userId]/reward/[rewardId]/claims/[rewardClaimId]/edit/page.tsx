import { fetchRewardClaimByRewardClaimId } from "@/db/queries/rewardClaims";
import { paths } from "@/paths";
import Link from "next/link";

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

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Notes</h2>
        <form>
          <textarea
            defaultValue={rewardClaim.content}
            className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your notes here..."
          />
        </form>
      </section>

      <div className="flex justify-between items-center">
        <Link
          href={paths.rewardClaimShowPage(userId, rewardId, rewardClaimId)}
          className="text-blue-500 hover:text-blue-700 transition duration-300"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
