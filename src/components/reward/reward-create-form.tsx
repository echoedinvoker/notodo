'use client';

import * as actions from "@/actions"
import { useFormState } from "react-dom";
import { FormButton } from "@/components/common";
import { Input, Textarea } from "@nextui-org/react";
import Link from "next/link";
import { paths } from "@/paths";
import type { Achievement } from "@prisma/client";
import RewardCreateFormSelect from "./reward-create-form-select";
import type { NotodoWithData } from "@/db/queries/notodos";
import RewardCreateFormNotodoSelect from "./reward-create-form-notodo-select";
import { useRouter } from "next/navigation";

interface RewardCreateFormProps {
  userId: string;
  achievements: Achievement[];
  notodos: NotodoWithData[];
}

export default function RewardCreateForm({ userId, achievements, notodos }: RewardCreateFormProps) {
  const [formState, action] = useFormState(actions.createReward, { errors: {} });
  const router = useRouter();
  const handleCancel = () => {
    router.back();
  }

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
        className="w-full"
      />
      <Input
        name='pointCost'
        type="number"
        label="Point Cost"
        placeholder="Enter the point cost for this reward"
        isInvalid={!!formState?.errors?.pointCost}
        errorMessage={formState?.errors?.pointCost?.join(", ")}
        className="w-full appearance-none"
      />

      <RewardCreateFormSelect achievements={achievements} />

      <RewardCreateFormNotodoSelect notodos={notodos} />

      <Textarea
        name='description'
        label="Description"
        placeholder="Enter the reward description"
        isInvalid={!!formState?.errors?.description}
        errorMessage={formState?.errors?.description?.join(", ")}
        className="w-full"
      />

      <div className="flex justify-between items-center mt-6">
        <button
          type="button"
          onClick={handleCancel}
          className="text-blue-500 hover:text-blue-700 transition duration-300"
        >
          Cancel
        </button>
        <FormButton
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Create Reward
        </FormButton>
      </div>
      {formState?.errors?._form && (
        <p className="text-red-500">{formState.errors._form.join(", ")}</p>
      )}
    </form>
  )
}
