import Link from "next/link";

interface DeleteRewardClaimPageProps {
  params: {
    userId: string;
    rewardId: string;
    rewardClaimId: string;
  }
}

export default function DeleteRewardClaimPage({ params: { userId, rewardId, rewardClaimId } }: DeleteRewardClaimPageProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg m-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Delete Reward Claim</h1>

      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <p className="text-lg">
          Points consumed: <span className="font-semibold text-blue-600">500 points</span>
        </p>
      </div>

      <div className="space-y-4">
        <form>
          <button className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Delete and remove effect
          </button>
        </form>
        <form>
          <button className="w-full bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Delete and keep effect
          </button>
        </form>
      </div>

      <div className="mt-6">
        <Link
          href={`/[userId]/reward/[rewardId]/claims/[rewardClaimId]`}
          as={`/${userId}/reward/${rewardId}/claims/${rewardClaimId}`}
          className="text-blue-500 hover:text-blue-700 transition duration-300"
        >
          Cancel
        </Link>
      </div>
    </div>
  )
}
