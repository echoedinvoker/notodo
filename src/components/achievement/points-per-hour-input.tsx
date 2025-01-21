'use client';

import { Input, Switch } from "@nextui-org/react";
import { useState } from "react";

export default function PointsPerHourInput() {
  const [showPointsPerHour, setShowPointsPerHour] = useState(false);

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
        />
      )}
    </div>
  );
}
