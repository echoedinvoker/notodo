interface AlreadyPointsProps {
  points: number;
  type: 'consumed' | 'earned';
}

export default function AlreadyPoints({ points, type }: AlreadyPointsProps) {
  return (
    <p className="text-sm text-stone-600 text-center w-full">
      Already {type}&nbsp;
      <span className="text-xl font-semibold text-stone-700">
        {points}
      </span>
      &nbsp;points from this {type === 'consumed' ? 'reward' : 'notodo'}.
    </p>
  )
}
