'use client';

import { Input, Textarea } from "@nextui-org/react";
import { FormButton } from "../common";
import AchievementCreateFormSelect from "./achievement-create-form-select";
import PointsPerHourInput from "./points-per-hour-input";
import Link from "next/link";
import * as actions from "@/actions";
import { useFormState } from "react-dom";
import type { ThresholdsForSelect } from "@/db/queries/thresholds";

interface AchievementCreateFormProps {
  thresholds: ThresholdsForSelect[]
}

export default function AchievementCreateForm({ thresholds }: AchievementCreateFormProps) {
  const [formState, action] = useFormState(actions.createAchievement, { errors: {} });
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
      <AchievementCreateFormSelect thresholds={thresholds} />
      <PointsPerHourInput />
      <Textarea
        name='description'
        label="Description"
        placeholder="Enter the achievement description"
        className="w-full"
      />

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
          Create Achievement
        </FormButton>
      </div>
      {formState.errors._form && <p className="text-red-500">{formState.errors._form[0]}</p>}
    </form>
  )
}
