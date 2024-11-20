import { paths } from "@/paths";
import { Divider } from "@nextui-org/react";
import type { Challenge, Notodo, Threshold } from "@prisma/client";
import Link from "next/link";

interface ThresholdInfoProps {
  userId: string;
  notodo: Notodo & {
    thresholds: Threshold[],
    challenges: Challenge[]
  };
}

export default function ThresholdInfo({ userId, notodo }: ThresholdInfoProps) {
  const currentChallenge = notodo.challenges.find(challenge => !challenge.endTime)

  if (!currentChallenge) {
    return null
  }

  return (
    <Link className="flex-1" href={paths.thresholdListPage(userId, notodo.id)}>
      <div className="rounded-lg py-2 px-4 shadow hover:shadow-md transition duration-300 text-stone-600 bg-stone-50 mb-4">
        <h3 className="font-semibold text-sm mb-1">Thresholds</h3>
        <Divider className="my-1" />
        <dl className="text-sm italic">
          <dt className="font-semibold inline">Progress: </dt>
          <dd className="inline">[2/5]</dd>

          <dt className="font-semibold mt-1 block">Next threshold:</dt>
          <dd>30 minutes meditation (2 hours remaining)</dd>

          <dt className="font-semibold mt-1 inline">Hours elapsed: </dt>
          <dd className="inline">26</dd>
        </dl>
      </div>
    </Link>

  )
}
