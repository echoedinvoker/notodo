import { NotodoReward, Reward } from "@prisma/client";
import RewardsListItem from "./rewards-list-item";

type RewardRelation = NotodoReward & { reward: Reward };

interface RewardsListProps {
  rewards: RewardRelation[];
  showRewards: boolean;
  giftButtonTop: number;
}

export default function RewardsList({ rewards, showRewards, giftButtonTop }: RewardsListProps) {
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
        <RewardsListItem
          key={rewardRelation.id}
          reward={rewardRelation.reward}
        />
      ))}
    </div>
  );
}
