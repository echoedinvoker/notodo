'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import { Achievement, Notodo } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createAchievementSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string(),
  thresholds: z.array(z.string()),
  pointsPerHour: z.number().nullable()
});

interface CreateAchievementFormState {
  errors: {
    name?: string[];
    description?: string[];
    thresholds?: string[];
    pointsPerHour?: string[];
    _form?: string[];
  };
  success?: boolean;
}

type ValidateAchievementData = z.infer<typeof createAchievementSchema>;

export async function createAchievement(formState: CreateAchievementFormState, formData: FormData): Promise<CreateAchievementFormState> {
  console.log(formData)
  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ["You must be logged in to create a notodo"] } }
  }
  const validationResult = await validateAchievementData(formData);
  if ('errors' in validationResult) return validationResult;
  console.log(validationResult)

  const creationResult = await createAchievementInDatabase(validationResult, session.user.id);
  if ('errors' in creationResult) {
    return creationResult;
  }

  revalidatePath(paths.achievementListPage(session.user.id));
  redirect(paths.achievementListPage(session.user.id));
}

async function validateAchievementData(formData: FormData): Promise<ValidateAchievementData | CreateAchievementFormState> {
  try {
    return createAchievementSchema.parse({
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      thresholds: formData.getAll('thresholds') as string[],
      pointsPerHour: formData.get('pointsPerHour') as string
    });
  } catch (error) {
    return { errors: (error as z.ZodError).flatten().fieldErrors } as CreateAchievementFormState;
  }
}

async function createAchievementInDatabase(data: ValidateAchievementData, userId: string): Promise<Achievement | CreateAchievementFormState> {
  try {
    return await db.achievement.create({
      data: {
        name: data.name,
        description: data.description,
        pointsPerHour: data.pointsPerHour,
        userId,
        thresholds: {
          create: data.thresholds.map(thresholdId => ({
            threshold: {
              connect: { id: thresholdId }
            }
          }))
        }
      },
      include: {
        thresholds: true
      }
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    }
    return { errors: { _form: ["An unknown error occurred"] } };
  }
 }
