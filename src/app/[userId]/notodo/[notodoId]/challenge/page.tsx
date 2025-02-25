import ChallengeList from "@/components/challenge/challenge-list";
import AbsoluteLink from "@/components/common/absolute-link";
import { fetchChallenges } from "@/db/queries/challenges";
import { paths } from "@/paths";
import { Suspense } from "react";
import { FaArrowLeft } from "react-icons/fa";

interface ChallengeListPageProps {
  params: {
    notodoId: string;
    userId: string;
  };
}

export default async function ChallengeListPage({
  params: { notodoId, userId },
}: ChallengeListPageProps) {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 max-w-[70%] sm:max-w-none">Challenges</h1>
        <AbsoluteLink 
          href={paths.notodoShowPage(userId, notodoId)} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center flex-shrink-0"
        >
          <FaArrowLeft className="mr-2" /> Back to Notodo
        </AbsoluteLink>
      </div>
      <Suspense fallback={<div className="text-center py-4">Loading challenges...</div>}>
        <ChallengeList
          fetchChallenges={() => fetchChallenges(notodoId)}
          userId={userId}
          notodoId={notodoId}
        />
      </Suspense>
    </div>
  );
}
