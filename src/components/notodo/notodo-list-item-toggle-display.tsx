'use client';

import type { NotodoWithData } from "@/db/queries/notodos";

interface NotodoListItemToggleDisplayProps {
  notodo: NotodoWithData;
}

export default function NotodoListItemToggleDisplay({ notodo }: NotodoListItemToggleDisplayProps) {
  return (
    <form className="ml-2">
      <button
        type="submit"
        className={`w-10 h-5 rounded-full p-0 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${notodo.displayTimeAsScore ? 'bg-indigo-600' : 'bg-gray-200'}`}
        aria-pressed={notodo.displayTimeAsScore}
        aria-label={notodo.displayTimeAsScore ? "Disable weight" : "Enable weight"}
      >
        <span
          className={`block w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${notodo.displayTimeAsScore ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </button>
    </form>
  )
}
