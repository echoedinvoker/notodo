'use client';

import * as actions from "@/actions";
import { useFormState } from "react-dom";
import { Input, Textarea } from "@nextui-org/react";
import { FormButton } from "../common";
import AchievementCreateFormSelect from "./achievement-create-form-select";
import PointsPerHourInput from "./points-per-hour-input";
import Link from "next/link";
import type { ThresholdsForSelect } from "@/db/queries/thresholds";
import { Achievement, Threshold } from "@prisma/client";
import { paths } from "@/paths";
import AchievementEditFormSelect from "./archievement-edit-form-select";

interface AchievementEditFormProps {
  thresholds: ThresholdsForSelect[]
  achievement: Achievement
  relatedThresholds: Threshold[]
  userId: string
}

export default function AchievementEditForm({ thresholds, achievement, relatedThresholds, userId }: AchievementEditFormProps) {
  const [formState, action] = useFormState(
    actions.editAchievement.bind(null, achievement.id),
    { errors: {} }
  );

  const relatedThresholdIds = relatedThresholds.map(threshold => threshold.id);

  return (
    <form action={action} className="space-y-6">
      <Input
        name='name'
        label="Name"
        placeholder="Enter the achievement name"
        className="w-full"
        defaultValue={achievement.name}
        isInvalid={!!formState?.errors?.name}
        errorMessage={formState?.errors?.name?.join(", ")}
      />
      <AchievementEditFormSelect 
        thresholds={thresholds} 
        defaultSelectedThresholds={relatedThresholdIds}
        isInvalid={!!formState?.errors?.thresholds}
        errorMessage={formState?.errors?.thresholds?.join(", ")}
      />
      <PointsPerHourInput 
        defaultValue={achievement.pointsPerHour} 
        isInvalid={!!formState?.errors?.pointsPerHour}
        errorMessage={formState?.errors?.pointsPerHour?.join(", ")}
      />
      <Textarea
        name='description'
        label="Description"
        placeholder="Enter the achievement description"
        className="w-full"
        defaultValue={achievement.description ?? ''}
        isInvalid={!!formState?.errors?.description}
        errorMessage={formState?.errors?.description?.join(", ")}
      />

      <div className="flex justify-between items-center mt-6">
        <Link
          href={paths.achievementListPage(userId)}
          className="text-blue-500 hover:text-blue-700 transition duration-300"
        >
          Cancel
        </Link>
        <FormButton
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Update Achievement
        </FormButton>
      </div>
      {formState?.errors?._form && (
        <p className="text-red-500">{formState.errors._form.join(", ")}</p>
      )}
    </form>
  )
}
