import type { Reward } from "@prisma/client";
import { FaCoins } from "react-icons/fa";

export default function RewardContent({ reward }: { reward: Reward }) {
  return (
    <div className="select-none flex justify-between items-center gap-2">
      <h3 className="text-lg font-semibold my-1 whitespace-nowrap">{reward.name}</h3>
      <div>
        <p className="flex items-center gap-2 text-lg font-semibold italic">
          <FaCoins />
          {reward.pointCost}
        </p>
        <div className="w-20"></div>
      </div>
    </div>
  );
}
