import type { Threshold } from "@prisma/client";
import ThresholdListItem from "./threshold-list-item";
import Link from "next/link";
import { paths } from "@/paths";

interface ThresholdListProps {
  fetchThresholds: () => Promise<Threshold[]>;
  notodoId: string;
  userId: string;
}
export default async function ThresholdList({ fetchThresholds, notodoId, userId }: ThresholdListProps) {
  const thresholds = await fetchThresholds();

  if (thresholds.length === 0) {
    return (
      <div className="flex items-center justify-center px-8 py-16 text-stone-400">
        <Link
          className="hover:drop-shadow-md active:text-stone-300 transition text-lg"
          href={paths.createThresholdPage(userId, notodoId)}>
          No threshold found. Create one?
        </Link>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {thresholds.map((threshold) => (
        // TODO: refactor ThresholdListItem
        <ThresholdListItem key={threshold.id} threshold={threshold} userId={userId} notodoId={notodoId} />
      ))}
    </div>
  )
}
