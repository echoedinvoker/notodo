import { FaForward } from "react-icons/fa";

interface ThresholdNextProps {
  nextThreshold?: {
    hours: number;
    weight: number;
  };
}

export default function ThresholdNext({ nextThreshold }: ThresholdNextProps) {
  if (!nextThreshold) {
    return null;
  }

  return (
    <div className="flex gap-1 items-center justify-start">
      <FaForward className="w-4 h-4" />
      <div className="flex items-baseline text-sm">
        Next threshold in&nbsp;
        <span className="font-semibold text-xl">{nextThreshold.hours}</span>
        &nbsp;{nextThreshold.hours === 1 ? "hour" : "hours"}
      </div>
    </div>
  );
}
