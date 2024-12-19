'use client';

import * as actions from "@/actions"
import { useFormState } from "react-dom";
import { FormButton } from "@/components/common";
import { Input, Textarea } from "@nextui-org/react";

export default function RewardCreateForm() {
  const [formState, action] = useFormState(actions.createReward, { errors: {} });

  return (
    <form
      action={action}
      className="p-4">
      <div className="flex flex-col space-y-4">
        <Input
          name='name'
          label="Name"
          placeholder="Enter the reward name"
          isInvalid={!!formState?.errors?.name}
          errorMessage={formState?.errors?.name?.join(", ")}
        />
        <Textarea
          name='description'
          label="Description"
          placeholder="Enter the reward description"
          isInvalid={!!formState?.errors?.description}
          errorMessage={formState?.errors?.description?.join(", ")}
        />
        <Input
          name='pointCost'
          type="number"
          label="Point Cost"
          placeholder="Enter the point cost for this reward"
          isInvalid={!!formState?.errors?.pointCost}
          errorMessage={formState?.errors?.pointCost?.join(", ")}
          className="appearance-none"
        />
      </div>
      {formState?.errors?._form && (
        <div className="text-red-500">{formState.errors._form.join(", ")}</div>
      )}
      <FormButton
        className="mt-8"
      >Create Reward</FormButton>
    </form>
  )
}
