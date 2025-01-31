import { Reward } from "@prisma/client";
import PointCost from "./point-cost";

interface RewardDetailsProps {
  reward: Reward;
  userPoints: number;
}

export default function RewardDetails({ reward, userPoints }: RewardDetailsProps) {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{reward.name}</h1>
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <PointCost pointCost={reward.pointCost} userPoints={userPoints} />
        <p className="text-lg">
          Created At: <time className="font-semibold text-blue-600">{reward.createdAt.toLocaleString()}</time>
        </p>
      </div>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Description</h2>
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          <p className="text-gray-700">{reward.description || "No description available."}</p>
        </div>
      </section>
    </>
  )
}
