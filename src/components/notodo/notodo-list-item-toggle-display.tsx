'use client';

import type { NotodoWithData } from "@/db/queries/notodos";
import * as actions from "@/actions";
import { useFormState } from "react-dom";

interface NotodoListItemToggleDisplayProps {
  notodo: NotodoWithData;
}

export default function NotodoListItemToggleDisplay({ notodo }: NotodoListItemToggleDisplayProps) {
  const [formState, action] = useFormState(actions.toggleNotodoDisplay.bind(null, { notodoId: notodo.id }), { errors: {} });

  return (
    <form action={action} className="ml-2">
      <button
        type="submit"
        className="w-6 h-3 rounded-full p-0 duration-200 ease-in-out focus:outline-none bg-stone-200"
        aria-pressed={notodo.displayTimeAsScore}
        aria-label={notodo.displayTimeAsScore ? "Disable weight" : "Enable weight"}
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className={`block w-3 h-3 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${notodo.displayTimeAsScore ? 'translate-x-3' : 'translate-x-0'}`}
        />
      </button>
    </form>
  )
}
