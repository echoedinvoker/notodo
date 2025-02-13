'use client';

import { Input, Textarea } from "@nextui-org/react";
import * as actions from "@/actions";
import { useFormState } from "react-dom";
import { FormButton } from "../common";
import { useEffect } from "react";

interface ThresholdFormProps {
  actionType: 'create' | 'edit';
  userId: string;
  notodoId: string;
  onSubmitSuccess?: () => void;
  thresholdId?: string;
  initialData?: {
    title?: string;
    content?: string;
    duration?: string;
    weight?: string;
  };
}

export default function ThresholdForm({
  actionType,
  userId,
  notodoId,
  onSubmitSuccess,
  thresholdId = '',
  initialData = {}
}: ThresholdFormProps) {
  const action = actionType === 'create'
    ? actions.createThreshold.bind(null, { userId, notodoId })
    : actions.editThreshold.bind(null, { userId, thresholdId });

  const [formState, formAction] = useFormState(action, { errors: {} });

  useEffect(() => {
    if (formState.success && onSubmitSuccess) {
      onSubmitSuccess();
    }
  }, [formState.success, onSubmitSuccess]);

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-4 p-4 w-80">
        <h3 className="text-lg">{actionType === 'create' ? 'Create' : 'Edit'} a Threshold</h3>
        <Input
          name='title'
          placeholder="Enter the threshold name"
          label="Title"
          labelPlacement="outside"
          isInvalid={!!formState.errors?.title}
          errorMessage={formState.errors?.title?.join(", ")}
          defaultValue={initialData.title}
        />
        <Textarea
          name='content'
          placeholder="Enter the threshold description"
          label="Content"
          labelPlacement="outside"
          isInvalid={!!formState.errors?.content}
          errorMessage={formState.errors?.content?.join(", ")}
          defaultValue={initialData.content}
        />
        <Input
          name='duration'
          placeholder="Enter the threshold duration"
          label="Duration"
          labelPlacement="outside"
          isInvalid={!!formState.errors?.duration}
          errorMessage={formState.errors?.duration?.join(", ")}
          defaultValue={initialData.duration}
        />
        <Input
          name='weight'
          type="number"
          label="Weight"
          labelPlacement="outside"
          placeholder="Enter the notodo weight"
          isInvalid={!!formState?.errors?.weight}
          errorMessage={formState?.errors?.weight?.join(", ")}
          defaultValue={initialData?.weight?.toString() || "1.0"}
          step="0.1"
        />
        {formState.errors._form && (
          <div className="text-red-500">{formState.errors._form.join(", ")}</div>
        )}
        <FormButton>Submit</FormButton>
      </div>
    </form>

  )
}
