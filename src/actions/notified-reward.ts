'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function notifiedReward(rewardId: string) {
  const session = await auth();
  if (!session || !session.user) {
    redirect('/')
  }

  try {
    await db.reward.update({
      where: {
        id: rewardId,
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
