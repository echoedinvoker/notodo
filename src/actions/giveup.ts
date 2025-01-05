'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function giveup(notodoId: string) {
  const session = await auth();
  if (!session || !session.user) {
    return
  }

  try {
    // 檢查 notodo 是否存在且屬於當前用戶
    const notodo = await db.notodo.findFirst({
      where: {
        id: notodoId,
        userId: session.user.id,
      },
      include: {
        challenges: {
          where: {
            endTime: null
          }
        }
      }
    });

    if (!notodo) {
      return
    }

    // 檢查是否有活躍的 challenge
    if (notodo.challenges.length === 0) {
      return
    }

    // 更新 challenge，設置 endTime 為當前時間
    const activeChallenge = notodo.challenges[0];
    await db.challenge.update({
      where: {
        id: activeChallenge.id
      },
      data: {
        endTime: new Date()
      }
    });

    revalidatePath(paths.challengeListPage(session.user.id, notodoId));
    revalidatePath(paths.notodoListPage(session.user.id));
  } catch (error) {
    return
  }

  redirect(paths.notodoListPage(session.user.id));
}

