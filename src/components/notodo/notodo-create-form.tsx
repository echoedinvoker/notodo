'use client';

import * as actions from "@/actions"
import { useState } from "react";
import { useFormState } from "react-dom";
import { FormButton } from "@/components/common";
import { Input, Textarea, Checkbox } from "@nextui-org/react";
import Link from "next/link";

interface NotodoCreateFormProps {
  userId: string;
}

export default function NotodoCreateForm({ userId }: NotodoCreateFormProps) {
  const [formState, action] = useFormState(actions.createNotodo.bind(null, userId), 
    { errors: {} });
  const [isWeightEnabled, setIsWeightEnabled] = useState(false);

  return (
    <form
      action={action}
      className="space-y-6">
      <Input
        name='title'
        label="Title"
        placeholder="Enter the notodo name"
        isInvalid={!!formState?.errors?.title}
        errorMessage={formState?.errors?.title?.join(", ")}
        className="w-full"
      />
      <Textarea
        name='content'
        label="Content"
        placeholder="Enter the notodo description"
        isInvalid={!!formState?.errors?.content}
        errorMessage={formState?.errors?.content?.join(", ")}
        className="w-full"
      />
      <div className="space-y-2">
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
            className="w-full appearance-none"
            defaultValue="1.0"
            step="0.1"
          />
        )}
      </div>
      
      <div className="flex justify-between items-center mt-6">
        <Link
          href="#"
          className="text-blue-500 hover:text-blue-700 transition duration-300"
        >
          Cancel
        </Link>
        <FormButton
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Create Notodo
        </FormButton>
      </div>
      
      {formState?.errors?._form && (
        <p className="text-red-500">{formState.errors._form.join(", ")}</p>
      )}
    </form>
  )
}
