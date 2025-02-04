import { AchievementStatus } from "./achievement-list";
import { ThresholdItem } from "./threshold-item";

export function ThresholdsList({ thresholds }: { thresholds: AchievementStatus["thresholds"] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Thresholds:</h3>
      <ul className="space-y-2">
        {thresholds.map((threshold) => (
          <ThresholdItem key={threshold.id} threshold={threshold} />
        ))}
      </ul>
    </div>
  );
}
