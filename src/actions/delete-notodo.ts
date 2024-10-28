'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface DeleteNotodoFormState {
  errors: {
    _form?: string[];
  };
}

export async function deleteNotodo(notodoId: string, formState: DeleteNotodoFormState): Promise<DeleteNotodoFormState> {
  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ["You must be logged in to delete a notodo"] } }
  }

  try {
    await db.notodo.delete({
      where: {
        id: notodoId,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    }
    return { errors: { _form: ["An unknown error occurred"] } };
  }

  revalidatePath(paths.notodoListPage(session.user.id));
  redirect(paths.notodoListPage(session.user.id));

}
