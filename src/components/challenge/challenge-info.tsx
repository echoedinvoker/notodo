import { paths } from "@/paths";
import { Divider } from "@nextui-org/react";
import type { Challenge, Notodo, Threshold } from "@prisma/client";
import Link from "next/link";

interface ChallengeInfoProps {
  userId: string;
  notodo: Notodo & {
    thresholds: Threshold[],
    challenges: Challenge[]
  };
}

export default function ChallengeInfo({ userId, notodo }: ChallengeInfoProps) {
  const currentChallenge = notodo.challenges.find(challenge => !challenge.endTime)
  const status = currentChallenge ? "Challenging" : "Idle"
  console.log({ currentChallenge })

  return (
    <Link className="flex-1" href={paths.challengeListPage(userId, notodo.id)}>
      <div className="rounded-lg py-2 px-4 shadow hover:shadow-md transition duration-300 text-stone-600 bg-stone-50 mb-4">
        <h3 className="font-semibold text-sm mb-1">Challenges</h3>
        <Divider className="my-1" />
        <dl className="text-sm italic">
          <dt className="font-semibold inline">Status: </dt>
          <dd className="inline">{status}</dd>

          {status === "Challenging" && (<>
            <dt className="font-semibold mt-1 block">Points earned per hour:</dt>
            <dd>1.5</dd>

            <dt className="font-semibold mt-1 inline">Hours elapsed: </dt>
            <dd className="inline">62</dd>
          </>)}
        </dl>
      </div>
    </Link>
  )
}
