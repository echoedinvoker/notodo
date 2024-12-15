'use client';

import * as actions from "@/actions"
import { FormButton } from "@/components/common";
import { NotodoWithData } from "@/db/queries/notodos";
import { Input, Textarea, Checkbox } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useFormState } from "react-dom";


interface EditNotodoFormProps {
  notodo: NotodoWithData;
}

export default function EditNotodoForm({ notodo }: EditNotodoFormProps) {
  const [formState, action] = useFormState(actions.editNotodo.bind(null, notodo.id), { errors: {} });
  const searchParams = useSearchParams()
  const enableWeight = searchParams.get('enableWeight')
  const [isWeightEnabled, setIsWeightEnabled] = useState(enableWeight === 'true' || notodo.weight !== null)

  return (
    <form
      action={action}
      className="p-4">
      <div className="flex flex-col space-y-4">
      <Input
        name='title'
        label="Title"
        placeholder="Enter the notodo name"
        isInvalid={!!formState?.errors?.title}
        errorMessage={formState?.errors?.title?.join(", ")}
        defaultValue={notodo.title}
      />
      <Textarea
        name='content'
        label="Content"
        placeholder="Enter the notodo description"
        isInvalid={!!formState?.errors?.content}
        errorMessage={formState?.errors?.content?.join(", ")}
        defaultValue={notodo.content}
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
            placeholder="Enter the notodo weight"
            isInvalid={!!formState?.errors?.weight}
            errorMessage={formState?.errors?.weight?.join(", ")}
            className="appearance-none"
            defaultValue={enableWeight === 'true' ? '1' : notodo.weight?.toString()}
            step="0.1"
          />
        )}
        </div>
      </div>
      {formState?.errors?._form && (
        <div className="text-red-500">{formState.errors._form.join(", ")}</div>
      )}
      <FormButton
        className="mt-8"
      >Submit</FormButton>
    </form>
  )
}
