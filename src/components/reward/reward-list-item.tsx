import { paths } from "@/paths";
import type { Reward } from "@prisma/client";
import Link from "next/link";

interface RewardListItemProps {
  userId: string;
  reward: Reward;
  totalScore: number;
}

export default function RewardListItem({ userId, reward, totalScore }: RewardListItemProps) {
  const consumabled = totalScore >= reward.pointCost;

  return (
    <div className={`rounded-lg py-2 px-4 shadow transition duration-300 bg-stone-50 ${consumabled ? 'hover:shadow-md text-stone-700' : 'text-stone-500'}`}>
      <Link href={paths.rewardShowPage(userId, reward.id)}>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold my-1">{reward.name}</h3>
          <h3 className="text-lg font-semibold italic">Cost: {reward.pointCost}</h3>
        </div>
      </Link>
    </div>
  );
}
