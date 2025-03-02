"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import type { Achievement } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const editAchievementSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().optional(),
  pointsPerHour: z.coerce.number().min(0),
  thresholds: z.array(z.string()),
});

export interface EditAchievementFormState {
  errors: {
    name?: string[];
    description?: string[];
    pointsPerHour?: string[];
    thresholds?: string[];
    _form?: string[];
  };
  success?: boolean;
}

type ValidatedAchievementData = z.infer<typeof editAchievementSchema>;

export async function editAchievement(
  achievementId: string,
  formState: EditAchievementFormState,
  formData: FormData,
): Promise<EditAchievementFormState> {
  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ["You must be logged in to edit an achievement"] } };
  }

  const validationResult = await validateAchievementData(formData);
  if ("errors" in validationResult) {
    return validationResult;
  }

  const updateResult = await updateAchievementInDatabase(achievementId, validationResult);
  if ("errors" in updateResult) {
    return updateResult;
  }

  revalidatePath(paths.homePage(session.user.id));
  revalidatePath(paths.achievementListPage(session.user.id));

  redirect(paths.achievementListPage(session.user.id));
}

async function validateAchievementData(
  formData: FormData,
): Promise<ValidatedAchievementData | EditAchievementFormState> {
  try {
    return editAchievementSchema.parse({
      name: formData.get("name"),
      description: formData.get("description"),
      pointsPerHour: formData.get("pointsPerHour"),
      thresholds: formData.getAll("thresholds"),
    });
  } catch (error) {
    return {
      errors: (error as z.ZodError).flatten().fieldErrors,
    } as EditAchievementFormState;
  }
}

async function updateAchievementInDatabase(
  achievementId: string,
  data: ValidatedAchievementData,
): Promise<Achievement | EditAchievementFormState> {
  try {
    const achievement = await db.achievement.update({
      where: { id: achievementId },
      data: {
        name: data.name,
        description: data.description,
        pointsPerHour: data.pointsPerHour,
      },
    });

    // Delete existing achievement-threshold relationships
    await db.achievementThreshold.deleteMany({
      where: { achievementId: achievement.id },
    });

    // Create new achievement-threshold relationships
    await Promise.all(
      data.thresholds.map((thresholdId) =>
        db.achievementThreshold.create({
          data: {
            achievementId: achievement.id,
            thresholdId,
          },
        }),
      ),
    );

    return achievement;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    }
    return { errors: { _form: ["An unknown error occurred"] } };
  }
}
