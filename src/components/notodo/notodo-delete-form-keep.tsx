'use client';

import { useFormState } from "react-dom";
import { FormButton } from "../common";
import * as actions from "@/actions"

interface NotodoDeleteFormKeepProps {
  notodoId: string;
  totalScore: number;
  userId: string;
}

export function NotodoDeleteFormKeep({ notodoId, totalScore, userId }: NotodoDeleteFormKeepProps) {
  const [formState, action] = useFormState(actions.deleteNotodoKeepPoint.bind(null, notodoId, totalScore, userId), { errors: {} });

  return (
    <form action={action} className="w-full text-center">
      <FormButton className="uppercase font-semibold min-w-[300px] hover:bg-red-500 hover:text-white">
        Delete and keep effect
      </FormButton>
      <p className="text-sm text-red-500 text-center w-full mt-1">
        {formState.errors._form?.join(", ")}
      </p>
    </form>
  )
}
