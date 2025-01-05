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
    { isLink: true, href: paths.editNotodoPage(notodo.user.id, notodo.id), icon: <FaPencil />, tip: 'Edit notodo' },
    { isLink: true, href: paths.challengeListPage(notodo.user.id, notodo.id), icon: <FaFlag />, tip: 'Go to Challenge list page' },
    { isLink: true, href: paths.thresholdListPage(notodo.user.id, notodo.id), icon: <FaTachometerAlt />, tip: 'Go to Threshold list page' },
    isCurrentChallenging
      // TODO: shouln't be only single step to give up challenge, consider to refactor challenge system and link to current challenge page to give up
      // ? { isLink: false, notodoId: notodo.id, actionType: 'giveup', icon: <FaXmark />, tip: 'Give up current challenge' }
      ? {
        isLink: true,
        href: paths.giveupChallengePage(notodo.user.id, notodo.id, notodo.challenges[0].id),
        icon: <FaXmark />,
        tip: 'Give up current challenge'
      }
      : { isLink: true, href: paths.deleteNotodoPage(notodo.user.id, notodo.id), icon: <FaTrash />, tip: 'Delete notodo' },
  ]

  return (
    <div className="absolute inset-y-0 -right-2 w-8 flex flex-col justify-around items-center">
      {links.map(({ isLink, href, icon, tip }, index) => (
        <CircleFloatLink
          isLink={isLink}
          key={index}
          href={href}
          tip={tip}
        >{icon}</CircleFloatLink>
      ))}
    </div>
  )
}
