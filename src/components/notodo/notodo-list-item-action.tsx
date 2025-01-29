'use client';

import { FaGift } from "react-icons/fa";
import { NotodoWithData } from "@/db/queries/notodos";
import { getActions } from "@/helpers/rewardListItem";
import { useRewardDisplay } from "@/hooks/useRewardDisplay";
import ActionButtons from "./action-buttons";
import RewardsList from "./rewards-list";

interface NotodoListItemActionProps {
  notodo: NotodoWithData;
}

export default function NotodoListItemAction({ notodo }: NotodoListItemActionProps) {
  const hasAssociatedRewards = notodo.rewards && notodo.rewards.length > 0;
  const { showRewards, setShowRewards, giftButtonRef, giftButtonTop } = useRewardDisplay();
  const actions = getActions(notodo, setShowRewards);

  return (
    <div className="absolute inset-y-0 -right-5 h-full flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="flex flex-col justify-between gap-2 pr-2 h-full relative">
        <ActionButtons actions={actions} giftButtonRef={giftButtonRef} />
        {hasAssociatedRewards && (
          <RewardsList 
            rewards={notodo.rewards} 
            showRewards={showRewards} 
            giftButtonTop={giftButtonTop} 
            setShowRewards={setShowRewards}
          />
        )}
      </div>
    </div>
  )
}
