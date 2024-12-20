'use client';

import { useEffect, useState } from "react";

export default function RewardListItemPressingBar({ consumabled }: { consumabled: boolean }) {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);

  // TODO: when progress to 100, trigger a dummy function

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
    <div
      className="z-10 w-full absolute left-0 top-0 bottom-0 rounded-lg transition-all duration-50 ease-linear"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="h-full bg-blue-500 opacity-30 transition-all duration-50 ease-linear rounded-lg"
        style={{ width: `${progress}%` }}
      />

    </div>
  );
}
