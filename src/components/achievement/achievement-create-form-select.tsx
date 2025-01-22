'use client';

import type { ThresholdsForSelect } from "@/db/queries/thresholds";
import { Select, SelectItem } from "@nextui-org/react";

interface AchievementCreateFormSelectProps {
  thresholds: ThresholdsForSelect[];
}

export default function AchievementCreateFormSelect({ thresholds }: AchievementCreateFormSelectProps) {
  return (
    <Select
      name='thresholds'
      label="Select Threshold"
      placeholder="Select a threshold"
      className="w-full"
      selectionMode="multiple"
    >
      {thresholds.map((threshold) => (
        <SelectItem key={threshold.id} value={threshold.id}>
          {`${threshold.title} (${threshold.notodoTitle})`}
        </SelectItem>
      ))}
    </Select>
  );
}
