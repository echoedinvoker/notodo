import { paths } from "@/paths";
import { FaHistory, FaPen } from "react-icons/fa";
import RewardActionLink from "./reward-action-link";
import { FaTrashCan } from "react-icons/fa6";

interface RewardListItemActionProps {
  name: string;
  userId: string;
  rewardId: string;
  [x: string]: any;
}

export default function RewardListItemAction({ name, userId, rewardId, ...props }: RewardListItemActionProps) {

  const links = [
    { href: paths.rewardEditPage(userId, rewardId), children: <FaPen /> },
    { href: paths.rewardDeletePage(userId, rewardId), children: <FaTrashCan /> },
    { href: paths.rewardClaimListPage(userId, rewardId), children: <FaHistory /> },
  ]

  return (
    <>
      <div className="absolute peer hidden group-hover:flex inset-y-0 -right-4 w-8 flex-col justify-around items-center" {...props}>
        <input type="checkbox" className="peer hidden" id={name} />
        <label
          htmlFor={name}
          className="bg-stone-300 peer-checked:bg-stone-50 rounded-full z-40 before:content-[':'] peer-checked:before:content-['✕'] before:text-lg before:w-8 before:h-8 before:rounded-full before:flex before:items-center before:justify-center hover:before:bg-stone-200 before:duration-200"
        ></label>
      </div>
      <div className="opacity-0 peer-has-[:checked]:opacity-100 duration-200 flex items-center justify-center gap-4 absolute inset-0 bg-stone-300 rounded-lg">
        {links.map((link, index) => <RewardActionLink href={link.href} key={index}>{link.children}</RewardActionLink>)}
      </div>
    </>
  )
}
