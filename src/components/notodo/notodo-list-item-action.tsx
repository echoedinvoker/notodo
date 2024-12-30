import { FaFlag, FaTachometerAlt, FaTrash } from "react-icons/fa";
import { FaPencil, FaXmark } from "react-icons/fa6";
import { paths } from "@/paths";
import { NotodoWithData } from "@/db/queries/notodos";
import CircleFloatLink from "../common/circle-float-link";

interface NotodoListItemActionProps {
  notodo: NotodoWithData;
}


export default function NotodoListItemAction({ notodo }: NotodoListItemActionProps) {
  const isCurrentChallenging = notodo.challenges.some((challenge) => !challenge.endTime)

  const links = [
    { isLink: true, href: paths.editNotodoPage(notodo.user.id, notodo.id), icon: <FaPencil /> },
    { isLink: true, href: paths.challengeListPage(notodo.user.id, notodo.id), icon: <FaFlag /> },
    { isLink: true, href: paths.thresholdListPage(notodo.user.id, notodo.id), icon: <FaTachometerAlt /> },
    isCurrentChallenging
      ? { isLink: false, notodoId: notodo.id, actionType: 'giveup', icon: <FaXmark /> }
      : { isLink: true, href: paths.deleteNotodoPage(notodo.user.id, notodo.id), icon: <FaTrash /> },
  ]
  return (
    <div className="absolute inset-y-0 -right-2 w-8 flex flex-col justify-around items-center">
      {links.map(({ isLink, href, notodoId, actionType, icon }, index) => (
        <CircleFloatLink
          isLink={isLink}
          key={index}
          notodoId={notodoId}
          actionType={actionType}
          href={href}
        >{icon}</CircleFloatLink>
      ))}
    </div>
  )
}
