'use client';

import { Input, Textarea } from "@nextui-org/react";
import { FormButton } from "../common";
import AchievementCreateFormSelect from "./achievement-create-form-select";
import PointsPerHourInput from "./points-per-hour-input";
import * as actions from "@/actions";
import { useFormState } from "react-dom";
import type { ThresholdsForSelect } from "@/db/queries/thresholds";
import { useRouter } from "next/navigation";

interface AchievementCreateFormProps {
  thresholds: ThresholdsForSelect[]
}

export default function AchievementCreateForm({ thresholds }: AchievementCreateFormProps) {
  const [formState, action] = useFormState(actions.createAchievement, { errors: {} });
  const router = useRouter();
  const handleCancel = () => {
    router.back();
  }
  return (
    <form
      action={action}
      className="space-y-6">
      <Input
        name='name'
        label="Name"
        placeholder="Enter the achievement name"
        className="w-full"
      />
      {formState.errors.name && <p className="text-red-500">{formState.errors.name[0]}</p>}
      <AchievementCreateFormSelect thresholds={thresholds} />
      {formState.errors.thresholds && <p className="text-red-500">{formState.errors.thresholds[0]}</p>}
      <PointsPerHourInput />
      {formState.errors.pointsPerHour && <p className="text-red-500">{formState.errors.pointsPerHour[0]}</p>}
      <Textarea
        name='description'
        label="Description"
        placeholder="Enter the achievement description"
        className="w-full"
      />
      {formState.errors.description && <p className="text-red-500">{formState.errors.description[0]}</p>}

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
          Create Achievement
        </FormButton>
      </div>
      {formState.errors._form && <p className="text-red-500">{formState.errors._form[0]}</p>}
    </form>
  )
}
