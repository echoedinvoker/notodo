'use client';

import { FormButton } from "@/components/common";
import { Input, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";
import * as actions from "@/actions";
import Link from "next/link";
import { paths } from "@/paths";
import { useRouter } from "next/navigation";

interface ThresholdCreateFormProps {
  userId: string;
  notodoId: string;
}

export default function ThresholdCreateForm({ userId, notodoId }: ThresholdCreateFormProps) {
  const [formState, action] = useFormState(
    actions.createThreshold.bind(null, { userId, notodoId }),
    { errors: {} }
  )
  const router = useRouter();
  const handleCancel = () => {
    router.back();
  }
  
  return (
    <form action={action} className="space-y-6">
      <Input
        name='title'
        label="Title"
        placeholder="Enter the threshold name"
        isInvalid={!!formState.errors?.title}
        errorMessage={formState.errors?.title?.join(", ")}
        className="w-full"
      />
      <Input
        name='duration'
        placeholder="Enter the threshold duration"
        label="Duration"
        isInvalid={!!formState.errors?.duration}
        errorMessage={formState.errors?.duration?.join(", ")}
        className="w-full"
      />
      <Input
        name='weight'
        type="number"
        label="Weight"
        placeholder="Enter the notodo weight"
        className="w-full appearance-none"
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
          Create Threshold
        </FormButton>
      </div>
      
      {formState.errors._form && (
        <p className="text-red-500">{formState.errors._form.join(", ")}</p>
      )}
    </form>
  )
}
