'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const editNotodoSchema = z.object({
  title: z.string().min(2).max(100),
  content: z.string(),
  weight: z.number().min(0).max(10).nullable(),
});

interface EditNotodoFormState {
  errors: {
    title?: string[];
    content?: string[];
    weight?: string[];
    _form?: string[];
  }
}

export async function editNotodo(
  notodoId: string,
  formState: EditNotodoFormState,
  formData: FormData
): Promise<EditNotodoFormState> {

  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ["You must be logged in to edit a notodo"] } }
  }

  let result: { title: string; content: string, weight: number | null };
  try {
    const weightValue = formData.get("weight");
    result = editNotodoSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
      weight: weightValue ? parseFloat(weightValue as string) : null
    });
  } catch (error) {
    return { errors: (error as z.ZodError).flatten().fieldErrors } as EditNotodoFormState;
  }

  // Update the notodo
  try {
    await db.notodo.update({
      where: { id: notodoId },
      data: {
        title: result.title,
        content: result.content,
        weight: result.weight,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    }
    return { errors: { _form: ["An unknown error occurred"] } };
  }

  revalidatePath(paths.notodoShowPage(session.user.id, notodoId))
  revalidatePath(paths.notodoListPage(session.user.id))
  redirect(paths.notodoListPage(session.user.id))
}
