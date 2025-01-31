import { Achievement, Reward } from "@prisma/client";
import Link from "next/link";
import { paths } from "@/paths";

interface RewardDetailsAchievementsProps {
  reward: Reward & { achievements: Achievement[] };
  userId: string;
}

export default function RewardDetailsAchievements({ reward, userId }: RewardDetailsAchievementsProps) {
  return (
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Related Achievements
        </h2>
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          {reward.achievements.length > 0 ? (
            <ul className="list-disc list-inside">
              {reward.achievements.map((achievement) => (
                <li key={achievement.id} className="mb-2">
                  <Link
                    href={paths.achievementListPage(userId)}
                    className="text-blue-600 hover:underline"
                  >
                    {achievement.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No related achievements.</p>
          )}
        </div>
      </section>
  )
}
