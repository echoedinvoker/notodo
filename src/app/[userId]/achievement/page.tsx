import AchievementList from "@/components/achievement/achievement-list";
import AbsoluteLink from "@/components/common/absolute-link";
import { fetchAchievements } from "@/db/queries/achievements";
import { fetchNotodos } from "@/db/queries/notodos";
import { paths } from "@/paths";
import { Suspense } from "react";
import { FaPlus } from "react-icons/fa";

interface AchievementListPageProps {
  params: {
    userId: string;
  };
}

export default async function AchievementListPage({
  params: { userId },
}: AchievementListPageProps) {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Achievements</h1>
        <AbsoluteLink href={paths.createAchievementPage(userId)}>
          <FaPlus /> Achievement
        </AbsoluteLink>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-4">
            <Suspense fallback={<div>Loading</div>}>
              <AchievementList
                userId={userId}
                fetchNotodos={() => fetchNotodos(userId)}
                fetchAchievements={() => fetchAchievements(userId)}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
