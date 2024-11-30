import { paths } from "@/paths";
import Link from "next/link";

interface NotodoListActionsProps {
  userId: string;
}

export default function NotodoListActions({ userId }: NotodoListActionsProps) {
  return (
    <div className="flex flex-col justified-start items-start p-4 space-y-4">
      <Link
        href={paths.createNotodoPage(userId)}
        className="text-stone-500 rounded shadow py-2 w-full text-center uppercase font-bold hover:bg-stone-50 active:bg-stone-100"
      >
        create
      </Link>
      <Link
        href={paths.rewardListPage(userId)}
        className="text-stone-500 rounded shadow py-2 w-full text-center uppercase font-bold hover:bg-stone-50 active:bg-stone-100"
      >
        consume
      </Link>
    </div>
  )
}
