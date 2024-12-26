import * as actions from "@/actions"
import AlreadyPoints from "@/components/already-points";
import { FormButton } from "@/components/common";
import { RewardDeleteFormKeep } from "@/components/reward/reward-delete-form-keep";
import { fetchRewardWithClaims } from "@/db/queries/rewards";

interface DeleteRewardPageProps {
  params: {
    userId: string;
    rewardId: string;
  },
}

export default async function DeleteRewardPage({ params: { userId, rewardId } }: DeleteRewardPageProps) {
  const reward = await fetchRewardWithClaims(rewardId);
  const pointsPerClaim = reward.pointCost;
  const consumedPoints = reward.rewardClaims.length * pointsPerClaim;

  return (
    <div className="py-12 flex flex-col gap-6 items-start justify-around">
      <AlreadyPoints points={consumedPoints} type="consumed" />

      {/* TODO: wrap as a component */}
      {/* TODO: create a client-side component for implement useFormState error handling */}
      <form action={actions.deleteReward.bind(null, rewardId)} className="w-full text-center">
        <FormButton className="uppercase font-semibold min-w-[300px] hover:bg-red-500 hover:text-white">
          Delete and remove effect
        </FormButton>
      </form>

      {/* TODO: add cancel button */}
      {/* TODO: simplify options when Math.floor(consumedPoints) === 0  */}
      <RewardDeleteFormKeep rewardId={rewardId} consumedPoints={consumedPoints} userId={userId} />
    </div>
  )
}
