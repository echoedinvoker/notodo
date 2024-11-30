'use client';

import * as actions from "@/actions"
import { FormButton } from "@/components/common";
import { Input, Textarea, Checkbox } from "@nextui-org/react";
import { useState } from "react";
import { useFormState } from "react-dom";


interface CreateNotodoPageProps {
  params: {
    userId: string;
  }
}

export default function CreateNotodoPage({ params: { userId } }: CreateNotodoPageProps) {
  const [formState, action] = useFormState(actions.createNotodo.bind(null, userId), 
    { errors: {} });
  const [isWeightEnabled, setIsWeightEnabled] = useState(false);

  return (
    <div className="p-4">
      <h1 className="text-2xl text-stone-700">Create a Notodo</h1>
      <form
        action={action}
        className="p-4">
        <div className="flex flex-col space-y-4">
        <Input
          name='title'
          label="Title"
          labelPlacement="outside"
          className="rounded-lg"
          placeholder="Enter the notodo name"
          isInvalid={!!formState?.errors?.title}
          errorMessage={formState?.errors?.title?.join(", ")}
        />
        <Textarea
          name='content'
          label="Content"
          labelPlacement="outside"
          placeholder="Enter the notodo description"
            isInvalid={!!formState?.errors?.content}
            errorMessage={formState?.errors?.content?.join(", ")}
        />
        <div className="flex flex-col space-y-1">
          <Checkbox
            size="sm"
            isSelected={isWeightEnabled}
            onChange={() => setIsWeightEnabled(!isWeightEnabled)}
          >
            Enable Weight
          </Checkbox>
          {isWeightEnabled && (
            <Input
              name='weight'
              type="number"
              labelPlacement="outside"
              placeholder="Enter the notodo weight"
              isInvalid={!!formState?.errors?.weight}
              errorMessage={formState?.errors?.weight?.join(", ")}
              defaultValue="1.0"
              step="0.1"
            />
          )}
          </div>
        </div>
        {formState?.errors?._form && (
          <div className="text-red-500">{formState.errors._form.join(", ")}</div>
        )}
        <FormButton
          className="mt-12"
        >Submit</FormButton>
      </form>
    </div>
  )
}
