'use server';

import { db } from "@/db";
import { paths } from "@/paths";
import { redirect } from "next/navigation";

export async function deleteNotodoKeepPoint(notodoId: string, totalScore: number, userId: string) {
  // TODO: error handling or maybe useFormState to send error msg to frondend?
  const promise1 = db.user.update({
    where: { id: userId },
    data: {
      score: {
        increment: totalScore,
      },
    },
  });
  const promise2 = db.notodo.delete({
    where: { id: notodoId },
  });

  await Promise.all([promise1, promise2]);

  redirect(paths.notodoListPage(userId));
}
