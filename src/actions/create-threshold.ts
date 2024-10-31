'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import { Threshold } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createThresholdSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string(),
  duration: z.number().min(1),
  multiplier: z.number().min(0),
});

export interface CreateThresholdFormState {
  errors: {
    title?: string[];
    content?: string[];
    duration?: string[];
    multiplier?: string[];
    _form?: string[];
  }
}

export async function createThreshold({
  userId, notodoId
}: { userId: string, notodoId: string },
  formState: CreateThresholdFormState,
  formData: FormData): Promise<CreateThresholdFormState> {
  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ["You must be logged in to create a threshold"] } }
  }

  let result: { title: string; content: string; duration: number, multiplier: number };
  try {
    result = createThresholdSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
      duration: Number(formData.get("duration")),
      multiplier: Number(formData.get("multiplier")),
    });
  } catch (error) {
    console.log(error)
    return { errors: (error as z.ZodError).flatten().fieldErrors } as CreateThresholdFormState;
  }

  let threshold: Threshold;
  try {
    threshold = await db.threshold.create({
      data: {
        title: result.title,
        content: result.content,
        duration: result.duration,
        multiplier: result.multiplier,
        notodoId: notodoId,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    }
    return { errors: { _form: ["An unknown error occurred"] } };
  }

  revalidatePath(paths.homePage(userId))
  revalidatePath(paths.notodoShowPage(userId, notodoId))

  return { errors: {} }
}
