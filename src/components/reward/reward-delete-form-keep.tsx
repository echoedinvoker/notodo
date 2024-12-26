'use client';

import { useFormState } from "react-dom";
import { FormButton } from "../common";
import * as actions from "@/actions"

interface RewardDeleteFormKeepProps {
  rewardId: string;
  consumedPoints: number;
  userId: string;
}

export function RewardDeleteFormKeep({ rewardId, consumedPoints, userId }: RewardDeleteFormKeepProps) {
  const [formState, action] = useFormState(actions.deleteRewardKeepPoint.bind(null, rewardId, consumedPoints, userId), { errors: {} });

  return (
    <form action={action} className="w-full text-center">
      <FormButton className="uppercase font-semibold min-w-[300px] hover:bg-red-500 hover:text-white">
        Delete and keep effect
      </FormButton>
      <p className="text-sm text-red-500 text-center w-full mt-1">
        {formState.errors._form?.join(", ")}
      </p>
    </form>
  )
}
