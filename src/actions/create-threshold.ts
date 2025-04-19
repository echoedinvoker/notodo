'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import { Threshold } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createThresholdSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string(),
  duration: z.number().min(1),
  weight: z.number().min(-10).max(10)
});

export interface CreateThresholdFormState {
  errors: {
    title?: string[];
    content?: string[];
    duration?: string[];
    weight?: string[];
    _form?: string[];
  };
  success?: boolean;
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

  let result: { title: string; content: string; duration: number, weight: number };
  try {
    result = createThresholdSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
      duration: Number(formData.get("duration")),
      weight: Number(formData.get("weight"))
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
        weight: result.weight,
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
  redirect(paths.thresholdListPage(userId, notodoId))
}
