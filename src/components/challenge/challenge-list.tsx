import type { Challenge } from "@prisma/client";
import ChallengeCard from "./challenge-card";

interface ChallengeListProps {
  fetchChallenges: () => Promise<Challenge[]>;
  notodoId: string;
  userId: string;
}

export default async function ChallengeList({ 
  fetchChallenges, 
  notodoId, 
  userId 
}: ChallengeListProps) {
  const challenges = await fetchChallenges();

  if (challenges.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">No challenges found for this Notodo.</p>
        <p className="text-sm text-gray-500">
          You can create a new challenge from the Notodo details page.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map((challenge) => (
          <ChallengeCard 
            key={challenge.id} 
            challenge={challenge} 
            userId={userId} 
            notodoId={notodoId} 
          />
        ))}
      </div>
    </div>
  );
}
