import type { AchievementStatus } from "@/components/achievement/achievement-list";
import type { ProcessedAchievement } from "@/db/queries/achievements";

export function processAchievements(
  achievements: ProcessedAchievement[],
  totalWeight: number,
): AchievementStatus[] {
  return achievements.map((achievement) => ({
    ...achievement,
    isAchieved: achievement.thresholds.every((threshold) => threshold.isAchieved) &&
      (achievement.pointsPerHour === null || totalWeight >= achievement.pointsPerHour)
  }));
}

// 新增函數：處理單個成就
export function processAchievement(
  achievement: ProcessedAchievement,
  totalWeight: number,
): AchievementStatus {
  return {
    ...achievement,
    isAchieved: achievement.thresholds.every((threshold) => threshold.isAchieved) &&
      (achievement.pointsPerHour === null || totalWeight >= achievement.pointsPerHour)
  };
}

// 新增函數：檢查所有成就是否都已完成
export function areAllAchievementsCompleted(
  achievements: ProcessedAchievement[],
  totalWeight: number,
): boolean {
  // 使用 processAchievement 函數處理每個成就，然後檢查是否所有成就都已完成
  return processAchievements(achievements, totalWeight).every(achievement => achievement.isAchieved);
}
