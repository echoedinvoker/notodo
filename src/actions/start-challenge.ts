'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface StartChallengeFormState {
  errors: {
    _form?: string[];
  }
}

export async function startChallenge(notodoId: string): Promise<StartChallengeFormState> {
  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ["You must be logged in to create a notodo"] } }
  }

  try {
    // 檢查 notodo 是否存在且屬於當前用戶
    const notodo = await db.notodo.findFirst({
      where: {
        id: notodoId,
        userId: session.user.id,
      },
    });

    if (!notodo) {
      return { errors: { _form: ["Notodo not found or you don't have permission"] } };
    }

    // 檢查是否有未結束的 challenge
    const activeChallenge = await db.challenge.findFirst({
      where: {
        notodoId: notodoId,
        endTime: null,
      },
    });

    if (activeChallenge) {
      return { errors: { _form: ["There is already an active challenge for this notodo"] } };
    }

    // 創建新的 challenge
    await db.challenge.create({
      data: {
        notodoId: notodoId,
      },
    });

    revalidatePath(paths.challengeListPage(session.user.id, notodoId));
    revalidatePath(paths.notodoListPage(session.user.id));
  } catch (error) {
    return { errors: { _form: ["An unexpected error occurred"] } };
  }

  redirect(paths.notodoListPage(session.user.id));
}
