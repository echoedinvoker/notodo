import React from 'react';
import { fetchAchievements, ProcessedAchievement, ProcessedThreshold } from '@/db/queries/achievements';
import { fetchRewards } from '@/db/queries/rewards';
import { fetchNotodos } from '@/db/queries/notodos';
import { getNotodosResult } from '@/helpers/utils';
import { db } from "@/db";

interface AchievementNotificationsProps {
  userId: string;
}

export default async function AchievementNotifications({ userId }: AchievementNotificationsProps) {
  const [achievements, rewards, notodos] = await Promise.all([
    fetchAchievements(userId),
    fetchRewards(userId),
    fetchNotodos(userId),
    db.user.findUnique({ where: { id: userId } })
  ]);

  const { totalScore, totalWeight } = getNotodosResult(notodos);

  const isThresholdAchieved = (threshold: ProcessedThreshold) => {
    return threshold.challengeDuration !== null && threshold.challengeDuration >= threshold.duration;
  };

  const isAchievementAchieved = (achievement: ProcessedAchievement) => {
    const allThresholdsAchieved = achievement.thresholds.every(isThresholdAchieved);
    if (!allThresholdsAchieved) return false;
    
    if (achievement.pointsPerHour !== null) {
      return totalWeight >= achievement.pointsPerHour;
    }
    
    return true;
  };

  const isRewardConsumable = (reward: any) => {
    const allAchievementsAchieved = achievements.every(isAchievementAchieved);
    return totalScore >= reward.pointCost && allAchievementsAchieved;
  };

  const unnotifiedAchievements = achievements.filter(a => isAchievementAchieved(a));
  const unnotifiedThresholds = achievements.flatMap(a => 
    a.thresholds.filter(t => isThresholdAchieved(t))
  );
  const unnotifiedRewards = rewards.filter(r => isRewardConsumable(r));

  return (
    <div>
      <h2>Notifications</h2>
      {unnotifiedAchievements.length > 0 && (
        <div>
          <h3>Achievements Unlocked:</h3>
          <ul>
            {unnotifiedAchievements.map(a => (
              <li key={a.id}>{a.name}</li>
            ))}
          </ul>
        </div>
      )}
      {unnotifiedThresholds.length > 0 && (
        <div>
          <h3>Thresholds Reached:</h3>
          <ul>
            {unnotifiedThresholds.map(t => (
              <li key={t.id}>{t.title}</li>
            ))}
          </ul>
        </div>
      )}
      {unnotifiedRewards.length > 0 && (
        <div>
          <h3>Rewards Available:</h3>
          <ul>
            {unnotifiedRewards.map(r => (
              <li key={r.id}>{r.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
