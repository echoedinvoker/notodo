import { FaCoins } from "react-icons/fa";

interface TheScoreProps {
  totalScore: number;
  currentWeight: number;
}

export default function TheScore({ totalScore, currentWeight }: TheScoreProps) {

  return (
    <div className="flex gap-1 items-center justify-start">
      <FaCoins className="w-4 h-4" />
      <div className="flex items-baseline text-sm">
        Challenge earned&nbsp;
        <span className="font-semibold text-xl">{totalScore}</span>
        &nbsp;points
      </div>
      <span className="border-1 border-stone-300 rounded-full py-0.5 px-1 text-xs italic pr-2">+{currentWeight.toFixed(2)}/hr</span>
    </div>
  );
  }
