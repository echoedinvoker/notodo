import { useFormState } from "react-dom";
import { Checkbox, Input, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import type { Notodo } from "@prisma/client";
import { FormButton } from "../common";

interface NotodoFormState {
  errors: {
    title?: string[];
    content?: string[];
    weight?: string[];
    _form?: string[];
  };
  success?: boolean;
}

type FormStateAction = (
  state: NotodoFormState,
  formData: FormData
) => Promise<NotodoFormState>;

interface NotodoFormProps {
  formStateAction: FormStateAction;
  defaultValues?: Notodo;
  onSubmitSuccess?: () => void;
}


export default function NotodoForm({ formStateAction, defaultValues, onSubmitSuccess }: NotodoFormProps) {
  const [formState, action] = useFormState(formStateAction, { errors: {} });
  const [isWeightEnabled, setIsWeightEnabled] = useState(defaultValues?.weight ? true : false);

  useEffect(() => {
    if (formState.success && onSubmitSuccess) {
      onSubmitSuccess();
    }
  }, [formState.success, onSubmitSuccess]);

  return (
    <form action={action}>
      <div className="flex flex-col gap-4 p4 w-80">
        <h3 className="text-lg text-stone-700">{defaultValues ? "Edit" : "Create"} a Notodo</h3>
        <Input
          name='title'
          label="Title"
          labelPlacement="outside"
          className="rounded-lg"
          placeholder="Enter the notodo name"
          isInvalid={!!formState?.errors?.title}
          errorMessage={formState?.errors?.title?.join(", ")}
          defaultValue={defaultValues?.title}
        />
        <Textarea
          name='content'
          label="Content"
          labelPlacement="outside"
          placeholder="Enter the notodo description"
          isInvalid={!!formState?.errors?.content}
          errorMessage={formState?.errors?.content?.join(", ")}
          defaultValue={defaultValues?.content}
        />
        <Checkbox isSelected={isWeightEnabled} onChange={() => setIsWeightEnabled(!isWeightEnabled)}>
          Enable Weight
        </Checkbox>
        {isWeightEnabled && (
          <Input
            name='weight'
            type="number"
            label="Weight"
            labelPlacement="outside"
            placeholder="Enter the notodo weight"
            isInvalid={!!formState?.errors?.weight}
            errorMessage={formState?.errors?.weight?.join(", ")}
            defaultValue={defaultValues?.weight?.toString() || "1.0"}
            step="0.1"
          />
        )}
        {formState?.errors?._form && (
          <div className="text-red-500">{formState.errors._form.join(", ")}</div>
        )}
        <FormButton>Submit</FormButton>
      </div>
    </form>
  )
}
