import type { Reward } from "@prisma/client";

interface RewardListItemProps {
  reward: Reward;
  totalScore: number;
}

export default function RewardListItem({ reward, totalScore }: RewardListItemProps) {
  const consumabled = totalScore >= reward.pointCost;

  return (
    <div className={`rounded-lg py-2 px-4 shadow transition duration-300 bg-stone-50 ${consumabled ? 'hover:shadow-md text-stone-700' : 'text-stone-500'}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold my-1">{reward.name}</h3>
        <h3 className="text-lg font-semibold italic">Cost: {reward.pointCost}</h3>
      </div>
    </div>
  );
}
