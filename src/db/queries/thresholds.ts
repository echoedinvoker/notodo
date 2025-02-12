import { Threshold } from "@prisma/client";
import { db } from "..";
import { cache } from "react";

export interface ThresholdsForSelect {
  id: string;
  title: string;
  notodoTitle: string;
}

export const fetchThresholds = cache((notodoId: string): Promise<Threshold[]> => {
  return db.threshold.findMany({
    where: { notodoId },
    orderBy: { weight: 'desc' }
  })
})

export const fetchThresholdsForSelect = cache(async (): Promise<ThresholdsForSelect[]> => {
  return db.threshold.findMany({
    select: {
      id: true,
      title: true,
      notodo: {
        select: {
          title: true
        }
      }
    },
    orderBy: {
      notodo: {
        title: 'asc'
      }
    }
  }).then(thresholds =>
    thresholds.map(threshold => ({
      id: threshold.id,
      title: threshold.title,
      notodoTitle: threshold.notodo.title
    }))
  );
})

export const fetchThresholdsWithIsAchieved = cache(async (userId: string): Promise<(Threshold & { isAchieved: boolean })[]> => {
  const notodos = await db.notodo.findMany({
    where: { userId },
    include: {
      thresholds: true,
      challenges: true
    }
  })
  const thresholds: (Threshold & { isAchieved: boolean })[] = []
  notodos.forEach(notodo => {
    const runningChallenges = notodo.challenges.find(challenge => challenge.endTime === null)
    if (!runningChallenges) return
    const durationHours = (new Date().getTime() - runningChallenges.startTime.getTime()) / 1000 / 60 / 60
    notodo.thresholds.forEach(threshold => {
      const isAchieved = threshold.weight <= durationHours
      thresholds.push({ ...threshold, isAchieved })
    })
  })
  return thresholds
})
