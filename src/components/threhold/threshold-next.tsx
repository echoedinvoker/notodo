import { NotodoWithData } from "@/db/queries/notodos";
import { paths } from "@/paths";
import Link from "next/link";
import { FaForward } from "react-icons/fa";

interface ThresholdNextProps {
  notodo: NotodoWithData;
  nextThreshold?: {
    hours: number;
    weight: number;
  };
}

export default function ThresholdNext({ notodo, nextThreshold }: ThresholdNextProps) {
  if (!nextThreshold) {
    return (
      <Link
        className="bg-stone-200 text-stone-500 text-sm px-2 py-1 my-1 rounded-lg hover:bg-stone-500 hover:text-stone-50 transition uppercase font-mono font-semibold tracking-wider"
        href={paths.createThresholdPage(notodo.user.id, notodo.id)}
      >
        Create next threshold
      </Link>
    )
  }

  return (
    <div className="flex gap-1 items-center justify-start">
      <FaForward className="w-4 h-4" />
      <div className="flex items-baseline text-sm select-none">
        Next threshold in&nbsp;
        <span className="font-semibold text-xl">{nextThreshold.hours}</span>
        &nbsp;{nextThreshold.hours === 1 ? "hr" : "hrs"}
      </div>
    </div>
  );
}
