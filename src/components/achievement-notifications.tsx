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

  const notNotifiedAchievements = achievements
    .filter((achievement) => !achievement.notified)
    .filter((achievement) => achievement.thresholds.every((threshold) => threshold.isAchieved))
    .filter((achievement) => achievement.pointsPerHour ? totalWeight >= achievement.pointsPerHour : true)

  return (
    <div>
      {notNotifiedAchievements.map((achievement) => <div className="flex" key={achievement.id}>
        <h2>{achievement.name}</h2>
        <button>remove notification</button>
      </div>)}
    </div>
  );
}
