'use client';

import { Input, Switch } from "@nextui-org/react";
import { useState } from "react";

export default function PointsPerHourInput() {
  const [showPointsPerHour, setShowPointsPerHour] = useState(false);

  return (
    <div>
      <Switch
        checked={showPointsPerHour}
        onChange={(e) => setShowPointsPerHour(e.target.checked)}
      />
      <span>Enable Points Per Hour</span>
      {showPointsPerHour && (
        <Input
          name='pointsPerHour'
          label="Points Per Hour"
          placeholder="Enter points earned per hour"
          type="number"
          step="0.01"
        />
      )}
    </div>
  );
}
