import { NotodoWithData } from "@/db/queries/notodos";
import NotodoListItem from "./notodo-list-item";

interface NotodoListProps {
  notodos: NotodoWithData[];
  userId: string;
}

export default async function NotodoList({ notodos, userId }: NotodoListProps) {

  return (
    <div className="flex flex-col gap-2">
      {notodos.map((notodo) => (
        <NotodoListItem key={notodo.id} notodo={notodo} userId={userId} />
      ))}
    </div>
  )
}
