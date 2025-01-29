'use client';

import React, { useState, useEffect, useRef } from 'react';

interface CircularProgressButtonProps {
  children: React.ReactNode;
  title: string;
  eventName: string;
  duration?: number;
}

export function CircularProgressButton({ 
  children, 
  title, 
  eventName,
  duration = 2000 
}: CircularProgressButtonProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHolding) {
      const startTime = Date.now();
      interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const newProgress = (elapsedTime / duration) * 100;
        if (newProgress >= 100) {
          clearInterval(interval);
          // Dispatch a custom event when complete
          buttonRef.current?.dispatchEvent(new CustomEvent(eventName, { bubbles: true }));
          setProgress(0);
          setIsHolding(false);
        } else {
          setProgress(newProgress);
        }
      }, 20);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isHolding, eventName, duration]);

  const handleStart = () => setIsHolding(true);
  const handleEnd = () => setIsHolding(false);

  return (
    <button
      ref={buttonRef}
      className="relative w-10 h-10 flex items-center justify-center rounded-full bg-stone-200 hover:bg-stone-300 hover:text-stone-100 transition duration-300 shadow hover:shadow-md"
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onTouchCancel={handleEnd}
      title={title}
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
