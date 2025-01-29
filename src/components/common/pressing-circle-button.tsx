'use client';

import React, { useState, useEffect } from 'react';

interface PressingCircleButtonProps {
  children: React.ReactNode;
  tip: string;
  rewardId: string;
}

export default function PressingCircleButton({ children, tip, rewardId }: PressingCircleButtonProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHolding) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Dispatch a custom event when complete
            window.dispatchEvent(new CustomEvent('rewardComplete', { detail: rewardId }));
            return 0;
          }
          return prev + 2;
        });
      }, 20);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isHolding, rewardId]);

  const handleStart = () => setIsHolding(true);
  const handleEnd = () => setIsHolding(false);

  return (
    <button
      className="relative w-10 h-10 flex items-center justify-center rounded-full bg-stone-200 hover:bg-stone-300 hover:text-stone-100 transition duration-300 shadow hover:shadow-md"
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onTouchCancel={handleEnd}
      title={tip}
      type="button"
    >
      {children}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="#4299e1"
          strokeWidth="4"
          strokeDasharray={`${progress * 3.14}, 314`}
          transform="rotate(-90 50 50)"
        />
      </svg>
    </button>
  );
}
