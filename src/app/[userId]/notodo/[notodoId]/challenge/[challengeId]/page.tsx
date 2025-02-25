import { fetchChallengeNotes } from "@/db/queries/challengeNotes";
import NoteCreateForm from "@/components/note/note-create-form";
import NoteList from "@/components/note/note-list";

interface ChallengeShowPageProps {
  params: {
    userId: string;
    notodoId: string;
    challengeId: string;
  }
}

export default async function ChallengeShowPage({ params: { userId, notodoId, challengeId } }: ChallengeShowPageProps) {
  // 獲取該 challenge 的所有 notes
  const notes = await fetchChallengeNotes(challengeId);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg m-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Challenge Notes</h1>
      
      {/* 添加 note 的表單 */}
      <div className="mb-8">
        <NoteCreateForm 
          userId={userId} 
          notodoId={notodoId} 
          challengeId={challengeId} 
        />
      </div>
      
      {/* 顯示所有 notes */}
      <NoteList 
        notes={notes} 
        userId={userId}
        notodoId={notodoId}
        challengeId={challengeId}
      />
    </div>
  )
}
