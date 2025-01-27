import { cache } from "react";
import { db } from "..";
import { Threshold } from "@prisma/client";

export const fetchRelatedThresholdsByAchievementId = cache(async (achievementId: string): Promise<Threshold[]> => {
  const results = await db.achievementThreshold.findMany({
    where: {
      achievementId
    },
    include: {
      threshold: true
    }
  })
  return results.map(result => result.threshold);
});
