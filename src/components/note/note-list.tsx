import type { ChallengeNoteWithData } from "@/db/queries/challengeNotes";
import { formatDistanceToNow } from "date-fns";
import NoteDeleteButton from "./note-delete-button";

interface NoteListProps {
  notes: ChallengeNoteWithData[];
  userId: string;
  notodoId: string;
  challengeId: string;
}

export default function NoteList({ notes, userId, notodoId, challengeId }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No notes yet. Add your first note above!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Previous Notes</h2>
      
      {notes.map((note) => (
        <div 
          key={note.id} 
          className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <p className="text-gray-800 whitespace-pre-wrap">{note.content}</p>
            <NoteDeleteButton 
              noteId={note.id}
              userId={userId}
              notodoId={notodoId}
              challengeId={challengeId}
            />
          </div>
          <div className="mt-2 text-sm text-gray-500">
            {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
          </div>
        </div>
      ))}
    </div>
  );
}
