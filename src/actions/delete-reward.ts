'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteReward(rewardId: string) {
  const session = await auth();
  if (!session || !session.user) {
    redirect('/')
  }

  try {
    await db.reward.delete({
      where: {
        id: rewardId,
      },
    });
  } catch (error: unknown) {
    redirect('/')
  }

  revalidatePath(paths.rewardListPage(session.user.id));
  redirect(paths.rewardListPage(session.user.id));
}
