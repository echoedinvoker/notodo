import { db } from "@/db";
import Link from "next/link";
import NotodoShowActions from "@/components/notodo/notodo-show-actions";
import { paths } from "@/paths";
import ThresholdInfo from "@/components/threhold/threshold-info";
import ChallengeInfo from "@/components/challenge/challenge-info";
import NotodoInfo from "@/components/notodo/notodo-info";
import { calculateDurationHours } from "@/helpers/utils";
import { Threshold } from "@prisma/client";

interface NotodoShowPageProps {
  params: {
    notodoId: string;
    userId: string;
  };
}

export default async function NotodoShowPage({ params: { notodoId, userId } }: NotodoShowPageProps) {
  const notodo = await db.notodo.findFirst({
    where: { id: notodoId },
    include: {
      thresholds: true,
      challenges: true
    },
  });

  if (!notodo) {
    return <div>Notodo not found</div>
  }

  const currentChallenge = notodo.challenges.find(challenge => !challenge.endTime)
  const status = currentChallenge ? "Challenging" : "Idle"
  const elapsedHours = status === "Challenging" ? calculateDurationHours(new Date(currentChallenge!.startTime), new Date()) : 0;
  const sortedThresholds = notodo.weight !== null ? notodo.thresholds.sort((a, b) => a.duration - b.duration) : null;
  const currentThreshold = sortedThresholds ? findCurrentThreshold(sortedThresholds, elapsedHours) : null;

  return (
    <div>
      <Link href={paths.notodoListPage(userId)}>
        <h1 className="text-xl font-bold text-stone-700">{notodo.title}</h1>
      </Link>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <div className="flex flex-col gap-4 p-4">
            <NotodoInfo notodo={notodo} />
            <div className="flex flex-col md:flex-row md:gap-4">
              <ChallengeInfo
                userId={userId}
                notodo={notodo}
                status={status}
                elapsedHours={elapsedHours}
                currentThreshold={currentThreshold}
              />
              <ThresholdInfo
                userId={userId}
                notodo={notodo}
                elapsedHours={elapsedHours}
                currentThreshold={currentThreshold}
              />
            </div>
          </div>
        </div>
        <NotodoShowActions notodo={notodo} />
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const notodos = await db.notodo.findMany({ include: { user: { select: { id: true } } } });
  return notodos.map(notodo => ({
    notodoId: notodo.id.toString(),
    userId: notodo.user.id.toString()
  }));
}

function findCurrentThreshold(
  sortedThresholds: Threshold[],
  elapsedHours: number): Threshold | null {
  let currentThreshold: Threshold | null = null;
  for (const threshold of sortedThresholds) {
    if (elapsedHours < threshold.duration) {
      break;
    } else {
      currentThreshold = threshold;
    }
  }
  return currentThreshold
}
 
