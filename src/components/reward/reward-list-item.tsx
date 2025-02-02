import type { Reward } from "@prisma/client";
import RewardListItemPressingBar from "./reward-list-item-pressing-bar";
import type { RewardClaimWithReward } from "@/db/queries/rewardClaims";
import type { NotodoWithData } from "@/db/queries/notodos";
import { getNotodosResult } from "@/helpers/utils";
import RewardListItemAction from "./reward-list-item-action";
import RewardContent from "./reward-content";
import { fetchRelatedAchievementsByRewardId } from "@/db/queries/achievementsRewards";
import { areAllAchievementsCompleted } from "@/helpers/processAchievements";
import { fetchRelatedThresholdsByAchievementId } from "@/db/queries/achievementsThresholds";
import type { ProcessedAchievement, ProcessedThreshold } from "@/db/queries/achievements";
import AchievementStatus from "./achievement-status";

interface RewardListItemProps {
  reward: Reward;
  fetchNotodos: () => Promise<NotodoWithData[]>;
  fetchRewardClaims: () => Promise<RewardClaimWithReward[]>;
}

export default async function RewardListItem({ reward, fetchNotodos, fetchRewardClaims }: RewardListItemProps) {
  const notodos = await fetchNotodos();
  const { totalScore, totalWeight } = getNotodosResult(notodos);
  const rewardClaims = await fetchRewardClaims();
  const totalConsumed = rewardClaims.reduce((acc, claim) => acc + claim.reward.pointCost, 0);

  const relatedAchievements = await fetchRelatedAchievementsByRewardId(reward.id);
  
  const achievementsWithThresholds = await Promise.all(
    relatedAchievements.map(async (achievement) => {
      const thresholds = await fetchRelatedThresholdsByAchievementId(achievement.id);
      return {
        ...achievement,
        thresholds: thresholds.map(threshold => ({
          ...threshold,
          challengeDuration: 0,
          isAchieved: false
        })) as ProcessedThreshold[]
      } as ProcessedAchievement;
    })
  );

  const allAchievementsCompleted = areAllAchievementsCompleted(achievementsWithThresholds, totalWeight);

  const consumabled = totalScore >= (totalConsumed + reward.pointCost) && allAchievementsCompleted; 
  return (
    <div className={`group peer relative z-0 rounded-lg py-2 px-4 transition duration-300 bg-stone-50 ${consumabled
      ? 'hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-stone-700 cursor-pointer'
      : 'shadow-inner text-stone-500 cursor-not-allowed'
      }`}
    >
      <RewardListItemPressingBar consumabled={consumabled} rewardId={reward.id} />
      <RewardContent reward={reward} />
      <AchievementStatus achievements={achievementsWithThresholds} totalWeight={totalWeight} />
      <RewardListItemAction name={reward.name} userId={reward.userId} rewardId={reward.id} />
    </div>
  );
}

