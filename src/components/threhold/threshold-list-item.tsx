import { paths } from "@/paths";
import type { Threshold } from "@prisma/client";
import Link from "next/link";

interface ThresholdListItemProps {
  threshold: Threshold;
  notodoId: string;
  userId: string;
}

export default async function ThresholdListItem({ threshold, notodoId, userId }: ThresholdListItemProps) {

  return (
    <div className="rounded-full w-8 h-8 shadow hover:shadow-md transition duration-300 text-stone-700 bg-stone-50">
      <Link
        className="flex items-center justify-center h-full w-full text-sm font-semibold"
        href={paths.threadShowPage(userId, notodoId, threshold.id)}>
        {threshold.weight}
      </Link>
    </div>
  );
}
