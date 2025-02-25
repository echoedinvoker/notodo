'use client';

import * as actions from "@/actions";
import { useFormState } from "react-dom";
import { FormButton } from "@/components/common";
import { Textarea } from "@nextui-org/react";

interface NoteCreateFormProps {
  userId: string;
  notodoId: string;
  challengeId: string;
}

// 定義 FormState 類型
interface FormState {
  errors: {
    content?: string[];
    _form?: string[];
    [key: string]: string[] | undefined;
  };
}

export default function NoteCreateForm({ userId, notodoId, challengeId }: NoteCreateFormProps) {
  const [formState, action] = useFormState<FormState, FormData>(
    (state: FormState, formData: FormData) => 
      actions.createChallengeNote(state, formData, { userId, notodoId, challengeId }),
    { errors: {} }
  );

  return (
    <form action={action} className="space-y-4">
      <Textarea
        name="content"
        label="Add a note"
        placeholder="Write your thoughts or progress here..."
        isInvalid={!!formState?.errors?.content}
        errorMessage={formState?.errors?.content?.join(", ")}
        className="w-full"
      />

      <div className="flex justify-end">
        <FormButton
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Add Note
        </FormButton>
      </div>
      
      {formState?.errors?._form && (
        <p className="text-red-500">{formState.errors._form.join(", ")}</p>
      )}
    </form>
  );
}
