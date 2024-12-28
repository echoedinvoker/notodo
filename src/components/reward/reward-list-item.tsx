import type { Reward } from "@prisma/client";
import { FaCoins } from "react-icons/fa";
import RewardListItemPressingBar from "./reward-list-item-pressing-bar";
import type { RewardClaimWithReward } from "@/db/queries/rewardClaims";
import type { NotodoWithData } from "@/db/queries/notodos";
import { getNotodosResult } from "@/helpers/utils";
import RewardListItemAction from "./reward-list-item-action";

interface RewardListItemProps {
  reward: Reward;
  fetchNotodos: () => Promise<NotodoWithData[]>;
  fetchRewardClaims: () => Promise<RewardClaimWithReward[]>;
}

export default async function RewardListItem({ reward, fetchNotodos, fetchRewardClaims }: RewardListItemProps) {
  const notodos = await fetchNotodos();
  const { totalScore } = getNotodosResult(notodos);
  const rewardClaims = await fetchRewardClaims();
  const totalConsumed = rewardClaims.reduce((acc, claim) => acc + claim.reward.pointCost, 0);
  const consumabled = totalScore >= (totalConsumed + reward.pointCost);

  return (
    <div className={`group peer relative z-0 rounded-lg py-2 px-4 transition duration-300 bg-stone-50 ${consumabled
      ? 'hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-stone-700 cursor-pointer'
      : 'shadow-inner text-stone-500 cursor-not-allowed'
      }`}
    >
      <RewardListItemPressingBar consumabled={consumabled} rewardId={reward.id} />
      <RewardContent reward={reward} />
      <RewardListItemAction name={reward.name} userId={reward.userId} rewardId={reward.id} />
    </div>
  );
}

function RewardContent({ reward }: { reward: Reward }) {
  return (
    <div className="select-none flex justify-between items-center">
      <h3 className="text-lg font-semibold my-1">{reward.name}</h3>
      <p className="text-sm text-stone-400">{reward.description}</p>
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
