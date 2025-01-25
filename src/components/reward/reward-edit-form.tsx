'use client';

import * as actions from "@/actions"
import { useFormState } from "react-dom";
import { FormButton } from "@/components/common";
import { Input, Textarea } from "@nextui-org/react";
import type { Achievement, Reward } from "@prisma/client";
import Link from "next/link";
import { paths } from "@/paths";
import RewardEditFormSelect from "./reward-edit-form-select";

interface RewardEditFormProps {
  reward: Reward & { achievements: Achievement[] };
  userId: string;
  allAchievements: Achievement[];
  relatedAchievements: Achievement[];
}

export default function RewardEditForm({ reward, userId, allAchievements, relatedAchievements }: RewardEditFormProps) {
  const [formState, action] = useFormState(actions.editReward.bind(null, reward.id), { errors: {} });

  return (
    <form
      action={action}
      className="space-y-6">
      <Input
        name='name'
        label="Name"
        placeholder="Enter the reward name"
        isInvalid={!!formState?.errors?.name}
        errorMessage={formState?.errors?.name?.join(", ")}
        defaultValue={reward.name}
        className="w-full"
      />
      <Textarea
        name='description'
        label="Description"
        placeholder="Enter the reward description"
        isInvalid={!!formState?.errors?.description}
        errorMessage={formState?.errors?.description?.join(", ")}
        defaultValue={reward.description || ""}
        className="w-full"
      />
      <Input
        name='pointCost'
        type="number"
        label="Point Cost"
        placeholder="Enter the point cost for this reward"
        isInvalid={!!formState?.errors?.pointCost}
        errorMessage={formState?.errors?.pointCost?.join(", ")}
        defaultValue={reward.pointCost?.toString() || ""}
        className="w-full appearance-none"
      />

      <RewardEditFormSelect 
        achievements={allAchievements} 
        defaultSelectedAchievements={relatedAchievements.map(a => a.id)}
      />

      <div className="flex justify-between items-center mt-6">
        <Link
          href={paths.rewardListPage(userId)}
          className="text-blue-500 hover:text-blue-700 transition duration-300"
        >
          Cancel
        </Link>
        <FormButton
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Update Reward
        </FormButton>
      </div>
      {formState?.errors?._form && (
        <p className="text-red-500">{formState.errors._form.join(", ")}</p>
      )}
    </form>
  )
}
