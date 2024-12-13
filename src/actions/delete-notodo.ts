'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteNotodo(notodoId: string) {
  const session = await auth();
  if (!session || !session.user) {
    redirect('/')
  }

  try {
    await db.notodo.delete({
      where: {
        id: notodoId,
      },
    });
  } catch (error: unknown) {
    redirect('/')
  }

  revalidatePath(paths.notodoListPage(session.user.id));
  redirect(paths.notodoListPage(session.user.id));

}
