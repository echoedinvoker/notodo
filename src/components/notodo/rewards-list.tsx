import { NotodoReward, Reward } from "@prisma/client";
import CircleFloatLink from "../common/circle-float-link";
import { Dispatch, SetStateAction } from "react";

type RewardRelation = NotodoReward & { reward: Reward };

interface RewardsListProps {
  rewards: RewardRelation[];
  showRewards: boolean;
  giftButtonTop: number;
  setShowRewards: Dispatch<SetStateAction<boolean>>;
}

export default function RewardsList({ rewards, showRewards, giftButtonTop, setShowRewards }: RewardsListProps) {
  return (
  <div 
    className="absolute right-full flex items-center gap-2 pr-2 transition-all duration-300 ease-in-out"
    style={{
      top: `${giftButtonTop}px`,
      transform: `translateX(${showRewards ? '0' : '100%'})`,
      opacity: showRewards ? 1 : 0,
      pointerEvents: showRewards ? 'auto' : 'none',
    }}
  >
    {rewards.map((rewardRelation) => (
      <CircleFloatLink
        key={rewardRelation.id}
        isLink={false}
        onClick={() => {
          console.log(`Consuming reward: ${rewardRelation.reward.name}`);
          setShowRewards(false);
        }}
        tip={`Consume ${rewardRelation.reward.name}`}
      >
        <span className="text-xs font-bold">{rewardRelation.reward.pointCost}</span>
      </CircleFloatLink>
    ))}
  </div>
  )
}
