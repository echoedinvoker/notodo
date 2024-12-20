'use client';

import type { Reward } from "@prisma/client";
import { useEffect, useState } from "react";
import { FaCoins } from "react-icons/fa";

interface RewardListItemProps {
  userId: string;
  reward: Reward;
  totalScore: number;
}

export default function RewardListItem({ userId, reward, totalScore }: RewardListItemProps) {
  const consumabled = totalScore >= reward.pointCost;
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHolding && consumabled) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2; // 調整這個值來改變進度條填充的速度
        });
      }, 50);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isHolding, consumabled]);

  const handleMouseDown = () => {
    if (consumabled) {
      setIsHolding(true);
    }
  };

  const handleMouseUp = () => {
    setIsHolding(false);
  };

  const handleMouseLeave = () => {
    setIsHolding(false);
  };

  return (
    <div className={`rounded-lg py-2 px-4 transition duration-300 bg-stone-50 ${consumabled
      ? 'hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-stone-700 cursor-pointer'
      : 'shadow-inner text-stone-500 cursor-not-allowed'
      }`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute left-0 top-0 bottom-0 bg-stone-500/30 rounded-lg transition-all duration-50 ease-linear"
        style={{ width: `${progress}%` }}
      ></div>
      <RewardContent reward={reward} />
    </div>
  );
}

function RewardContent({ reward }: { reward: Reward }) {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold my-1">{reward.name}</h3>
      <p className="text-sm text-stone-400">{reward.description}</p>
      <div>
        <p className="flex items-center gap-2 text-lg font-semibold italic">
          <FaCoins />
          {reward.pointCost}
        </p>
        <div className="w-20"></div>
      </div>
    </div>
  );
}
