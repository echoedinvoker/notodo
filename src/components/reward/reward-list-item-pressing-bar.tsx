'use client';

import { useEffect, useState } from "react";

export default function RewardListItemPressingBar({ consumabled }: { consumabled: boolean }) {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress >= 100) {
      console.log("消耗成功");
      // TODO: Create a action to consume the reward (create a new reward claim with thiw reward id)
      // TODO: Track if the reward is consumed successfully, if success, do something like show a success message
    }
  }, [progress])

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

  const handleStart = () => {
    if (consumabled) {
      setIsHolding(true);
    }
  };

  const handleEnd = () => {
    setIsHolding(false);
  };

  return (
    <div
      className="select-none z-10 w-full absolute left-0 top-0 bottom-0 rounded-lg transition-all duration-50 ease-linear"
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onTouchCancel={handleEnd}
    >
      <div
        className="h-full bg-blue-500 opacity-30 transition-all duration-50 ease-linear rounded-lg"
        style={{ width: `${progress}%` }}
      />

    </div>
  );
}
