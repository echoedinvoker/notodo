import { Achievement, Reward } from "@prisma/client";
import PointCost from "./point-cost";

interface RewardDetailsHeaderProps {
  reward: Reward & { achievements: Achievement[] };
  userPoints: number;
}

export default function RewardDetailsHeader({ reward, userPoints }: RewardDetailsHeaderProps) {
  return (
      <header>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{reward.name}</h1>
        <div className="bg-gray-100 p-4 rounded-md mb-6">
          <PointCost pointCost={reward.pointCost} userPoints={userPoints} />
          <p className="text-lg">
            Created At:{" "}
            <time className="font-semibold text-blue-600">
              {reward.createdAt.toLocaleString()}
            </time>
          </p>
        </div>
      </header>
  )
}
