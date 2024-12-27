'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import type { Reward } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const editRewardSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string(),
  pointCost: z.number().min(0),
});

export interface EditRewardFormState {
  errors: {
    name?: string[];
    description?: string[];
    pointCost?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function editReward(
  rewardId: string,
  formState: EditRewardFormState,
  formData: FormData
): Promise<EditRewardFormState> {

  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ["You must be logged in to edit a reward"] } }
  }

  let result: { name: string, description: string, pointCost: number };
  try {
    result = editRewardSchema.parse({
      name: formData.get("name"),
      description: formData.get("description"),
      pointCost: parseFloat(formData.get("pointCost") as string),
    });
  } catch (error) {
    return { errors: (error as z.ZodError).flatten().fieldErrors } as EditRewardFormState;
  }

  let reward: Reward;
  try {
    reward = await db.reward.update({
      where: { id: rewardId },
      data: {
        name: result.name,
        description: result.description,
        pointCost: result.pointCost,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    }
    return { errors: { _form: ["An unknown error occurred"] } };
  }

  revalidatePath(paths.homePage(session.user.id))
  revalidatePath(paths.rewardListPage(session.user.id))

  redirect(paths.rewardListPage(session.user.id));
}
