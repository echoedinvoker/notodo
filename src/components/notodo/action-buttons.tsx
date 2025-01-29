import { FaGift } from "react-icons/fa";
import CircleFloatLink from "../common/circle-float-link";
import { RefObject } from "react";

interface ActionButtonsProps {
  actions: RewardListItemAction[];
  giftButtonRef: RefObject<HTMLDivElement>;
}

export default function ActionButtons({ actions, giftButtonRef }: ActionButtonsProps) {
  return (
  <>
    {actions.map(({ href, icon: Icon, tip, onClick }, index) => (
      <div key={index} ref={Icon === FaGift ? giftButtonRef : null}>
        <CircleFloatLink isLink={!onClick} href={href} tip={tip} onClick={onClick}>
          <Icon className="text-stone-600" />
        </CircleFloatLink>
      </div>
    ))}
  </>
  )
}
