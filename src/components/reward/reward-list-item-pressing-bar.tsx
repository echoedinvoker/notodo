'use client';

import { useEffect, useState } from "react";
import * as actions from "@/actions"
import { useFormState, useFormStatus } from "react-dom";

interface RewardListItemPressingBarProps {
  rewardId: string;
  consumabled: boolean;
}

export default function RewardListItemPressingBar({ rewardId, consumabled }: RewardListItemPressingBarProps) {
  const [pending, setPending] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formState, action] = useFormState(
    actions.createRewardClaim.bind(null, rewardId),
    { errors: {} }
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  // TODO: there is a warning on browser console when progress reaches 100
  useEffect(() => {
    if (progress >= 100) {
      action();
      setPending(true);
    }
  }, [progress, action])

  useEffect(() => {
    if (formState?.errors?._form && !isError && pending) {
      setPending(false);
      setIsError(true);
    }
  }, [formState?.errors?._form, isError, pending])

  useEffect(() => {
    if (formState?.success && !isSuccess && pending) {
      setPending(false);
      setIsSuccess(true);
    }
  }, [formState?.success, isSuccess, pending])

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
          return prev + 2;
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
      {pending
        ? <div className="h-full bg-yellow-500 rounded-lg flex items-center justify-center uppercase tracking-wide font-bold">Fetching...</div>
        : isSuccess
          ? <div className="h-full bg-green-500 rounded-lg flex items-center justify-center uppercase tracking-wide font-bold">Success</div>
          : isError
            ? <div className="h-full bg-red-500 rounded-lg flex items-center justify-center uppercase tracking-wide font-bold">Error</div>
            : <div className="h-full bg-blue-500 opacity-30 transition-all duration-50 ease-linear rounded-lg" style={{ width: `${progress}%` }} />
      }
    </div>
  );
}
