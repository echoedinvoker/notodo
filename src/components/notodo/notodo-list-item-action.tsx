import { FaFlag, FaTachometerAlt, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import Link from "next/link";
import { paths } from "@/paths";
import { NotodoWithData } from "@/db/queries/notodos";

interface NotodoListItemActionProps {
  notodo: NotodoWithData;
}

export default function NotodoListItemAction({ notodo }: NotodoListItemActionProps) {
  return (
    <div className="absolute inset-y-0 -right-2 w-8 flex flex-col justify-around items-center">
      <Link
        href={paths.editNotodoPage(notodo.user.id, notodo.id)}
        className="scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 duration-250 rounded-full drop-shadow-lg bg-stone-50 hover:bg-stone-100 active:bg-stone-200 w-8 h-8 flex justify-center items-center"
        prefetch
      >
        <FaPencil />
      </Link>
      <Link
        href={paths.challengeListPage(notodo.user.id, notodo.id)}
        className="scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 duration-250 rounded-full drop-shadow-lg bg-stone-50 hover:bg-stone-100 active:bg-stone-200 w-8 h-8 flex justify-center items-center"
        prefetch
      >
        <FaFlag />
      </Link>
      <Link
        href={paths.thresholdListPage(notodo.user.id, notodo.id)}
        className="scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 duration-250 rounded-full drop-shadow-lg bg-stone-50 hover:bg-stone-100 active:bg-stone-200 w-8 h-8 flex justify-center items-center"
        prefetch
      >
        <FaTachometerAlt />
      </Link>
      <Link
        href={paths.deleteNotodoPage(notodo.user.id, notodo.id)}
        className="scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 duration-250 rounded-full drop-shadow-lg bg-stone-50 hover:bg-stone-100 active:bg-stone-200 w-8 h-8 flex justify-center items-center"
        prefetch
      >
        <FaTrash />
      </Link>
    </div>
  )
}
