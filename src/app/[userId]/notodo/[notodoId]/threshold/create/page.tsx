import { FormButton } from "@/components/common";
import { Input, Textarea } from "@nextui-org/react";

export default function ThresholdCreatePage() {
  return (
    <div className="p-4">
      <form
        className="p-4">
        <div className="flex flex-col gap-4">
          <Input
            name='title'
            label="Title"
            placeholder="Enter the threshold name"
          />
          <Input
            name='duration'
            placeholder="Enter the threshold duration"
            label="Duration"
          />
          <Input
            name='weight'
            type="number"
            label="Weight"
            placeholder="Enter the notodo weight"
            className="appearance-none"
            step="0.1"
          />
          <Textarea
            name='content'
            label="Content"
            placeholder="Enter the threshold description"
          />
        </div>
        <FormButton className="mt-8">Submit</FormButton>
      </form>
    </div>
    

  )
}
