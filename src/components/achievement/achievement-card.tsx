import Link from "next/link";
import { AchievementStatus } from "./achievement-list";
import { StatusBadge } from "../common/status-badge";
import { PointsPerHourDisplay } from "../common/poits-per-hour-display";
import { ThresholdsList } from "./threshold-list";
import { paths } from "@/paths";

export default function AchievementCard({
  userId,
  achievement,
  totalWeight,
}: {
  userId: string;
  achievement: AchievementStatus;
  totalWeight: number;
}) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{achievement.name}</h2>
        <StatusBadge isAchieved={achievement.isAchieved} />
      </div>

      <p className="text-gray-600 mb-4">{achievement.description}</p>

      {achievement.pointsPerHour !== null && (
        <PointsPerHourDisplay
          pointsPerHour={achievement.pointsPerHour}
          totalWeight={totalWeight}
        />
      )}

      {achievement.thresholds.length > 0 && (
        <ThresholdsList thresholds={achievement.thresholds} />
      )}

      {/* 編輯按鈕 */}
      <div className="mt-4 flex justify-end">
        <Link
          href={paths.editAchievementPage(userId, achievement.id)}
          className="text-blue-500 hover:text-blue-700 transition duration-300"
        >
          Edit Achievement
        </Link>
      </div>
    </div>
  );
}
