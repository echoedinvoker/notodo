import ChallengeList from "@/components/challenge/challenge-list";
import ChallengeListActions from "@/components/challenge/challenge-list-actions";
import { fetchChallenges } from "@/db/queries/challenges";
import { paths } from "@/paths";
import Link from "next/link";

interface ChallengeListPageProps {
  params: {
    notodoId: string;
    userId: string;
  }
}

export default async function ChallengeListPage({ params: { notodoId, userId } }: ChallengeListPageProps) {
  const challenges = await fetchChallenges(notodoId);

  return <div>
    <Link href={paths.notodoShowPage(userId, notodoId)}>
      <h1 className="text-xl font-bold text-stone-700 mb-4">Challenge List</h1>
    </Link>
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <ChallengeList fetchChallenges={() => fetchChallenges(notodoId)} userId={userId} notodoId={notodoId} />
      </div>
      <ChallengeListActions notodoId={notodoId} challenges={challenges} />
    </div>
  </div>
}
