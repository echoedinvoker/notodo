import { NotodoWithData } from "@/db/queries/notodos";
import NotodoListItem from "./notodo-list-item";

interface NotodoListProps {
  fetchNotodos: () => Promise<NotodoWithData[]>;
  userId: string;
}

export default async function NotodoList({ fetchNotodos, userId }: NotodoListProps) {
  const notodos = await fetchNotodos();

  return (
    <div className="flex flex-col gap-2">
      {notodos.map((notodo) => (
        <NotodoListItem key={notodo.id} notodo={notodo} userId={userId} />
      ))}
    </div>
  )
}
