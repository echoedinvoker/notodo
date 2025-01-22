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
