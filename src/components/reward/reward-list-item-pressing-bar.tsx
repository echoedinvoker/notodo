'use client';

import { useEffect, useState } from "react";
import * as actions from "@/actions"
import { useFormState } from "react-dom";

interface RewardListItemPressingBarProps {
  rewardId: string;
  consumabled: boolean;
}

export default function RewardListItemPressingBar({ rewardId, consumabled }: RewardListItemPressingBarProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formState, action] = useFormState(
    actions.createRewardClaim.bind(null, rewardId),
    { errors: {} }
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (progress >= 100) action();
  }, [progress])

  useEffect(() => {
    if (formState?.errors?._form && !isError) setIsError(true);
  }, [formState?.errors?._form])

  useEffect(() => {
    if (formState?.success && !isSuccess) setIsSuccess(true);
  }, [formState?.success])

  useEffect(() => {
    if (isError) setTimeout(() => setIsError(false), 5000);
  }, [isError])

  useEffect(() => {
    if (isSuccess) setTimeout(() => setIsSuccess(false), 5000);
  }, [isSuccess])


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
      {isSuccess
        ? <div className="h-full bg-green-500 rounded-lg flex items-center justify-center uppercase tracking-wide font-bold">Success</div>
        : isError
          ? <div className="h-full bg-red-500 rounded-lg flex items-center justify-center uppercase tracking-wide font-bold">Error</div>
          : <div className="h-full bg-blue-500 opacity-30 transition-all duration-50 ease-linear rounded-lg" style={{ width: `${progress}%` }} />
      }
    </div>
  );
}
