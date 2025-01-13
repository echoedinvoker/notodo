'use client'

import * as actions from "@/actions"
import type { RewardClaimWithReward } from "@/db/queries/rewardClaims";
import { paths } from "@/paths";
import Link from "next/link";
import { useFormState } from "react-dom";
import { FormButton } from "../common";

interface RewardClaimEditFormProps {
  rewardClaim: RewardClaimWithReward
  userId: string
}


export default function RewardClaimEditForm({ rewardClaim, userId }: RewardClaimEditFormProps) {
  const [formState, action] = useFormState(
    actions.editRewardClaim.bind(
      null,
      rewardClaim.id,
      rewardClaim.reward.id
    ),
    { errors: {} }
  );

  return (
    <form action={action}>
      {formState.errors._form && (
        <div className="border border-red-400 rounded bg-red-100 px-4 py-3 mb-4 text-red-700">
          <p>{formState.errors._form.join(', ')}</p>
        </div>
      )}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Notes</h2>
        <textarea
          name="content"
          defaultValue={rewardClaim.content}
          className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your notes here..."
        />
        {formState.errors.content && (
          <p className="text-red-500 text-sm mt-1">{formState.errors.content.join(', ')}</p>
        )}
      </section>

      <div className="flex justify-between items-center">
        <Link
          href={paths.rewardClaimShowPage(userId, rewardClaim.reward.id, rewardClaim.id)}
          className="text-blue-500 hover:text-blue-700 transition duration-300"
        >
          Cancel
        </Link>
        <FormButton
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Save Changes
        </FormButton>
      </div>
    </form>
  )
}
