'use client';

interface TheScoreProps {
  totalScore: number;
  currentWeight: number;
}

export default function TheScore({ totalScore, currentWeight }: TheScoreProps) {

  return (
    <div className="flex items-baseline">
      <span className="font-semibold text-xl">{totalScore}</span>
      <span className="text-sm italic">+{currentWeight}/hr</span>
      <span className="text-sm ml-1">pts</span>
    </div>
  );
  }
