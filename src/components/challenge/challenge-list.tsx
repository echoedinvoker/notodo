import { paths } from "@/paths";
import type { Challenge } from "@prisma/client";
import Link from "next/link";

interface ChallengeListProps {
  fetchChallenges: () => Promise<Challenge[]>;
  notodoId: string;
  userId: string;
}

export default async function ChallengeList({ fetchChallenges, notodoId, userId }: ChallengeListProps) {
  const challenges = await fetchChallenges();

  const renderedChallenges = challenges.map((challenge) => {
    return (
      <div key={challenge.id} className="border rounded py-2 px-4 border-gray-500">
        <Link href={paths.challengeShowPage(userId, notodoId, challenge.id)}>
          <h3 className="text-lg font-semibold my-1">{challenge.startTime.toString()}</h3>
        </Link>
      </div>
    )
  })

  return (
    <div className="flex flex-col gap-2">
      {renderedChallenges}
    </div>
  )
}
