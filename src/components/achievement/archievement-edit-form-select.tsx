'use client';

import type { ThresholdsForSelect } from "@/db/queries/thresholds";
import { Select, SelectItem } from "@nextui-org/react";

interface AchievementEditFormSelectProps {
  thresholds: ThresholdsForSelect[];
  defaultSelectedThresholds: string[];
  isInvalid?: boolean;
  errorMessage?: string;
}

export default function AchievementEditFormSelect({ 
  thresholds, 
  defaultSelectedThresholds,
  isInvalid = false,
  errorMessage 
}: AchievementEditFormSelectProps) {
  return (
    <Select
      name='thresholds'
      label="Select Thresholds"
      placeholder="Select thresholds"
      className="w-full"
      selectionMode="multiple"
      defaultSelectedKeys={new Set(defaultSelectedThresholds)}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
    >
      {thresholds.map((threshold) => (
        <SelectItem key={threshold.id} value={threshold.id}>
          {`${threshold.title} (${threshold.notodoTitle})`}
        </SelectItem>
      ))}
    </Select>
  );
}
