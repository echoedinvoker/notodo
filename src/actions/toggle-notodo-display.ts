'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";

interface ToggleNotodoDisplayFormState {
  errors: {
    _form?: string[];
  }
}

export async function toggleNotodoDisplay({ notodoId }: { notodoId: string }): Promise<ToggleNotodoDisplayFormState> {
  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ["You must be logged in to edit a notodo"] } }
  }

  try {

    const notodo = await db.notodo.findFirst({
      where: { id: notodoId, userId: session.user.id },
    });

    if (!notodo) {
      return { errors: { _form: ["Notodo not found"] } };
    }

    await db.notodo.update({
      where: { id: notodoId },
      data: { displayTimeAsScore: !notodo.displayTimeAsScore },
    });

    revalidatePath(paths.notodoListPage(session.user.id))
    return { errors: {} };

  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    }
    return { errors: { _form: ["An unknown error occurred"] } };
  }
}
