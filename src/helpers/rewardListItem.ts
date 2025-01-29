import { NotodoWithData } from "@/db/queries/notodos";
import { paths } from "@/paths";
import { FaFlag, FaGift, FaTachometerAlt, FaTrash } from "react-icons/fa";
import { FaPencil, FaXmark } from "react-icons/fa6";

const BASE_ACTIONS: RewardListItemAction[] = [
  { href: '', icon: FaPencil, tip: 'Edit Notodo' },
  { href: '', icon: FaFlag, tip: 'View Challenges' },
  { href: '', icon: FaTachometerAlt, tip: 'View Thresholds' },
];


export const getActions = (
  notodo: NotodoWithData,
  setShowRewards: React.Dispatch<React.SetStateAction<boolean>>
): RewardListItemAction[] => {
  const { user, id, challenges } = notodo;
  const isCurrentChallenging = challenges.some((challenge) => !challenge.endTime);
  const hasAssociatedRewards = notodo.rewards && notodo.rewards.length > 0;

  const actions = BASE_ACTIONS.map(action => ({
    ...action,
    href: action.icon === FaPencil ? paths.notodoShowPage(user.id, id) :
          action.icon === FaFlag ? paths.challengeListPage(user.id, id) :
          paths.thresholdListPage(user.id, id)
  }));

  if (isCurrentChallenging) {
    actions.push({ 
      href: paths.giveupChallengePage(user.id, id, challenges[0].id), 
      icon: FaXmark, 
      tip: 'Give up Challenge' 
    });
    if (hasAssociatedRewards) {
      actions.push({ 
        href: '#', 
        icon: FaGift, 
        tip: 'Consume Reward', 
        onClick: () => setShowRewards(prev => !prev) 
      });
    }
  } else {
    actions.push({ 
      href: paths.deleteNotodoPage(user.id, id), 
      icon: FaTrash, 
      tip: 'Delete Notodo' 
    });
  }

  return actions;
};
