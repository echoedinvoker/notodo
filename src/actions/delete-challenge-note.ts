'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

interface DeleteNoteResult {
  success: boolean;
  error?: string;
}

export async function deleteChallengeNote(
  noteId: string,
  userId: string,
  notodoId: string,
  challengeId: string
): Promise<DeleteNoteResult> {
  const session = await auth();
  if (!session || !session.user) {
    return { success: false, error: "You must be logged in to delete a note" };
  }

  // 確認用戶有權限刪除筆記
  if (session.user.id !== userId) {
    return { success: false, error: "You don't have permission to delete this note" };
  }

  try {
    // 刪除筆記
    await db.challengeNote.delete({
      where: {
        id: noteId
      }
    });

    // 重新驗證頁面路徑以更新數據
    revalidatePath(`/${userId}/notodo/${notodoId}/challenge/${challengeId}`);
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting challenge note:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An unknown error occurred" 
    };
  }
}
