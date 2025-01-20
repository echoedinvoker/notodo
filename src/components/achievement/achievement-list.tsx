import { paths } from "@/paths";
import type { Achievement } from "@prisma/client";
import { redirect } from "next/navigation";

interface AchievementListProps {
  userId: string;
  fetchAchievements: () => Promise<Achievement[]>;
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
