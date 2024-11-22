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
  elapsedHours: number;
  currentThreshold: Threshold | null;
}

export default function ThresholdInfo({ userId, notodo, elapsedHours, currentThreshold }: ThresholdInfoProps) {
  const currentChallenge = notodo.challenges.find(challenge => !challenge.endTime)
  const thresholdNumber = notodo.thresholds.length
  const currentThresholdIndex = currentThreshold
    ? notodo.thresholds.findIndex(threshold => threshold.id === currentThreshold.id)
    : null
  const orderNumOfCurrentThreshold = currentThreshold
    ? currentThresholdIndex! + 1
    : 0
  const elasedHoursInCurrentThreshold = currentThreshold
    ? elapsedHours - currentThreshold.duration
    : elapsedHours
  const nextThreshold = currentThreshold
    ? notodo.thresholds[currentThresholdIndex! + 1]
    : null
  const hoursRemainingInCurrentThreshold = nextThreshold
    ? nextThreshold.duration - elapsedHours
    : null

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
          <dd className="inline">[{orderNumOfCurrentThreshold}/{thresholdNumber}]</dd>

          {nextThreshold && (
            <>
              <dt className="font-semibold mt-1 block">Next threshold:</dt>
              <dd>{nextThreshold.title} ({hoursRemainingInCurrentThreshold} hours remaining)</dd>
            </>
          )}

          <dt className="font-semibold mt-1 block">Hours elapsed in current threshold: </dt>
          <dd className="inline">{elasedHoursInCurrentThreshold}</dd>
        </dl>
      </div>
    </Link>

  )
}
