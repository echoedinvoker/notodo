'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createChallengeNoteSchema = z.object({
  content: z.string().min(1, "Note content is required").max(1000, "Note content is too long"),
});

interface ChallengeNoteFormState {
  errors: {
    content?: string[];
    _form?: string[];
  };
  success?: boolean;
}

interface ChallengeNoteParams {
  userId: string;
  notodoId: string;
  challengeId: string;
}

export async function createChallengeNote(
  formState: ChallengeNoteFormState, 
  formData: FormData,
  params: ChallengeNoteParams
): Promise<ChallengeNoteFormState> {
  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ["You must be logged in to add a note"] } };
  }

  // 確認用戶有權限添加筆記
  if (session.user.id !== params.userId) {
    return { errors: { _form: ["You don't have permission to add notes to this challenge"] } };
  }

  // 驗證表單數據
  let content;
  try {
    const result = createChallengeNoteSchema.parse({
      content: formData.get("content"),
    });
    content = result.content;
  } catch (error) {
    return { 
      errors: (error as z.ZodError).flatten().fieldErrors as ChallengeNoteFormState['errors']
    };
  }

  // 創建筆記
  try {
    await db.challengeNote.create({
      data: {
        content,
        challengeId: params.challengeId,
      },
    });

    // 重新驗證頁面路徑以更新數據
    revalidatePath(`/${params.userId}/notodo/${params.notodoId}/challenge/${params.challengeId}`);
    
    return { errors: {}, success: true };
  } catch (error) {
    console.error('Error creating challenge note:', error);
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    }
    return { errors: { _form: ["An unknown error occurred"] } };
  }
}
