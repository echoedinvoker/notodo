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
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 max-w-[70%] sm:max-w-none">Your Achievements</h1>
        <AbsoluteLink 
          href={paths.createAchievementPage(userId)} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center flex-shrink-0"
        >
          <FaPlus className="mr-2" /> New Achievement
        </AbsoluteLink>
      </div>
      <Suspense fallback={<div className="text-center py-4">Loading achievements...</div>}>
        <AchievementList
          userId={userId}
          fetchNotodos={() => fetchNotodos(userId)}
          fetchAchievements={() => fetchAchievements(userId)}
        />
      </Suspense>
    </div>
  );
}
