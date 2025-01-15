'use client';

import * as actions from "@/actions"
import { useFormState } from "react-dom";
import { FormButton } from "@/components/common";

interface RewardClaimDeleteProps {
  userId: string,
  rewardId: string,
  rewardClaimId: string
}

export default function RewardClaimDelete({ userId, rewardId, rewardClaimId }: RewardClaimDeleteProps) {
  const [formState, action] = useFormState(actions.deleteRewardClaim.bind(null, userId, rewardId, rewardClaimId), { errors: {} });

  return (
    <form action={action}>
      <FormButton className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
        Delete and remove effect
      </FormButton>
      {formState.errors._form && (
        <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          {formState.errors._form.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
    </form>
  )
}
