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
      <div className="text-center py-12">
        <p className="text-xl text-gray-600 mb-4">You don't have any notodos yet.</p>
        <Link
          className="text-blue-500 hover:text-blue-700 transition duration-300 text-lg font-semibold"
          href={paths.createNotodoPage(userId)}>
          Create your first notodo
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {notodos.map((notodo) => (
        <NotodoListItem
          key={notodo.id}
          notodo={notodo}
        />
      ))}
    </div>
  )
}
