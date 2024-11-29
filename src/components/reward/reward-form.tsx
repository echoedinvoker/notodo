'use client';

import { Input, Textarea } from "@nextui-org/react";
import { FormButton } from "../common";
import { useFormState } from "react-dom";
import * as actions from "@/actions"
import { useEffect } from "react";

interface RewardFormProps {
  onSubmitSuccess?: () => void;
}

export default function RewardForm({ onSubmitSuccess }: RewardFormProps) {
  const [formState, action] = useFormState(actions.createReward, { errors: {} });

  useEffect(() => {
    if (formState.success && onSubmitSuccess) {
      onSubmitSuccess();
    }
  }, [formState.success, onSubmitSuccess]);

  return (
    <form
      action={action}
      className="flex flex-col gap-4 p4 w-80">
      <h3 className="text-lg text-stone-700">Create a Reward</h3>
      <Input
        name='name'
        label="Name"
        labelPlacement="outside"
        className="rounded-lg"
        placeholder="Enter the reward name"
      />
      <Textarea
        name='description'
        label="Description"
        labelPlacement="outside"
        placeholder="Enter the reward description"
      />
      <Input
        name='pointCost'
        type='number'
        label="Point Cost"
        labelPlacement="outside"
        className="rounded-lg"
        placeholder="Enter the reward cost"
        step="0.1"
      />
      <FormButton>Submit</FormButton>
    </form>
  )
}
