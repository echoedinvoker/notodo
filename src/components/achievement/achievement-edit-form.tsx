'use client';

import { Input, Textarea } from "@nextui-org/react";
import { FormButton } from "../common";
import AchievementCreateFormSelect from "./achievement-create-form-select";
import PointsPerHourInput from "./points-per-hour-input";
import Link from "next/link";
import type { ThresholdsForSelect } from "@/db/queries/thresholds";
import { Achievement, Threshold } from "@prisma/client";

interface AchievementEditFormProps {
  thresholds: ThresholdsForSelect[]
  achievement: Achievement
  relatedThresholds: Threshold[]
}

export default function AchievementEditForm({ thresholds, achievement, relatedThresholds }: AchievementEditFormProps) {

  const relatedThresholdIds = relatedThresholds.map(threshold => threshold.id)

  return (
    <form className="space-y-6">
      <Input
        name='name'
        label="Name"
        placeholder="Enter the achievement name"
        className="w-full"
        defaultValue={achievement.name}
      />
      <AchievementCreateFormSelect 
        thresholds={thresholds} 
        defaultValue={relatedThresholdIds}
      />
      <PointsPerHourInput defaultValue={achievement.pointsPerHour} />
      <Textarea
        name='description'
        label="Description"
        placeholder="Enter the achievement description"
        className="w-full"
        defaultValue={achievement.description ?? ''}
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
          Update Achievement
        </FormButton>
      </div>
    </form>
  )
}
