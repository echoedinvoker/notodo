import Link from "next/link";
import { AchievementStatus } from "./achievement-list";
import { StatusBadge } from "../common/status-badge";
import { PointsPerHourDisplay } from "../common/poits-per-hour-display";
import { ThresholdsList } from "./threshold-list";
import { paths } from "@/paths";
import { notifiedAchievement } from "@/actions";

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
    <div className="bg-white shadow-lg rounded-lg p-6 relative">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold text-gray-800">{achievement.name}</h2>
        <div className="flex flex-col items-end space-y-2">
          {!achievement.notified && achievement.isAchieved && (
            <form action={notifiedAchievement.bind(null, achievement.id)}>
              <button 
                type="submit"
                className="bg-yellow-300 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-yellow-400 transition-colors duration-200"
              >
                New Achievement!
              </button>
            </form>
          )}
          <StatusBadge isAchieved={achievement.isAchieved} />
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>

      {achievement.pointsPerHour !== null && (
        <PointsPerHourDisplay
          pointsPerHour={achievement.pointsPerHour}
          totalWeight={totalWeight}
        />
      )}

      {achievement.thresholds.length > 0 && (
        <ThresholdsList thresholds={achievement.thresholds} />
      )}

      <div className="mt-4 text-right">
        <Link
          href={paths.editAchievementPage(userId, achievement.id)}
          className="text-sm text-blue-500 hover:text-blue-700 transition duration-300"
        >
          Edit Achievement
        </Link>
      </div>
    </div>
  );
}
