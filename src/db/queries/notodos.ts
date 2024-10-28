import type { Notodo, Threshold } from "@prisma/client";
import { db } from "..";
// import { auth } from "@/auth";

export type NotodoWithData = Notodo & {
  user: { name: string | null };
  thresholds: Threshold[];
}

export async function fetchNotodos(userId: string): Promise<NotodoWithData[]> {
  // const session = await auth();
  //
  // if (!session || !session.user) {
  //   return [];
  // }
  //
  // const userId = session.user.id;

  return db.notodo.findMany({
    where: { userId },
    include: {
      user: { select: { name: true } },
      thresholds: true
    }
  })
}
