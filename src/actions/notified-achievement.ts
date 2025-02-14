'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function notifiedAchievement(achievementId: string) {
  const session = await auth();
  if (!session || !session.user) {
    redirect('/')
  }

  try {
    await db.achievement.update({
      where: {
        id: achievementId,
      },
      data: {
        notified: true,
      },
    });
  } catch (error: unknown) {
    redirect('/')
  }

  revalidatePath(paths.homePage(session.user.id));
}
