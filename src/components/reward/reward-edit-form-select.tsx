'use client';

import type { Achievement } from "@prisma/client";
import { Select, SelectItem } from "@nextui-org/react";

interface RewardEditFormSelectProps {
  achievements: Achievement[];
  defaultSelectedAchievements: string[];
}

export default function RewardEditFormSelect({ achievements, defaultSelectedAchievements }: RewardEditFormSelectProps) {
  return (
    <Select
      name='achievementIds'
      label="Select Achievements"
      placeholder="Select achievements"
      className="w-full"
      selectionMode="multiple"
      defaultSelectedKeys={new Set(defaultSelectedAchievements)}
    >
      {achievements.map((achievement) => (
        <SelectItem key={achievement.id} value={achievement.id}>
          {achievement.name}
        </SelectItem>
      ))}
    </Select>
  );
}
