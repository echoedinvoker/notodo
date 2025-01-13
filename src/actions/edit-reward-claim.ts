'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const editRewardClaimSchema = z.object({
  content: z.string().max(300, "Content must be 300 characters or less"),
});

interface EditRewardClaimFormState {
  errors: {
    content?: string[];
    _form?: string[];
  }
  success?: boolean;
}

export async function editRewardClaim(
  rewardClaimId: string,
  rewardId: string,
  formState: EditRewardClaimFormState,
  formData: FormData
): Promise<EditRewardClaimFormState> {
  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ["You must be logged in to edit a reward claim"] } }
  }

  let result: { content: string };
  try {
    result = editRewardClaimSchema.parse({
      content: formData.get("content"),
    })
  } catch (error) {
    return { errors: (error as z.ZodError).flatten().fieldErrors } as EditRewardClaimFormState;
  }

  try {
    await db.rewardClaim.update({
      where: { id: rewardClaimId },
      data: {
        content: result.content,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    }
    return { errors: { _form: ["An unknown error occurred"] } };
  }

  revalidatePath(paths.rewardClaimShowPage(session.user.id, rewardId, rewardClaimId));
  redirect(paths.rewardClaimShowPage(session.user.id, rewardId, rewardClaimId));
}
