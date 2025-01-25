'use client';

import type { Achievement } from "@prisma/client";
import { Select, SelectItem } from "@nextui-org/react";

interface RewardCreateFormSelectProps {
  achievements: Achievement[];
}

export default function RewardCreateFormSelect({ achievements }: RewardCreateFormSelectProps) {
  return (
    <Select
      name='achievementIds'
      label="Select Achievements"
      placeholder="Select achievements"
      className="w-full"
      selectionMode="multiple"
    >
      {achievements.map((achievement) => (
        <SelectItem key={achievement.id} value={achievement.id}>
          {achievement.name}
        </SelectItem>
      ))}
    </Select>
  );
}
