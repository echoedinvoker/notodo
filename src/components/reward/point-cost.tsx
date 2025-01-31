'use client';

import { useMemo } from 'react';

interface PointCostProps {
  pointCost: number;
  userPoints: number;
}

export default function PointCost({ pointCost, userPoints }: PointCostProps) {
  const hasEnoughPoints = useMemo(() => userPoints >= pointCost, [userPoints, pointCost]);

  return (
    <p className="text-lg">
      Point Cost:&nbsp;
      <span className={`font-semibold ${hasEnoughPoints ? 'text-green-600' : 'text-red-600'}`}>
        {pointCost}
      </span>
      {!hasEnoughPoints && (
        <span className="text-sm text-red-500 ml-2">
          (You need {pointCost - userPoints} more points)
        </span>
      )}
    </p>
  );
}
