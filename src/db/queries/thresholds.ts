import { Threshold } from "@prisma/client";
import { db } from "..";

export function fetchThresholds(notodoId: string): Promise<Threshold[]> {
  return db.threshold.findMany({
    where: { notodoId }
  })
}
