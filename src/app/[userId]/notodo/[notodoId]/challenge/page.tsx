import ChallengeList from "@/components/challenge/challenge-list";
import ChallengeListActions from "@/components/challenge/challenge-list-actions";
import { fetchChallenges } from "@/db/queries/challenges";

interface ChallengeListPageProps {
  params: {
    notodoId: string;
    userId: string;
  }
}

// TODO: need to rebuild challenge list page
export default async function ChallengeListPage({ params: { notodoId, userId } }: ChallengeListPageProps) {
  const challenges = await fetchChallenges(notodoId);

  return <div>
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <ChallengeList fetchChallenges={() => fetchChallenges(notodoId)} userId={userId} notodoId={notodoId} />
      </div>
      <ChallengeListActions notodoId={notodoId} challenges={challenges} />
    </div>
  </div>
}
