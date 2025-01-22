import AchievementCreateForm from "@/components/achievement/achievement-create-form";
import { fetchThresholdsForSelect } from "@/db/queries/thresholds";

export default async function CreateAchievementPage() {
  const thresholds = await fetchThresholdsForSelect();
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg m-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Achievement</h1>
      <AchievementCreateForm thresholds={thresholds} />
    </div>
  );
}
