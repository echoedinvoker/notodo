'use client';

import { FormButton } from "@/components/common";
import { Input, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";
import * as actions from "@/actions";

interface ThresholdCreateFormProps {
  userId: string;
  notodoId: string;
}

export default function ThresholdCreateForm({ userId, notodoId }: ThresholdCreateFormProps) {
  const [formState, action] = useFormState(
    actions.createThreshold.bind(null, { userId, notodoId }),
    { errors: {} }
  )
  
  return (
    <form action={action} className="p-4">
      <div className="flex flex-col gap-4">
        <Input
          name='title'
          label="Title"
          placeholder="Enter the threshold name"
          isInvalid={!!formState.errors?.title}
          errorMessage={formState.errors?.title?.join(", ")}
        />
        <Input
          name='duration'
          placeholder="Enter the threshold duration"
          label="Duration"
          isInvalid={!!formState.errors?.duration}
          errorMessage={formState.errors?.duration?.join(", ")}
        />
        <Input
          name='weight'
          type="number"
          label="Weight"
          placeholder="Enter the notodo weight"
          className="appearance-none"
          step="0.1"
          isInvalid={!!formState?.errors?.weight}
          errorMessage={formState?.errors?.weight?.join(", ")}
        />
        <Textarea
          name='content'
          label="Content"
          placeholder="Enter the threshold description"
          isInvalid={!!formState.errors?.content}
          errorMessage={formState.errors?.content?.join(", ")}
        />
      </div>
      {formState.errors._form && (
        <div className="text-red-500">{formState.errors._form.join(", ")}</div>
      )}
      <FormButton className="mt-8">Submit</FormButton>
    </form>
  )
}
