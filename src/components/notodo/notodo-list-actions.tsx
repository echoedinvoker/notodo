import { paths } from "@/paths";
import Link from "next/link";

interface NotodoListActionsProps {
  userId: string;
}

export default function NotodoListActions({ userId }: NotodoListActionsProps) {
  return (
    <div className="hidden sm:flex sm:flex-col sm:justified-start sm:items-start p-4 space-y-4">
      <Link
        href={paths.createNotodoPage(userId)}
        className="text-stone-500 rounded shadow py-2 w-full text-center uppercase font-bold bg-stone-50 hover:bg-stone-100 active:bg-stone-200"
        prefetch
      >
        create
      </Link>
      <Link
        href={paths.rewardListPage(userId)}
        className="text-stone-500 rounded shadow py-2 w-full text-center uppercase font-bold bg-stone-50 hover:bg-stone-100 active:bg-stone-200"
        prefetch
      >
        consume
      </Link>
    </div>
  )
}
