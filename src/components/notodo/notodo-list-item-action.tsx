import { FaFlag, FaTachometerAlt, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { paths } from "@/paths";
import { NotodoWithData } from "@/db/queries/notodos";
import CircleFloatLink from "../common/circle-float-link";

interface NotodoListItemActionProps {
  notodo: NotodoWithData;
}


export default function NotodoListItemAction({ notodo }: NotodoListItemActionProps) {
  const links = [
    { href: paths.editNotodoPage(notodo.user.id, notodo.id), icon: <FaPencil /> },
    { href: paths.challengeListPage(notodo.user.id, notodo.id), icon: <FaFlag /> },
    { href: paths.thresholdListPage(notodo.user.id, notodo.id), icon: <FaTachometerAlt /> },
    { href: paths.deleteNotodoPage(notodo.user.id, notodo.id), icon: <FaTrash /> },
  ]
  return (
    <div className="absolute inset-y-0 -right-2 w-8 flex flex-col justify-around items-center">
      {links.map(({ href, icon }) => (
        <CircleFloatLink key={href} href={href}>{icon}</CircleFloatLink>
      ))}
    </div>
  )
}
