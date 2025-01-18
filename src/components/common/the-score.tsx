import { FaCoins } from "react-icons/fa";

interface TheScoreProps {
  totalScore: number;
  currentWeight: number;
}

export default function TheScore({ totalScore, currentWeight }: TheScoreProps) {

  return (
    <div className="flex gap-1 items-center justify-start select-none flex-wrap">
      <FaCoins className="w-4 h-4 flex-shrink-0" />
      <div className="flex items-baseline text-sm select-none flex-wrap">
        <span>Challenge earned&nbsp;</span>
        <span className="font-semibold text-xl">{totalScore}</span>
        <span>&nbsp;{totalScore === 1 ? "pt" : "pts"}</span>
      </div>
      {currentWeight && (
        <span className="border border-stone-300 rounded-full py-0.5 px-2 text-xs italic ml-2">
          +{currentWeight.toFixed(2)}/hr
        </span>
      )}
    </div>
  );
}
