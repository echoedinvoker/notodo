import type { Threshold } from "@prisma/client";
import ThresholdListItem from "./threshold-list-item";

interface ThresholdListProps {
  fetchThresholds: () => Promise<Threshold[]>;
  notodoId: string;
  userId: string;
}
export default async function ThresholdList({ fetchThresholds, notodoId, userId }: ThresholdListProps) {
  const thresholds = await fetchThresholds();


  return (
    <div className="flex flex-col gap-2">
      {thresholds.map((threshold) => (
        <ThresholdListItem key={threshold.id} threshold={threshold} userId={userId} notodoId={notodoId} />
      ))}
    </div>
  )
}
