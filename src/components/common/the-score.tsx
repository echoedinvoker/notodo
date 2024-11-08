'use client';

import type { NotodoWithData } from "@/db/queries/notodos";
import { calculateNotodoScore } from "@/helpers/utils";

interface TheScoreProps {
  notodo: NotodoWithData;
}

export default function TheScore({ notodo }: TheScoreProps) {
  const score = calculateNotodoScore(notodo);

  return (
    <div className="flex items-baseline">
      <span className="font-semibold text-xl">{score}</span>
      <span className="text-sm italic ml-1">+15/hr</span>
      <span className="text-sm ml-1">pts</span>
    </div>
  );
  }
