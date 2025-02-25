import { db } from "@/db";

export interface ChallengeNoteWithData {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  challengeId: string;
}

export async function fetchChallengeNotes(challengeId: string): Promise<ChallengeNoteWithData[]> {
  const notes = await db.challengeNote.findMany({
    where: {
      challengeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return notes;
}
