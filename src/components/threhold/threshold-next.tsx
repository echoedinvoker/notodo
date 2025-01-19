import { NotodoWithData } from "@/db/queries/notodos";
import { paths } from "@/paths";
import Link from "next/link";
import { FaForward, FaPlus } from "react-icons/fa";

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
        className="flex items-center justify-center bg-blue-500 text-white text-sm px-4 py-2 mt-4 rounded-lg hover:bg-blue-600 transition uppercase font-semibold tracking-wider"
        href={paths.createThresholdPage(notodo.user.id, notodo.id)}
      >
        <FaPlus className="mr-2" />Next Threshold
      </Link>
    )
  }

  return (
    <div className="flex gap-1 items-center justify-start mt-2">
      <FaForward className="w-4 h-4 flex-shrink-0" />
      <div className="flex items-baseline text-sm select-none flex-wrap">
        <span>Next threshold in&nbsp;</span>
        <span className="font-semibold text-xl">{nextThreshold.hours}</span>
        <span>&nbsp;{nextThreshold.hours === 1 ? "hr" : "hrs"}</span>
      </div>
    </div>
  );
}
