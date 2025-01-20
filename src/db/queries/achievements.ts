import type { Achievement } from "@prisma/client";
import { cache } from "react";
import { db } from "..";

export const fetchAchievements = cache(async (userId: string): Promise<Achievement[]> => {
  return await db.achievement.findMany({
    where: { userId },
  })
})

