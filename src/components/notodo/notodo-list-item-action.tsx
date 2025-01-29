'use client';

import { FaFlag, FaGift, FaTachometerAlt, FaTrash } from "react-icons/fa";
import { FaPencil, FaXmark } from "react-icons/fa6";
import { paths } from "@/paths";
import { NotodoWithData } from "@/db/queries/notodos";
import CircleFloatLink from "../common/circle-float-link";
import { useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";

interface NotodoListItemActionProps {
  notodo: NotodoWithData;
}

type Action = {
  href: string;
  icon: IconType;
  tip: string;
  onClick?: () => void;
};

export default function NotodoListItemAction({ notodo }: NotodoListItemActionProps) {
  const [showRewards, setShowRewards] = useState(false);
  const giftButtonRef = useRef<HTMLDivElement>(null);
  const [giftButtonTop, setGiftButtonTop] = useState(0);
  const isCurrentChallenging = notodo.challenges.some((challenge) => !challenge.endTime)
  const hasAssociatedRewards = notodo.rewards && notodo.rewards.length > 0

  const actions: Action[] = [
    { href: paths.notodoShowPage(notodo.user.id, notodo.id), icon: FaPencil, tip: 'Edit Notodo' },
    { href: paths.challengeListPage(notodo.user.id, notodo.id), icon: FaFlag, tip: 'View Challenges' },
    { href: paths.thresholdListPage(notodo.user.id, notodo.id), icon: FaTachometerAlt, tip: 'View Thresholds' },
  ]

  if (isCurrentChallenging && hasAssociatedRewards) {
    actions.push(
      { href: '#', icon: FaGift, tip: 'Consume Reward', onClick: () => setShowRewards(!showRewards) },
      { href: paths.giveupChallengePage(notodo.user.id, notodo.id, notodo.challenges[0].id), icon: FaXmark, tip: 'Give up Challenge' }
    )
  } else if (isCurrentChallenging) {
    actions.push({ href: paths.giveupChallengePage(notodo.user.id, notodo.id, notodo.challenges[0].id), icon: FaXmark, tip: 'Give up Challenge' })
  } else {
    actions.push({ href: paths.deleteNotodoPage(notodo.user.id, notodo.id), icon: FaTrash, tip: 'Delete Notodo' })
  }

  useEffect(() => {
    if (giftButtonRef.current) {
      setGiftButtonTop(giftButtonRef.current.offsetTop);
    }
  }, []);

  return (
    <div className="absolute inset-y-0 -right-5 h-full flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="flex flex-col justify-between gap-2 pr-2 h-full relative">
        {actions.map(({ href, icon: Icon, tip, onClick }, index) => (
          <div key={index} ref={Icon === FaGift ? giftButtonRef : null}>
            <CircleFloatLink isLink={!onClick} href={href} tip={tip} onClick={onClick}>
              <Icon className="text-stone-600" />
            </CircleFloatLink>
          </div>
        ))}
        {hasAssociatedRewards && (
          <div 
            className="absolute right-full flex items-center gap-2 pr-2 transition-all duration-300 ease-in-out"
            style={{
              top: `${giftButtonTop}px`,
              transform: `translateX(${showRewards ? '0' : '100%'})`,
              opacity: showRewards ? 1 : 0,
              pointerEvents: showRewards ? 'auto' : 'none',
            }}
          >
            {notodo.rewards.map((rewardRelation) => (
              <CircleFloatLink
                key={rewardRelation.id}
                isLink={false}
                onClick={() => {
                  console.log(`Consuming reward: ${rewardRelation.reward.name}`);
                  setShowRewards(false);
                }}
                tip={`Consume ${rewardRelation.reward.name}`}
              >
                <span className="text-xs font-bold">{rewardRelation.reward.pointCost}</span>
              </CircleFloatLink>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
