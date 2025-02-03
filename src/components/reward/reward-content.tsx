import type { Reward } from "@prisma/client";
import { FaCoins } from "react-icons/fa";

interface RewardContentProps {
  reward: Reward;
  currentPoints: number;
}

export default function RewardContent({ reward, currentPoints }: RewardContentProps) {
  const isAffordable = currentPoints >= reward.pointCost;

  return (
    <div className="select-none flex justify-between items-center gap-2">
      <h3 className="text-lg font-semibold my-1 whitespace-nowrap">{reward.name}</h3>
      <div>
        <p className={`flex items-center gap-2 text-lg font-semibold italic ${isAffordable ? 'text-green-600' : 'text-red-600'}`}>
          <FaCoins />
          {reward.pointCost}
        </p>
      </div>
    </div>
  );
}
