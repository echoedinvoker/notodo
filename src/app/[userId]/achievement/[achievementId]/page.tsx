import { fetchAchievementDetails } from "@/db/queries/achievements"

interface AchievementShowPageProps {
  params: {
    achievementId: string
  }
}

export default async function AchievementShowPage({ params: { achievementId } }: AchievementShowPageProps) {
  const achievement = await fetchAchievementDetails(achievementId)

  return (
    <pre>{JSON.stringify(achievement, null, 2)}</pre>
  )
}

