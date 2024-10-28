import { Challenge } from "@prisma/client";
import { db } from "..";
import { cache } from "react";

export const fetchChallenges = cache((notodoId: string): Promise<Challenge[]> => {
  return db.challenge.findMany({
    where: { notodoId },
    orderBy: { startTime: 'desc' }
  })
})
