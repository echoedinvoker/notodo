import ChallengeList from "@/components/challenge/challenge-list";
import ChallengeListActions from "@/components/challenge/challenge-list-actions";
import { fetchChallenges } from "@/db/queries/challenges";

interface ChallengeListPageProps {
  params: {
    notodoId: string;
    userId: string;
  }
}

export default async function ChallengeListPage({ params: { notodoId, userId } }: ChallengeListPageProps) {
  const challenges = await fetchChallenges(notodoId);

  return <div className="flex flex-col gap-4 p-4">
    <h1 className="text-xl font-bold">Challenge List</h1>
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <ChallengeList fetchChallenges={() => fetchChallenges(notodoId)} userId={userId} notodoId={notodoId} />
      </div>
      <div className="border rounded p-4 border-gray-500">
        <ChallengeListActions notodoId={notodoId} challenges={challenges} />
      </div>
    </div>
  </div>
}
