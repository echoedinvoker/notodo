'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import { Reward } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createRewardSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string(),
  pointCost: z.number().min(0),
  achievementIds: z.array(z.string()),
  notodoIds: z.array(z.string()),
});

interface RewardFormState {
  errors: {
    name?: string[];
    description?: string[];
    pointCost?: string[];
    _form?: string[];
  };
  success?: boolean;
}

type ValidatedRewardData = z.infer<typeof createRewardSchema>;

export async function createReward(formState: RewardFormState, formData: FormData): Promise<RewardFormState> {
  console.log(formData);
  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ["You must be logged in to create a reward"] } }
  }

  const validationResult = await validateRewardData(formData);
  if ('errors' in validationResult) {
    return validationResult;
  }

  const creationResult = await createRewardInDatabase(validationResult, session.user.id);
  if ('errors' in creationResult) {
    return creationResult;
  }

  revalidatePath(paths.rewardListPage(session.user.id));
  redirect(paths.rewardListPage(session.user.id));
}

async function validateRewardData(formData: FormData): Promise<ValidatedRewardData | RewardFormState> {
  try {
    return createRewardSchema.parse({
      name: formData.get("name"),
      description: formData.get("description"),
      pointCost: parseFloat(formData.get("pointCost") as string),
      achievementIds: formData.getAll("achievementIds") as string[],
      notodoIds: formData.getAll("notodoIds") as string[],
    });
  } catch (error) {
    return { errors: (error as z.ZodError).flatten().fieldErrors } as RewardFormState;
  }
}

async function createRewardInDatabase(data: ValidatedRewardData, userId: string): Promise<Reward | RewardFormState> {
  try {
    const { achievementIds, notodoIds, ...rewardData } = data;

    const reward = await db.reward.create({
      data: {
        ...rewardData,
        userId,
        achievements: {
          create: achievementIds.map(achievementId => ({
            achievement: {
              connect: { id: achievementId }
            }
          }))
        },
        notodos: {
          create: notodoIds.map(notodoId => ({
            notodo: {
              connect: { id: notodoId }
            }
          }))
        }
      },
      include: {
        achievements: {
          include: {
            achievement: true
          }
        },
        notodos: {
          include: {
            notodo: true
          }
        }
      }
    });

    return reward;
  } catch (error: unknown) {
    console.error('Error creating reward:', error);
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    }
    return { errors: { _form: ["An unknown error occurred"] } };
  }
}
