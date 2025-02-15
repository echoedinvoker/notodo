import React from 'react';
import { fetchAchievements } from '@/db/queries/achievements';
import { fetchRewardData, fetchRewards } from '@/db/queries/rewards';
import { fetchNotodos } from '@/db/queries/notodos';
import { getNotodosResult } from '@/helpers/utils';
import { fetchThresholdsWithIsAchieved } from '@/db/queries/thresholds';
import * as actions from "@/actions";
import NotificationCard from './notification-card';
import NotificationItem from './notification-item';

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
    .filter((achievement) => achievement.pointsPerHour ? totalWeight >= achievement.pointsPerHour : true);

  const notNotifiedRewardIds = rewards
    .filter((reward) => !reward.notified)
    .filter((reward) => reward.pointCost <= totalScore)
    .map((reward) => reward.id);

  const notNotifiedRewardsData = await Promise.all(
    notNotifiedRewardIds.map((rewardId) => fetchRewardData(rewardId, userId))
  );
  const consumableNotNotifiedRewards = notNotifiedRewardsData.filter((rewardData) => rewardData && rewardData.consumable);

  const notNotifiedThresholds = thresholds.filter((threshold) => !threshold.notified && threshold.isAchieved);

  return (
    <div className="space-y-6">
      <NotificationCard
        title="Achievements"
        items={notNotifiedAchievements}
        renderItem={(achievement) => (
          <NotificationItem
            key={achievement.id}
            title={achievement.name}
            subtitle="Achievement unlocked!"
            bgColor="bg-blue-50"
            borderColor="border border-blue-200"
            textColor="text-blue-800"
            dismissAction={actions.notifiedAchievement.bind(null, achievement.id)}
          />
        )}
        bgColor="bg-blue-50"
        borderColor="border-blue-200"
      />

      <NotificationCard
        title="Rewards"
        items={consumableNotNotifiedRewards}
        renderItem={(reward) => (
          <NotificationItem
            key={reward?.reward.id}
            title={reward?.reward.name}
            subtitle="Reward available!"
            bgColor="bg-green-50"
            borderColor="border border-green-200"
            textColor="text-green-800"
            dismissAction={actions.notifiedReward.bind(null, reward!.reward.id)}
          />
        )}
        bgColor="bg-green-50"
        borderColor="border-green-200"
      />

      <NotificationCard
        title="Thresholds"
        items={notNotifiedThresholds}
        renderItem={(threshold) => (
          <NotificationItem
            key={threshold.id}
            title={`${threshold.title} (${threshold.notodoTitle})`}
            subtitle="Threshold reached!"
            bgColor="bg-yellow-50"
            borderColor="border border-yellow-200"
            textColor="text-yellow-800"
            dismissAction={actions.notifiedThreshold.bind(null, threshold.id)}
          />
        )}
        bgColor="bg-yellow-50"
        borderColor="border-yellow-200"
      />
    </div>
  );
}
