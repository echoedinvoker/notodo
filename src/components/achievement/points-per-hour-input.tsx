'use client';

import { Input, Switch } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface PointsPerHourInputProps {
  defaultValue?: number | null;
  isInvalid?: boolean;
  errorMessage?: string;
}

export default function PointsPerHourInput({ 
  defaultValue, 
  isInvalid = false,
  errorMessage 
}: PointsPerHourInputProps) {
  const [showPointsPerHour, setShowPointsPerHour] = useState(false);
  const [pointsPerHour, setPointsPerHour] = useState(defaultValue?.toString() || '');

  useEffect(() => {
    if (defaultValue !== null && defaultValue !== undefined) {
      setShowPointsPerHour(true);
    }
  }, [defaultValue]);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          isSelected={showPointsPerHour}
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
          isInvalid={isInvalid}
          errorMessage={errorMessage}
        />
      )}
      {!showPointsPerHour && (
        <input type="hidden" name="pointsPerHour" value="0" />
      )}
    </div>
  );
}
