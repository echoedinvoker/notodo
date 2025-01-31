import { db } from "@/db";
import ProgressBar from "../common/progress-bar";
import { StatusBadge } from "../common/status-badge";
import { AchievementStatus } from "./achievement-list";

export async function ThresholdItem({ threshold }: { threshold: AchievementStatus["thresholds"][0] }) {
  const isChallengeStarted = threshold.challengeDuration !== null;
  const notodo = await db.notodo.findFirst({
    where: {
      id: threshold.notodoId,
    },
  });

  return (
    <li className="bg-gray-50 p-3 rounded-md">
      <div className="flex justify-between items-center mb-2">
        <span>{threshold.title}{notodo && <span
          className="text-gray-500 text-sm"
          >{` (${notodo.title})`}</span>}</span>
        
        {isChallengeStarted ? (
          <StatusBadge isAchieved={threshold.isAchieved} />
        ) : (
          <form>
            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-semibold hover:bg-blue-600 transition duration-300"
            >
              Start Challenge
            </button>
          </form>
        )}
      </div>
      {isChallengeStarted && threshold.challengeDuration !== null && (
        <ProgressBar progress={threshold.challengeDuration / threshold.duration} />
      )}
    </li>
  );
}
