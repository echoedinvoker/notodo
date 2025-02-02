import type { AchievementStatus } from "@/components/achievement/achievement-list";
import type { ProcessedAchievement } from "@/db/queries/achievements";

export function processAchievements(
  achievements: ProcessedAchievement[],
  totalWeight: number,
): AchievementStatus[] {
  return achievements.map((achievement) => processAchievement(achievement, totalWeight));
}

export function processAchievement(
  achievement: ProcessedAchievement,
  totalWeight: number,
): AchievementStatus {
  return {
    ...achievement,
    isAchieved: areAllThresholdsAchieved(achievement.thresholds) &&
      (achievement.pointsPerHour === null || totalWeight >= achievement.pointsPerHour)
  };
}

export function areAllThresholdsAchieved(thresholds: ProcessedAchievement['thresholds']) {
  return thresholds.every(threshold => threshold.isAchieved);
}

export function areAllAchievementsCompleted(
  achievements: ProcessedAchievement[],
  totalWeight: number,
): boolean {
  return achievements.every(achievement => processAchievement(achievement, totalWeight).isAchieved);
}
