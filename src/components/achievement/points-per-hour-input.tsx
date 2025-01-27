'use client';

import { Input, Switch } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface PointsPerHourInputProps {
  defaultValue?: number | null;
}

export default function PointsPerHourInput({ defaultValue }: PointsPerHourInputProps) {
  const [showPointsPerHour, setShowPointsPerHour] = useState(false);
  const [pointsPerHour, setPointsPerHour] = useState(defaultValue?.toString() || '');

  useEffect(() => {
    if (defaultValue !== null && defaultValue !== undefined) {
      setShowPointsPerHour(true);
    }
  }, [defaultValue]);

  //TODO: switch still not get default value, need to fix
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          checked={showPointsPerHour}
          onChange={(e) => setShowPointsPerHour(e.target.checked)}
        />
        <span className="text-gray-700">Enable Points Per Hour</span>
      </div>
      {showPointsPerHour && (
        <Input
          name='pointsPerHour'
          label="Points Per Hour"
          placeholder="Enter points earned per hour"
          type="number"
          step="0.01"
          className="w-full"
          value={pointsPerHour}
          onChange={(e) => setPointsPerHour(e.target.value)}
        />
      )}
    </div>
  );
}
