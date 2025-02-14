import React from 'react';
import { fetchAchievements } from '@/db/queries/achievements';
import { fetchRewardData, fetchRewards } from '@/db/queries/rewards';
import { fetchNotodos } from '@/db/queries/notodos';
import { getNotodosResult } from '@/helpers/utils';
import { fetchThresholdsWithIsAchieved } from '@/db/queries/thresholds';
import { FormButton } from './common';
import * as actions from "@/actions";

interface AchievementNotificationsProps {
  userId: string;
}

export default async function AchievementNotifications({ userId }: AchievementNotificationsProps) {
  const [achievements, rewards, notodos, thresholds] = await Promise.all([
    fetchAchievements(userId),
    fetchRewards(userId),
    fetchNotodos(userId),
    fetchThresholdsWithIsAchieved(userId)
  ]);

  const { totalScore, totalWeight } = getNotodosResult(notodos);

  const notNotifiedAchievements = achievements
    .filter((achievement) => !achievement.notified)
    .filter((achievement) => achievement.thresholds.every((threshold) => threshold.isAchieved))
    .filter((achievement) => achievement.pointsPerHour ? totalWeight >= achievement.pointsPerHour : true)

  const notNotifiedRewardIds = rewards
    .filter((reward) => !reward.notified)
    .filter((reward) => reward.pointCost <= totalScore)
    .map((reward) => reward.id)

  const notNotifiedRewardsData = await Promise.all(
    notNotifiedRewardIds.map((rewardId) => fetchRewardData(rewardId, userId))
  );
  const consumableNotNotifiedRewards = notNotifiedRewardsData.filter((rewardData) => rewardData && rewardData.consumable);

  const notNotifiedThresholds = thresholds.filter((threshold) => !threshold.notified && threshold.isAchieved);

  return (
    <div>
      {notNotifiedAchievements.map((achievement) => <div className="flex" key={achievement.id}>
        <h2>{achievement.name}</h2>
        <form action={actions.notifiedAchievement.bind(null, achievement.id)}>
          <FormButton>Remove notification</FormButton>
        </form>
      </div>)}
      {consumableNotNotifiedRewards.map((reward) => <div className="flex" key={reward?.reward.id}>
        <h2>{reward?.reward.name}</h2>
        <form action={actions.notifiedReward.bind(null, reward!.reward.id)}>
          <FormButton>Remove notification</FormButton>
        </form>
      </div>)}
      {notNotifiedThresholds.map((threshold) => <div className="flex" key={threshold.id}>
        <h2>{threshold.title}</h2>
        <form action={actions.notifiedThreshold.bind(null, threshold.id)}>
          <FormButton>Remove notification</FormButton>
        </form>
      </div>)}
    </div>
  );
}
