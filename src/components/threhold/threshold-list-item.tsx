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
    <div className="rounded-lg py-2 px-4 shadow hover:shadow-md transition duration-300 text-stone-700 bg-stone-50">
      <Link href={paths.threadShowPage(userId, notodoId, threshold.id)}>
        <h3 className="text-lg font-semibold my-1">
          {threshold.title}
        </h3>
      </Link>
    </div>
  );
}
