import { NotodoWithData } from "@/db/queries/notodos";
import NotodoListItem from "./notodo-list-item";
import { paths } from "@/paths";
import Link from "next/link";

interface NotodoListProps {
  userId: string;
  fetchNotodos: () => Promise<NotodoWithData[]>;
}

export default async function NotodoList({ fetchNotodos, userId }: NotodoListProps) {
  const notodos = await fetchNotodos();

  if (notodos.length === 0) {
    return (
      <div className="flex items-center justify-center px-8 py-16 text-stone-400">
        <Link
          className="hover:drop-shadow-md active:text-stone-300 transition text-lg"
          href={paths.createNotodoPage(userId)}>
          No notodos found. Create one?
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {notodos.map((notodo) => (
        <NotodoListItem key={notodo.id} notodo={notodo} />
      ))}
    </div>
  )
}
