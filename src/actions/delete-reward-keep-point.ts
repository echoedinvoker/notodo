'use server';

import { db } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface DeleteRewardKeepPointFormState {
  errors: {
    _form?: string[];
  };
  success?: boolean;
}

export async function deleteRewardKeepPoint(rewardId: string, consumedPoints: number, userId: string, formState: DeleteRewardKeepPointFormState): Promise<DeleteRewardKeepPointFormState> {
  try {
    // TODO: think if any way to recovery the process if not all promises are resolved
    await Promise.all([
      db.user.update({ where: { id: userId }, data: { score: { decrement: consumedPoints, } } }),
      db.reward.delete({ where: { id: rewardId } })
    ]);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    }
    return { errors: { _form: ["An unknown error occurred"] } };
  }

  revalidatePath(paths.homePage(userId))
  redirect(paths.rewardListPage(userId));
}
