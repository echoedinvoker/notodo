'use client';

import type { NotodoWithData } from "@/db/queries/notodos";
import { calculateNotodoScore } from "@/helpers/utils";

interface TheScoreProps {
  notodo: NotodoWithData;
}

export default function TheScore({ notodo }: TheScoreProps) {
  const { totalScore, currentWeight } = calculateNotodoScore(notodo);
  console.log(totalScore, currentWeight);

  return (
    <div className="flex items-baseline">
      <span className="font-semibold text-xl">{totalScore}</span>
      <span className="text-sm italic">+{currentWeight}/hr</span>
      <span className="text-sm ml-1">pts</span>
    </div>
  );
  }
