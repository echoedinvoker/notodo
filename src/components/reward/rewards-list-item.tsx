'use client';

import { Reward } from "@prisma/client";
import { CircularProgressButton } from "../common/circular-progress-button";
import { useEffect, useRef } from 'react';

interface RewardsListItemProps {
  reward: Reward;
}

export default function RewardsListItem({ reward }: RewardsListItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleComplete = () => {
      console.log(`Consuming reward: ${reward.name}`);
      // Here you can call your server action or do any other necessary operations
    };

    container.addEventListener(`consume-reward-${reward.id}`, handleComplete);

    return () => {
      container.removeEventListener(`consume-reward-${reward.id}`, handleComplete);
    };
  }, [reward]);

  return (
    <div ref={containerRef}>
      <CircularProgressButton
        title={`Consume ${reward.name}`}
        eventName={`consume-reward-${reward.id}`}
      >
        <span className="text-xs font-bold">{reward.pointCost}</span>
      </CircularProgressButton>
    </div>
  );
}
