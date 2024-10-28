import { Challenge } from "@prisma/client";
import { db } from "..";
import { cache } from "react";

export const fetchChallenges = cache(async (notodoId: string): Promise<Challenge[]> => {
  const challenges = await db.challenge.findMany({
    where: { notodoId },
  })

  return challenges.sort((a, b) => {
    if (a.endTime === null && b.endTime !== null) return -1;
    if (b.endTime === null && a.endTime !== null) return 1;
    if (a.endTime === null && b.endTime === null) return 0;

    const aDuration = a.endTime!.getTime() - a.startTime.getTime();
    const bDuration = b.endTime!.getTime() - b.startTime.getTime();

    return bDuration - aDuration;
  });
})
