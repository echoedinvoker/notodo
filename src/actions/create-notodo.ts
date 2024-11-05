'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import { Notodo } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createNotodoSchema = z.object({
  title: z.string().min(2).max(100),
  content: z.string(),
  weight: z.number().min(0).max(10).optional(),
});

interface CreateNotodoFormState {
  errors: {
    title?: string[];
    content?: string[];
    weight?: string[];
    _form?: string[];
  }
}

export async function createNotodo(userId: string, formState: CreateNotodoFormState, formData: FormData): Promise<CreateNotodoFormState> {
  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ["You must be logged in to create a notodo"] } }
  }

  let result: { title: string; content: string, weight?: number };
  try {
    const weightValue = formData.get("weight");
    result = createNotodoSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
      weight: weightValue ? parseFloat(weightValue as string) : undefined
    });
  } catch (error) {
    return { errors: (error as z.ZodError).flatten().fieldErrors } as CreateNotodoFormState;
  }

  let notodo: Notodo;
  try {
    notodo = await db.notodo.create({
      data: {
        title: result.title,
        content: result.content,
        weight: result.weight,
        userId: session.user.id,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    }
    return { errors: { _form: ["An unknown error occurred"] } };
  }

  revalidatePath(paths.homePage(userId))
  redirect(paths.notodoShowPage(userId, notodo.id))
}
