import type { Challenge, Notodo, Threshold } from "@prisma/client";
import { db } from "..";

export type NotodoWithData = Notodo & {
  user: { name: string | null };
  thresholds: Threshold[];
  challenges: Challenge[];
}

export async function fetchNotodos(userId: string): Promise<NotodoWithData[]> {
  const notodos = await db.notodo.findMany({
    where: { userId },
    include: {
      user: { select: { name: true } },
      thresholds: true,
      challenges: true
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
}

function getChallengeData(challenges: Challenge[]) {
  let hasStartTime = false;
  let hasEndTime = false;
  let earliestStartTime: Date | null = null;
  let latestEndTime: Date | null = null;

  for (const challenge of challenges) {
    if (challenge.startTime) {
      hasStartTime = true;
      if (!earliestStartTime || challenge.startTime < earliestStartTime) {
        earliestStartTime = challenge.startTime;
      }
    }
    if (challenge.endTime) {
      hasEndTime = true;
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
