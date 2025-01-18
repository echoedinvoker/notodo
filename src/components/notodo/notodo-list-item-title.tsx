import { NotodoWithData } from "@/db/queries/notodos";

interface NotodoListItemTitleProps {
  notodo: NotodoWithData;
}

export default function NotodoListItemTitle({ notodo }: NotodoListItemTitleProps) {
  return (
    <h3 className="text-xl font-semibold text-gray-800 mb-2">
      {notodo.title}
    </h3>
  );
}
