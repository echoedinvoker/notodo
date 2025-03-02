'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";

interface DeleteAchievementFormState {
  errors: {
    _form?: string[];
  };
  success?: boolean;
}

export async function deleteAchievement(
  achievementId: string, 
  formState: DeleteAchievementFormState
): Promise<DeleteAchievementFormState> {
  const session = await auth();
  if (!session || !session.user) {
    return { 
      errors: { 
        _form: ["You must be logged in to delete an achievement"] 
      } 
    };
  }

  try {
    // 檢查成就是否存在並屬於當前用戶
    const achievement = await db.achievement.findUnique({
      where: { id: achievementId },
      select: { userId: true }
    });

    if (!achievement) {
      return { 
        errors: { 
          _form: ["Achievement not found"] 
        } 
      };
    }

    if (achievement.userId !== session.user.id) {
      return { 
        errors: { 
          _form: ["You do not have permission to delete this achievement"] 
        } 
      };
    }

    // 刪除成就
    await db.achievement.delete({
      where: { id: achievementId }
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    }
    return { errors: { _form: ["An unknown error occurred"] } };
  }

  revalidatePath(paths.achievementListPage(session.user.id));
  return { errors: {}, success: true };
}
