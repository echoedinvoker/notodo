import type { ProcessedAchievement } from "@/db/queries/achievements";
import type { NotodoWithData } from "@/db/queries/notodos";
import { getNotodosResult } from "@/helpers/utils";
import { paths } from "@/paths";
import Link from "next/link";
import { redirect } from "next/navigation";

interface AchievementListProps {
  userId: string;
  fetchNotodos: () => Promise<NotodoWithData[]>;
  fetchAchievements: () => Promise<ProcessedAchievement[]>;
}

interface AchievementStatus extends ProcessedAchievement {
  isAchieved: boolean;
}

function processAchievements(
  achievements: ProcessedAchievement[],
  totalWeight: number,
): AchievementStatus[] {
  return achievements.map((achievement) => {
    const allThresholdsAchieved = achievement.thresholds.every(
      (threshold) => threshold.isAchieved,
    );
    const isAchieved =
      allThresholdsAchieved &&
      (achievement.pointsPerHour === null ||
        totalWeight > achievement.pointsPerHour);

    return {
      ...achievement,
      isAchieved,
    };
  });
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
      <div 
        className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" 
        style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
      ></div>
    </div>
  );
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
          <div key={achievement.id} className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{achievement.name}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${achievement.isAchieved ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                {achievement.isAchieved ? 'Achieved' : 'In Progress'}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{achievement.description}</p>
            
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Points Per Hour: 
                <span className="ml-2 text-blue-600">{achievement.pointsPerHour ?? 'N/A'}</span>
              </p>
              {achievement.pointsPerHour && (
                <ProgressBar progress={totalWeight / achievement.pointsPerHour} />
              )}
            </div>

            <h3 className="text-lg font-semibold text-gray-700 mb-2">Thresholds:</h3>
            <ul className="space-y-4">
              {achievement.thresholds.map(threshold => (
                <li key={threshold.id} className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span>{threshold.title}</span>
                    {threshold.challengeDuration === null ? (
                      <form>
                        <button 
                          type="submit"
                          className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-semibold hover:bg-blue-600 transition duration-300"
                        >
                          Start Challenge
                        </button>
                      </form>
                    ) : (
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${threshold.isAchieved ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                        {threshold.isAchieved ? 'Achieved' : 'In Progress'}
                      </span>
                    )}
                  </div>
                  {threshold.challengeDuration !== null && (
                    <ProgressBar progress={threshold.challengeDuration / threshold.duration} />
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex justify-end">
              <Link href="" className="text-blue-500 hover:text-blue-700 transition duration-300">
                Edit Achievement
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
