interface ThresholdNextProps {
  nextThreshold: {
    hours: number;
    weight: number;
  };
}

export default function ThresholdNext({ nextThreshold: { hours, weight } }: ThresholdNextProps) {
  return (
    <div className="flex items-baseline border border-stone-300 rounded-full px-2">
      <span className="font-semibold text-sm">{hours}</span>
      <span className="text-xs italic">+{weight}/hr</span>
    </div>
  );
}
