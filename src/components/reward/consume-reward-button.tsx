'use client';

import React, { useReducer, useEffect } from 'react';
import { useFormState } from "react-dom";
import * as actions from "@/actions";

interface ConsumeRewardButtonProps {
  rewardId: string;
  consumable: boolean;
}

type State = {
  isHolding: boolean;
  progress: number;
  status: 'idle' | 'pending' | 'success' | 'error';
};

type Action =
  | { type: 'START_HOLD' }
  | { type: 'END_HOLD' }
  | { type: 'UPDATE_PROGRESS' }
  | { type: 'SET_STATUS'; payload: State['status'] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START_HOLD':
      return { ...state, isHolding: true };
    case 'END_HOLD':
      return { ...state, isHolding: false, progress: 0 };
    case 'UPDATE_PROGRESS':
      return { ...state, progress: Math.min(state.progress + 2, 100) };
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    default:
      return state;
  }
}

function useProgressBar(consumable: boolean) {
  const [state, dispatch] = useReducer(reducer, {
    isHolding: false,
    progress: 0,
    status: 'idle',
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state.isHolding && consumable) {
      interval = setInterval(() => dispatch({ type: 'UPDATE_PROGRESS' }), 50);
    }
    return () => clearInterval(interval);
  }, [state.isHolding, consumable]);

  useEffect(() => {
    if (state.progress >= 100) {
      dispatch({ type: 'SET_STATUS', payload: 'pending' });
    }
  }, [state.progress]);

  useEffect(() => {
    if (state.status === 'error' || state.status === 'success') {
      const timer = setTimeout(() => dispatch({ type: 'SET_STATUS', payload: 'idle' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [state.status]);

  return [state, dispatch] as const;
}

export default function ConsumeRewardButton({ rewardId, consumable }: ConsumeRewardButtonProps) {
  const [state, dispatch] = useProgressBar(consumable);
  const [formState, action] = useFormState(
    actions.createRewardClaim.bind(null, rewardId),
    { errors: {} }
  );

  useEffect(() => {
    if (state.status === 'pending') {
      action();
    }
  }, [state.status, action]);

  useEffect(() => {
    if (formState.errors?._form) {
      dispatch({ type: 'SET_STATUS', payload: 'error' });
    } else if (formState.success) {
      dispatch({ type: 'SET_STATUS', payload: 'success' });
    }
  }, [formState]);

  useEffect(() => {
    const handleMouseUp = () => dispatch({ type: 'END_HOLD' });
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const handleStart = () => {
    if (consumable) {
      dispatch({ type: 'START_HOLD' });
    }
  };

  return (
    <div className="relative w-48 h-12">
      <button
        className={`w-full h-full rounded-lg font-bold text-white ${
          consumable ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'
        }`}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        onTouchEnd={() => dispatch({ type: 'END_HOLD' })}
        onTouchCancel={() => dispatch({ type: 'END_HOLD' })}
        disabled={!consumable}
      >
        Consume Reward
      </button>
      <ProgressBar progress={state.progress} />
      <StatusOverlay status={state.status} />
    </div>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div
      className="absolute left-0 top-0 h-full bg-green-500 opacity-70 transition-all duration-50 ease-linear rounded-lg pointer-events-none"
      style={{ width: `${progress}%` }}
    />
  );
}

function StatusOverlay({ status }: { status: State['status'] }) {
  if (status === 'idle') return null;

  const statusConfig = {
    pending: { text: 'Processing...', bgColor: 'bg-yellow-500' },
    success: { text: 'Success!', bgColor: 'bg-green-600' },
    error: { text: 'Error occurred', bgColor: 'bg-red-600' },
  };

  const { text, bgColor } = statusConfig[status];

  return (
    <div className={`absolute inset-0 flex items-center justify-center ${bgColor} rounded-lg`}>
      {text}
    </div>
  );
}
