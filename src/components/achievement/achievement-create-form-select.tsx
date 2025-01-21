'use client';

import { Select, SelectItem } from "@nextui-org/react";

const dummyThresholds = [
  { id: "a", title: "30 Minutes No Social Media", notodoTitle: "Reduce Social Media Usage" },
  { id: "2", title: "1 Hour No Snacking", notodoTitle: "Healthy Eating Habits" },
  { id: "3", title: "2 Hours No Video Games", notodoTitle: "Limit Gaming Time" },
  { id: "4", title: "4 Hours No Caffeine", notodoTitle: "Reduce Caffeine Intake" },
  { id: "5", title: "1 Day No Online Shopping", notodoTitle: "Control Spending Habits" },
  { id: "6", title: "3 Hours No TV", notodoTitle: "Reduce Screen Time" },
  { id: "7", title: "2 Hours No Procrastination", notodoTitle: "Improve Productivity" },
  { id: "8", title: "1 Day No Complaining", notodoTitle: "Positive Mindset" },
  { id: "9", title: "12 Hours No Smartphone", notodoTitle: "Digital Detox" },
  { id: "10", title: "6 Hours Proper Posture", notodoTitle: "Improve Physical Health" }
];

export default function AchievementCreateFormSelect() {
  return (
    <Select
      name='thresholds'
      label="Select Threshold"
      placeholder="Select a threshold"
      className="w-full"
      multiple
    >
      {dummyThresholds.map((threshold) => (
        <SelectItem key={threshold.id} value={threshold.id}>
          {`${threshold.title} (${threshold.notodoTitle})`}
        </SelectItem>
      ))}
    </Select>
  );
}
