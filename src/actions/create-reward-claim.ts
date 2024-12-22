'use server';

import { auth } from "@/auth";
import { db } from "@/db";

export async function createRewardClaim(rewardId: string) {
  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ["You must be logged in to consume a reward"] } }
  }

  const response = await db.rewardClaim.create({
    data: {
      rewardId,
      userId: session.user.id,
    },
  });

  console.log("response", response);
}
