import type { Challenge } from "@prisma/client";
import ChallengeListItem from "./challenge-list-item";

interface ChallengeListProps {
  fetchChallenges: () => Promise<Challenge[]>;
  notodoId: string;
  userId: string;
}

export default async function ChallengeList({ fetchChallenges, notodoId, userId }: ChallengeListProps) {
  const challenges = await fetchChallenges();

  return (
    <div className="flex flex-col gap-2">
      {challenges.map((challenge) => (
        <ChallengeListItem key={challenge.id} challenge={challenge} userId={userId} notodoId={notodoId} />
      ))}
    </div>
  )
}
