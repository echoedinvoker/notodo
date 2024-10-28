import { paths } from "@/paths";
import type { Threshold } from "@prisma/client";
import Link from "next/link";

interface ThresholdListProps {
  fetchThresholds: () => Promise<Threshold[]>;
  notodoId: string;
  userId: string;
}
export default async function ThresholdList({ fetchThresholds, notodoId, userId }: ThresholdListProps) {
  const thresholds = await fetchThresholds();

  const renderedThresholds = thresholds.map((threshold) => {
    return (
      <div key={threshold.id} className="border rounded py-2 px-4 border-gray-500">
        <Link href={paths.threadShowPage(userId, notodoId, threshold.id)}>
          <h3 className="text-lg font-semibold my-1">{threshold.title}</h3>
        </Link>
      </div>
    )
  })

  return (
    <div className="flex flex-col gap-2">
      {renderedThresholds}
    </div>
  )
}
