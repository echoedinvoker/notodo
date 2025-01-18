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

  const actions = [
    { href: paths.notodoShowPage(notodo.user.id, notodo.id), icon: FaPencil, tip: 'Edit Notodo' },
    { href: paths.challengeListPage(notodo.user.id, notodo.id), icon: FaFlag, tip: 'View Challenges' },
    { href: paths.thresholdListPage(notodo.user.id, notodo.id), icon: FaTachometerAlt, tip: 'View Thresholds' },
    isCurrentChallenging
      ? { href: paths.giveupChallengePage(notodo.user.id, notodo.id, notodo.challenges[0].id), icon: FaXmark, tip: 'Give up Challenge' }
      : { href: paths.deleteNotodoPage(notodo.user.id, notodo.id), icon: FaTrash, tip: 'Delete Notodo' },
  ]

  return (
    <div className="absolute top-0 right-0 h-full flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="flex flex-col justify-center space-y-2 pr-2 h-full">
        {actions.map(({ href, icon: Icon, tip }, index) => (
          <CircleFloatLink key={index} isLink={true} href={href} tip={tip}>
            <Icon className="text-gray-600" />
          </CircleFloatLink>
        ))}
      </div>
    </div>
  )
}
