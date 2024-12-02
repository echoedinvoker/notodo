import { NotodoWithData } from "@/db/queries/notodos";
import NotodoListItem from "./notodo-list-item";

interface NotodoListProps {
  userId: string;
  fetchNotodos: () => Promise<NotodoWithData[]>;
}

export default async function NotodoList({ fetchNotodos, userId }: NotodoListProps) {
  const notodos = await fetchNotodos();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {notodos.map((notodo) => (
        <NotodoListItem key={notodo.id} notodo={notodo} />
      ))}
    </div>
  )
}
