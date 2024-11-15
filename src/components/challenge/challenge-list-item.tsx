import { paths } from "@/paths";
import type { Challenge } from "@prisma/client";
import Link from "next/link";
import TimeDifference from "@/components/common/time-difference";

interface ChallengeListItemProps {
  challenge: Challenge;
  userId: string;
  notodoId: string;
}

export default function ChallengeListItem({ challenge, userId, notodoId }: ChallengeListItemProps) {
  const startTime = new Date(challenge.startTime);
  const endTime = challenge.endTime ? new Date(challenge.endTime) : undefined;

  return (
    <div className="rounded-lg py-2 px-4 shadow hover:shadow-md transition duration-300 text-stone-700 bg-stone-50">
      <Link href={paths.challengeShowPage(userId, notodoId, challenge.id)}>
        <h3 className="text-lg font-semibold my-1">
          <TimeDifference
            startTime={startTime}
            endTime={endTime}
            showSkeleton={true}
          />
        </h3>
      </Link>
    </div>
  );
}
