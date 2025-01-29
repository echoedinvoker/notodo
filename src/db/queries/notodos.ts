import type { Challenge, Notodo, Reward, Threshold, User } from "@prisma/client";
import { db } from "..";
import { cache } from "react";

export type NotodoWithData = Notodo & {
  user: User;
  thresholds: Threshold[];
  challenges: Challenge[];
  rewards: {
    id: string;
    notodoId: string;
    createdAt: Date;
    rewardId: string;
    reward: {
      id: string;
      name: string;
      description: string | null;
      pointCost: number;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
    };
  }[];
}

export const fetchNotodos = cache(async (userId: string): Promise<NotodoWithData[]> => {
  const notodos = await db.notodo.findMany({
    where: { userId },
    include: {
      user: true,
      thresholds: true,
      challenges: true,
      rewards: {
        include: {
          reward: true
        }
      }
    },
  })

  return notodos.sort((a, b) => {
    const aData = getChallengeData(a.challenges);
    const bData = getChallengeData(b.challenges);

    // 如果兩個 notodo 的類型不同，按類型排序
    if (aData.type !== bData.type) {
      return aData.type - bData.type;
    }

    // 如果類型相同，根據具體情況排序
    switch (aData.type) {
      case 0: // 只有 startTime
        return (aData.startTime?.getTime() ?? 0) - (bData.startTime?.getTime() ?? 0);
      case 1: // 沒有 startTime 和 endTime
        return 0; // 保持原有順序
      case 2: // 有 startTime 和 endTime
        return (bData.endTime?.getTime() ?? 0) - (aData.endTime?.getTime() ?? 0); // endTime 新的排前面
      default:
        return 0;
    }
  });
})

function getChallengeData(challenges: Challenge[]) {
  let hasStartTime = false;
  let hasEndTime = true;  // 初始設為 true
  let earliestStartTime: Date | null = null;
  let latestEndTime: Date | null = null;
  let hasProcessedAnyChallenge = false;

  for (const challenge of challenges) {
    hasProcessedAnyChallenge = true;

    if (challenge.startTime) {
      hasStartTime = true;
      if (!earliestStartTime || challenge.startTime < earliestStartTime) {
        earliestStartTime = challenge.startTime;
      }
    }

    if (challenge.endTime === null) {
      hasEndTime = false;
      latestEndTime = null;
      break;  // 可以提前結束循環，因為已經確定 hasEndTime 為 false
    } else if (challenge.endTime) {
      if (!latestEndTime || challenge.endTime > latestEndTime) {
        latestEndTime = challenge.endTime;
      }
    }
  }

  let type: number;
  if (hasStartTime && hasEndTime) {
    type = 2;
  } else if (hasStartTime) {
    type = 0;
  } else {
    type = 1;
  }

  return { type, startTime: earliestStartTime, endTime: latestEndTime };
}

export const fetchNotodo = cache(async (notodoId: string): Promise<NotodoWithData | null> => {
  const notodo = await db.notodo.findUnique({
    where: { id: notodoId },
    include: {
      user: true,
      thresholds: true,
      challenges: true,
      rewards: {
        include: {
          reward: true
        }
      }
    },
  });
  return notodo;
})
