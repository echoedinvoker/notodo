import { useFormState } from "react-dom";
import FormButton from "../common/FormButton";
import { Input, Textarea } from "@nextui-org/react";

interface CreateNotodoFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

type FormStateAction = (
  state: CreateNotodoFormState,
  formData: FormData
) => Promise<CreateNotodoFormState>;

interface NotodoCreateFormProps {
  formStateAction: FormStateAction;
}


export default function NotodoCreateForm({ formStateAction }: NotodoCreateFormProps) {
  const [formState, action] = useFormState(formStateAction, { errors: {} });

  return (
    <form action={action}>
      <div className="flex flex-col gap-4 p4 w-80">
        <h3 className="text-lg text-stone-700">Create a Notodo</h3>
        <Input
          name='title'
          label="Title"
          labelPlacement="outside"
          className="rounded-lg"
          placeholder="Enter the notodo name"
          isInvalid={!!formState.errors.title}
          errorMessage={formState.errors.title?.join(", ")}
        />
        <Textarea
          name='content'
          label="Content"
          labelPlacement="outside"
          placeholder="Enter the notodo description"
          isInvalid={!!formState.errors.content}
          errorMessage={formState.errors.content?.join(", ")}
        />
        {formState.errors._form && (
          <div className="text-red-500">{formState.errors._form.join(", ")}</div>
        )}
        <FormButton>Submit</FormButton>
      </div>
    </form>
  )
}
