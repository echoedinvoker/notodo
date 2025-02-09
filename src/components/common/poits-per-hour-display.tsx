import ProgressBar from "./progress-bar";

export function PointsPerHourDisplay({ pointsPerHour, totalWeight }: { pointsPerHour: number | null; totalWeight: number }) {
  return (
    <div className="mb-4">
      <p className="text-sm text-gray-700 mb-2">
        Points Per Hour: <span className="font-semibold text-blue-600">{pointsPerHour ?? "N/A"}</span>
      </p>
      {pointsPerHour && <ProgressBar progress={totalWeight / pointsPerHour} />}
    </div>
  );
}
