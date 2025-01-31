import { Achievement, Reward } from "@prisma/client";
import RewardDetailsHeader from "./reward-details-header";
import RewardDetailsDescription from "./reward-details-description";
import RewardDetailsAchievements from "./reward-details-achievements";

interface RewardDetailsProps {
  reward: Reward & { achievements: Achievement[] };
  userPoints: number;
  userId: string;
}

export default function RewardDetails({
  reward,
  userPoints,
  userId,
}: RewardDetailsProps) {
  return (
    <>
      <RewardDetailsHeader reward={reward} userPoints={userPoints} />
      <RewardDetailsDescription reward={reward} />
      <RewardDetailsAchievements reward={reward} userId={userId} />
    </>
  );
}
