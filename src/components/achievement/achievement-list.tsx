import type { ProcessedAchievement } from "@/db/queries/achievements";
import type { NotodoWithData } from "@/db/queries/notodos";
import { getNotodosResult } from "@/helpers/utils";
import { paths } from "@/paths";
import { redirect } from "next/navigation";

interface AchievementListProps {
  userId: string;
  fetchNotodos: () => Promise<NotodoWithData[]>;
  fetchAchievements: () => Promise<ProcessedAchievement[]>;
}

interface AchievementStatus extends ProcessedAchievement {
  isAchieved: boolean;
}

function processAchievements(achievements: ProcessedAchievement[], totalWeight: number):
  AchievementStatus[] {
  return achievements.map(achievement => {
    const allThresholdsAchieved = achievement.thresholds.every(threshold => threshold.isAchieved);
    const isAchieved = allThresholdsAchieved && 
      (achievement.pointsPerHour === null || totalWeight > achievement.pointsPerHour);

    return {
      ...achievement,
      isAchieved
    };
  });
}
export default async function AchievementList({
  userId,
  fetchNotodos,
  fetchAchievements,
}: AchievementListProps) {
  const notodos = await fetchNotodos();
  const { totalWeight } = getNotodosResult(notodos);
  const achievements = await fetchAchievements();

  if (achievements.length === 0) redirect(paths.createAchievementPage(userId));

  const processedAchievements = processAchievements(achievements, totalWeight);

  return (
    <pre>{JSON.stringify(processedAchievements, null, 2)}</pre>
  );
}
