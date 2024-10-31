'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


interface DeleteThresholdFormState {
  errors: {
    _form?: string[];
  };
}

export async function deleteThreshold({
  notodoId, thresholdId
}: { notodoId: string; thresholdId: string; },
  formState: DeleteThresholdFormState,
  formData: FormData): Promise<DeleteThresholdFormState> {
  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ["You must be logged in to delete a notodo"] } }
  }

  try {
    await db.threshold.delete({
      where: {
        id: thresholdId,
      },
    });
    revalidatePath(paths.thresholdListPage(session.user.id, notodoId));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    }
    return { errors: { _form: ["An unknown error occurred"] } };
  }

  redirect(paths.notodoListPage(session.user.id));
}
