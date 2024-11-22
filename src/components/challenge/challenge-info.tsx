import { paths } from "@/paths";
import { Divider } from "@nextui-org/react";
import type { Challenge, Notodo, Threshold } from "@prisma/client";
import Link from "next/link";
import ChallengeListActionStart from "./challenge-list-action-start";

interface ChallengeInfoProps {
  userId: string;
  notodo: Notodo & {
    thresholds: Threshold[],
    challenges: Challenge[]
  };
  status: string;
  elapsedHours: number;
  currentThreshold: Threshold | null;
}

export default function ChallengeInfo({
  userId,
  notodo,
  status,
  elapsedHours,
  currentThreshold
}: ChallengeInfoProps) {

  const currentWeight = currentThreshold ? currentThreshold.weight : notodo.weight;

  // Find the most recent completed challenge
  const completedChallenges = notodo.challenges.filter(challenge => challenge.endTime);
  const mostRecentChallenge = completedChallenges.sort((a, b) =>
    new Date(b.endTime!).getTime() - new Date(a.endTime!).getTime()
  )[0];

  // Calculate the duration of the most recent challenge
  const lastChallengeDuration = mostRecentChallenge
    ? calculateHours(new Date(mostRecentChallenge.startTime), new Date(mostRecentChallenge.endTime!))
    : 0;

  // Find the challenge with the longest duration
  const bestChallenge = completedChallenges.reduce((best, current) => {
    const currentDuration = calculateHours(new Date(current.startTime), new Date(current.endTime!));
    const bestDuration = best ? calculateHours(new Date(best.startTime), new Date(best.endTime!)) : 0;
    return currentDuration > bestDuration ? current : best;
  }, null as Challenge | null);

  const bestChallengeDuration = bestChallenge
    ? calculateHours(new Date(bestChallenge.startTime), new Date(bestChallenge.endTime!))
    : 0;

  const weightEnabled = notodo.weight !== null;

  return (
    <Link className="flex-1" href={paths.challengeListPage(userId, notodo.id)}>
      <div className="rounded-lg py-2 px-4 shadow hover:shadow-md transition duration-300 text-stone-600 bg-stone-50 mb-4">
        <h3 className="font-semibold text-sm mb-1">Challenges</h3>
        <Divider className="my-1" />
        <dl className="text-sm italic">
          <dt className="font-semibold inline">Status: </dt>
          <dd className="inline">{status}</dd>

          {status === "Challenging" && (<>
            {weightEnabled && (
              <>
                <dt className="font-semibold mt-1 block">Points earned per hour:</dt>
                <dd>{currentWeight}</dd>
              </>
            )}

            <dt className="font-semibold mt-1 block">Hours elapsed in current challenge: </dt>
            <dd className="inline">{elapsedHours}</dd>
          </>)}

          {status !== "Challenging" && (<>
            <dt className="font-semibold mt-1 block">Last challenge duration:</dt>
            <dd>{lastChallengeDuration.toFixed(2)} hours</dd>

            <dt className="font-semibold mt-1 block">Best challenge duration:</dt>
            <dd>{bestChallengeDuration.toFixed(2)} hours</dd>
            <div className="mt-2">
              <ChallengeListActionStart
                notodoId={notodo.id}
                className="w-32 bg-blue-500 text-white p-2 rounded"
              />
            </div>
          </>)}
        </dl>
      </div>
    </Link>
  )
}

function calculateHours(startTime: Date, endTime: Date): number {
  const diff = endTime.getTime() - startTime.getTime();
  return Math.round((diff / (1000 * 60 * 60)) * 100) / 100; // Round to 2 decimal places
}
