import type { ProcessedAchievement } from "@/db/queries/achievements";
import type { NotodoWithData } from "@/db/queries/notodos";
import { getNotodosResult } from "@/helpers/utils";
import { paths } from "@/paths";
import { redirect } from "next/navigation";
import { processAchievements } from "@/helpers/processAchievements";
import AchievementCard from "./achievement-card";

interface AchievementListProps {
  userId: string;
  fetchNotodos: () => Promise<NotodoWithData[]>;
  fetchAchievements: () => Promise<ProcessedAchievement[]>;
}

export interface AchievementStatus extends ProcessedAchievement {
  isAchieved: boolean;
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {processedAchievements.map(achievement => (
          <AchievementCard key={achievement.id}
          userId={userId}
          achievement={achievement} totalWeight={totalWeight} />
        ))}
      </div>
    </div>
  );
}
