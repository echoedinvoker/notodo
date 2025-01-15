'use server';

import { redirect } from "next/navigation";
import { db } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";

interface DeleteRewardClaimKeepFormState {
  errors: {
    _form?: string[];
  };
  success?: boolean;
}

export async function deleteRewardClaimKeep(userId: string, rewardId: string, rewardClaimId: string, consumedPoints: number, formState: DeleteRewardClaimKeepFormState): Promise<DeleteRewardClaimKeepFormState> {
  try {
    await Promise.all([
      db.user.update({
        where: { id: userId },
        data: { score: { decrement: consumedPoints } }
      }),
      db.rewardClaim.delete({ where: { id: rewardClaimId } })
    ]);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    }
    return { errors: { _form: ["An unknown error occurred"] } };
  }

  revalidatePath(paths.rewardClaimListPage(userId, rewardId));
  redirect(paths.rewardClaimListPage(userId, rewardId));
}
