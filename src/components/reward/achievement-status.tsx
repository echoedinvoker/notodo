import { ProcessedAchievement } from "@/db/queries/achievements";
import { processAchievements } from "@/helpers/processAchievements";

interface AchievementStatusProps {
  achievements: ProcessedAchievement[];
  totalWeight: number;
}

export default function AchievementStatus({ achievements, totalWeight }: AchievementStatusProps) {
  const processedAchievements = processAchievements(achievements, totalWeight);

  return (
    <div className="mt-2">
      <h4 className="text-sm font-semibold mb-1">Related Achievements:</h4>
      <ul className="text-sm">
        {processedAchievements.map((achievement) => (
          <li key={achievement.id} className="flex items-center">
            <span className={`w-2 h-2 rounded-full mr-2 ${achievement.isAchieved ? 'bg-green-500' : 'bg-red-500'}`}></span>
            {achievement.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
