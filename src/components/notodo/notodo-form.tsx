import { useFormState } from "react-dom";
import FormButton from "../common/FormButton";
import { Input, Textarea } from "@nextui-org/react";

interface NotodoFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

type FormStateAction = (
  state: NotodoFormState,
  formData: FormData
) => Promise<NotodoFormState>;

interface NotodoFormProps {
  formStateAction: FormStateAction;
  defaultValues?: {
    title: string;
    content: string;
  };
}


export default function NotodoForm({ formStateAction, defaultValues }: NotodoFormProps) {
  const [formState, action] = useFormState(formStateAction, { errors: {} });

  return (
    <form action={action}>
      <div className="flex flex-col gap-4 p4 w-80">
        <h3 className="text-lg text-stone-700"> a Notodo</h3>
        <Input
          name='title'
          label="Title"
          labelPlacement="outside"
          className="rounded-lg"
          placeholder="Enter the notodo name"
          isInvalid={!!formState.errors.title}
          errorMessage={formState.errors.title?.join(", ")}
          defaultValue={defaultValues?.title}
        />
        <Textarea
          name='content'
          label="Content"
          labelPlacement="outside"
          placeholder="Enter the notodo description"
          isInvalid={!!formState.errors.content}
          errorMessage={formState.errors.content?.join(", ")}
          defaultValue={defaultValues?.content}
        />
        {formState.errors._form && (
          <div className="text-red-500">{formState.errors._form.join(", ")}</div>
        )}
        <FormButton>Submit</FormButton>
      </div>
    </form>
  )
}
