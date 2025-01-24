import type { AchievementWithRelations } from "@/db/queries/achievements";
import { paths } from "@/paths";
import { redirect } from "next/navigation";

interface AchievementListProps {
  userId: string;
  fetchAchievements: () => Promise<AchievementWithRelations[]>;
}
export default async function AchievementList({ userId, fetchAchievements }: AchievementListProps) {
  const achievements = await fetchAchievements();

  if (achievements.length === 0) redirect(paths.createAchievementPage(userId));

  return (
    <div>
      {JSON.stringify(achievements)}
    </div>
  )
}
