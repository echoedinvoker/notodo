import type { AchievementStatus } from "@/components/achievement/achievement-list";
import type { ProcessedAchievement } from "@/db/queries/achievements";

export function processAchievements(
  achievements: ProcessedAchievement[],
  totalWeight: number,
): AchievementStatus[] {
  return achievements.map((achievement) => ({
    ...achievement,
    isAchieved: achievement.thresholds.every((threshold) => threshold.isAchieved) &&
      (achievement.pointsPerHour === null || totalWeight > achievement.pointsPerHour)
  }));
}
