'use client';

import * as actions from "@/actions";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { FaTrash } from "react-icons/fa";

interface NoteDeleteButtonProps {
  noteId: string;
  userId: string;
  notodoId: string;
  challengeId: string;
}

export default function NoteDeleteButton({ 
  noteId, 
  userId, 
  notodoId, 
  challengeId 
}: NoteDeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this note?")) {
      setIsDeleting(true);
      setError(null);
      
      try {
        const result = await actions.deleteChallengeNote(noteId, userId, notodoId, challengeId);
        
        if (!result.success) {
          setError(result.error || "Failed to delete note");
        }
      } catch (err) {
        setError("An unexpected error occurred");
        console.error(err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div>
      <Button
        isIconOnly
        size="sm"
        variant="light"
        color="danger"
        onClick={handleDelete}
        isLoading={isDeleting}
        aria-label="Delete note"
      >
        <FaTrash size={16} />
      </Button>
      
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
