import ConsumeRewardButton from "@/components/reward/consume-reward-button";
import { fetchRewardData } from "@/db/queries/rewards";
import RewardDetails from "@/components/reward/reward-details";
import RewardActionButtons from "@/components/reward/reward-action-buttons";
import { fetchNotodos } from "@/db/queries/notodos";
import { fetchRewardClaims } from "@/db/queries/rewardClaims";
import { getNotodosResult } from "@/helpers/utils";
import { db } from "@/db";

interface RewardShowPageProps {
  params: {
    userId: string;
    rewardId: string;
  };
}

export default async function RewardShowPage({
  params: { userId, rewardId },
}: RewardShowPageProps) {
  const rewardData = await fetchRewardData(rewardId, userId);

  if (!rewardData) {
    return <div className="text-center text-red-500">Reward not found</div>;
  }

  const { reward, consumable } = rewardData;

  const transformedReward = {
    ...reward,
    achievements: reward.achievements.map((achievement) => {
      const originalCreatedAt = (achievement as any).createdAt;
      const originalUpdatedAt = (achievement as any).updatedAt;

      return {
        ...achievement,
        createdAt:
          originalCreatedAt instanceof Date ? originalCreatedAt : new Date(),
        updatedAt:
          originalUpdatedAt instanceof Date ? originalUpdatedAt : new Date(),
      };
    }),
  };

  const notodos = await fetchNotodos(userId);
  const rewardClaims = await fetchRewardClaims(userId);
  const user = await db.user.findUnique({ where: { id: userId } });

  const { totalScore } = getNotodosResult(notodos);
  const totalConsumed = rewardClaims.reduce(
    (acc, claim) => acc + claim.reward.pointCost,
    0,
  );
  const userPoints = (user?.score || 0) + totalScore - totalConsumed;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg m-4">
      <RewardDetails
        reward={transformedReward}
        userPoints={userPoints}
        userId={userId}
      />
      <div className="mb-6">
        <ConsumeRewardButton rewardId={rewardId} consumable={consumable} />
      </div>
      <RewardActionButtons userId={userId} rewardId={rewardId} />
    </div>
  );
}
