'use server';

import { db } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface DeleteNotodoKeepPointFormState {
  errors: {
    _form?: string[];
  };
  success?: boolean;
}

export async function deleteNotodoKeepPoint(notodoId: string, totalScore: number, userId: string, formState: DeleteNotodoKeepPointFormState): Promise<DeleteNotodoKeepPointFormState> {
  try {
    // TODO: think if any way to recovery the process if not all promises are resolved
    await Promise.all([
      db.user.update({ where: { id: userId }, data: { score: { increment: totalScore, } } }),
      db.notodo.delete({ where: { id: notodoId } })
    ]);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    }
    return { errors: { _form: ["An unknown error occurred"] } };
  }

  revalidatePath(paths.homePage(userId))
  redirect(paths.notodoListPage(userId));
}
