'use server';

import { auth } from "@/auth";
import { db } from "@/db";

interface createRewardClaimFormState {
  errors: {
    _form?: string[];
  };
  success?: boolean;
}

export async function createRewardClaim(rewardId: string, formState: createRewardClaimFormState): Promise<createRewardClaimFormState> {
  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ["You must be logged in to consume a reward"] } }
  }

  try {
    await db.rewardClaim.create({
      data: {
        rewardId,
        userId: session.user.id,
      },
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    }
    return { errors: { _form: ["An unknown error occurred"] } };
  }

  return { errors: {}, success: true };
}
