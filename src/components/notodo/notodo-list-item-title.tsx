import { NotodoWithData } from "@/db/queries/notodos";
import Link from "next/link";
import { paths } from "@/paths";

interface NotodoListItemTitleProps {
  notodo: NotodoWithData;
}

export default function NotodoListItemTitle({ notodo }: NotodoListItemTitleProps) {
  // TODO: need to style as a clickable button for better UX
  return (
    <Link
      className="hover:drop-shadow-md transition active:text-stone-500"
      href={paths.notodoShowPage(notodo.user.id, notodo.id)}>
      <h3 className="text-md font-semibold my-1 select-none">{notodo.title}</h3>
    </Link >
  );
}
