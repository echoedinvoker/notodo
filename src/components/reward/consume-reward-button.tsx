'use client';

import { useState, useEffect, useRef } from 'react';
import * as actions from "@/actions";
import { useFormState } from "react-dom";

interface ConsumeRewardButtonProps {
  rewardId: string;
  consumable: boolean;
}

export default function ConsumeRewardButton({ rewardId, consumable }: ConsumeRewardButtonProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formState, action] = useFormState(
    actions.createRewardClaim.bind(null, rewardId),
    { errors: {} }
  );
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHolding && consumable) {
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
  }, [isHolding, consumable]);

  useEffect(() => {
    if (progress >= 100) {
      setStatus('pending');
      action();
    }
  }, [progress, action]);

  useEffect(() => {
    if (formState.errors?._form) {
      setStatus('error');
    } else if (formState.success) {
      setStatus('success');
    }
  }, [formState]);

  useEffect(() => {
    if (status === 'error' || status === 'success') {
      const timer = setTimeout(() => setStatus('idle'), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  useEffect(() => {
    const handleMouseUp = () => {
      setIsHolding(false);
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleStart = () => {
    if (consumable) {
      setIsHolding(true);
    }
  };

  return (
    <div className="relative w-48 h-12">
      <button
        ref={buttonRef}
        className={`w-full h-full rounded-lg font-bold text-white ${
          consumable ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'
        }`}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        onTouchEnd={() => setIsHolding(false)}
        onTouchCancel={() => setIsHolding(false)}
        disabled={!consumable}
      >
        Consume Reward
      </button>
      <div
        className="absolute left-0 top-0 h-full bg-green-500 opacity-70 transition-all duration-50 ease-linear rounded-lg pointer-events-none"
        style={{ width: `${progress}%` }}
      />
      {status === 'pending' && (
        <div className="absolute inset-0 flex items-center justify-center bg-yellow-500 rounded-lg">
          Processing...
        </div>
      )}
      {status === 'success' && (
        <div className="absolute inset-0 flex items-center justify-center bg-green-600 rounded-lg">
          Success!
        </div>
      )}
      {status === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-600 rounded-lg">
          Error occurred
        </div>
      )}
    </div>
  );
}
