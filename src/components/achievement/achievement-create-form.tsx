import { Input, Textarea } from "@nextui-org/react";
import { FormButton } from "../common";
import AchievementCreateFormSelect from "./achievement-create-form-select";

export default function AchievementCreateForm() {
  return (
    <form>
      <Input
        name='name'
        label="Name"
        placeholder="Enter the achievement name"
      />
      <AchievementCreateFormSelect />
      <Textarea
        name='description'
        label="Description"
        placeholder="Enter the achievement description"
      />

      <FormButton>Create Achievement</FormButton>
    </form>
  )
}
