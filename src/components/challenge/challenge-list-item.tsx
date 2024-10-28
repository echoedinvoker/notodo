'use client';

import { formatTimeDifference } from "@/helpers/utils";
import { paths } from "@/paths";
import type { Challenge } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ChallengeListItemProps {
  challenge: Challenge;
  userId: string;
  notodoId: string;
}

export default function ChallengeListItem({ challenge, userId, notodoId }: ChallengeListItemProps) {
  const [timeDifference, setTimeDifference] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const updateTimeDifference = () => {
      const startTime = new Date(challenge.startTime);
      const endTime = challenge.endTime ? new Date(challenge.endTime) : new Date();
      setTimeDifference(formatTimeDifference(startTime, endTime));
      setIsLoading(false);
    };

    updateTimeDifference();
    const intervalId = setInterval(updateTimeDifference, 1000);

    return () => clearInterval(intervalId);
  }, [challenge]);

  return (
    <div className="rounded-lg py-2 px-4 shadow hover:shadow-md transition duration-300 text-stone-700 bg-stone-100">
      <Link href={paths.challengeShowPage(userId, notodoId, challenge.id)}>
        {isLoading ? (
          <div className="h-9 bg-gray-200 rounded animate-pulse">
            <div className="h-full w-full bg-gray-300 rounded"></div>
          </div>
        ) : (
          <h3 className="text-lg font-semibold my-1">{timeDifference}</h3>
        )}
      </Link>
    </div>
  );
}
