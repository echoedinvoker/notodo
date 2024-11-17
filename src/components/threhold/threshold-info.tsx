import { paths } from "@/paths";
import Link from "next/link";

interface ThresholdInfoProps {
  userId: string;
  notodoId: string;
}

export default function ThresholdInfo({ userId, notodoId }: ThresholdInfoProps) {
  return (
    <Link className="flex-1" href={paths.thresholdListPage(userId, notodoId)}>
      <div className="rounded-lg py-2 px-4 shadow hover:shadow-md transition duration-300 text-stone-700 bg-stone-50 mb-4">
        <h3>Thresholds</h3>
        <dl>
          <dt>Progress:</dt>
          <dd>[2/5]</dd>

          <dt>Next threshold:</dt>
          <dd>30 minutes meditation (2 hours remaining)</dd>

          <dt>Hours elasped:</dt>
          <dd>26</dd>
        </dl>
      </div>
    </Link>

  )
}
