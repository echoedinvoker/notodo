import AchievementEditForm from "@/components/achievement/achievement-edit-form";
import { fetchThresholdsForSelect } from "@/db/queries/thresholds";
import { fetchRelatedThresholdsByAchievementId } from "@/db/queries/achievementsThresholds";
import { db } from "@/db";

export default async function EditAchievementPage({ params }: { params: { achievementId: string } }) {
  const thresholds = await fetchThresholdsForSelect();
  const achievement = await db.achievement.findUnique({
    where: {
      id: params.achievementId,
    },
  });
  const relatedThresholds = await fetchRelatedThresholdsByAchievementId(params.achievementId);

  if (!relatedThresholds || !achievement) {
    return <div>Achievement not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg m-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Achievement</h1>
      <AchievementEditForm
        thresholds={thresholds}
        achievement={achievement}
        relatedThresholds={relatedThresholds}
      />
    </div>
  );
}
