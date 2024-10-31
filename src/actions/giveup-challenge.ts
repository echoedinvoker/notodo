'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface GiveupChallengeFormState {
  errors: {
    _form?: string[];
  }
}

export async function giveupChallenge(notodoId: string): Promise<GiveupChallengeFormState> {
  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ["You must be logged in to give up a challenge"] } };
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
      return { errors: { _form: ["Notodo not found or you don't have permission"] } };
    }

    // 檢查是否有活躍的 challenge
    if (notodo.challenges.length === 0) {
      return { errors: { _form: ["There is no active challenge for this notodo"] } };
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
    return { errors: { _form: ["An unexpected error occurred"] } };
  }

  redirect(paths.notodoListPage(session.user.id));
}

