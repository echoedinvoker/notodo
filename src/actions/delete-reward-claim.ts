'use server';

import { redirect } from "next/navigation";
import { db } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";

interface DeleteRewardClaimFormState {
  errors: {
    _form?: string[];
  };
  success?: boolean;
}

export async function deleteRewardClaim(userId: string, rewardId: string, rewardClaimId: string, formState: DeleteRewardClaimFormState): Promise<DeleteRewardClaimFormState> {
  try {
    await db.rewardClaim.delete({ where: { id: rewardClaimId } });
  } catch (error) {
    return { errors: { _form: [(error as Error).message] } };
  }

  revalidatePath(paths.rewardClaimListPage(userId, rewardId));
  redirect(paths.rewardClaimListPage(userId, rewardId));
}
