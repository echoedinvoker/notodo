import { Threshold } from "@prisma/client";
import { db } from "..";
import { cache } from "react";

export const fetchThresholds = cache((notodoId: string): Promise<Threshold[]> => {
  return db.threshold.findMany({
    where: { notodoId }
  })
})
