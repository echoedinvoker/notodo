"use server";

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
  achievementIds: z.array(z.string()),
});

export interface EditRewardFormState {
  errors: {
    name?: string[];
    description?: string[];
    pointCost?: string[];
    achievementIds?: string[];
    _form?: string[];
  };
  success?: boolean;
}

type ValidatedRewardData = z.infer<typeof editRewardSchema>;

export async function editReward(
  rewardId: string,
  formState: EditRewardFormState,
  formData: FormData,
): Promise<EditRewardFormState> {
  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ["You must be logged in to edit a reward"] } };
  }

  const validationResult = await validateRewardData(formData);
  if ("errors" in validationResult) {
    return validationResult;
  }

  const updateResult = await updateRewardInDatabase(rewardId, validationResult);
  if ("errors" in updateResult) {
    return updateResult;
  }

  revalidatePath(paths.homePage(session.user.id));
  revalidatePath(paths.rewardListPage(session.user.id));

  redirect(paths.rewardListPage(session.user.id));
}

async function validateRewardData(
  formData: FormData,
): Promise<ValidatedRewardData | EditRewardFormState> {
  try {
    return editRewardSchema.parse({
      name: formData.get("name"),
      description: formData.get("description"),
      pointCost: parseFloat(formData.get("pointCost") as string),
      achievementIds: formData.getAll("achievementIds") as string[],
    });
  } catch (error) {
    return {
      errors: (error as z.ZodError).flatten().fieldErrors,
    } as EditRewardFormState;
  }
}

async function updateRewardInDatabase(
  rewardId: string,
  data: ValidatedRewardData,
): Promise<Reward | EditRewardFormState> {
  try {
    const reward = await db.reward.update({
      where: { id: rewardId },
      data: {
        name: data.name,
        description: data.description,
        pointCost: data.pointCost,
      },
    });

    // Delete existing achievement-reward relationships
    await db.achievementReward.deleteMany({
      where: { rewardId: reward.id },
    });

    // Create new achievement-reward relationships
    const result = await Promise.all(
      data.achievementIds.map((achievementId) =>
        db.achievementReward.create({
          data: {
            achievementId,
            rewardId: reward.id,
          },
        }),
      ),
    );
    console.log("result", result);

    return reward;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    }
    return { errors: { _form: ["An unknown error occurred"] } };
  }
}
