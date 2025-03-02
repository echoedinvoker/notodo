'use client';

import React, { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from "react-dom";
import * as actions from "@/actions";
import { FaTrash } from "react-icons/fa";

interface DeleteAchievementButtonProps {
  achievementId: string;
}

export default function DeleteAchievementButton({ achievementId }: DeleteAchievementButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [formState, action] = useFormState(
    actions.deleteAchievement.bind(null, achievementId),
    { errors: {} }
  );
  
  // 當操作成功時重置確認狀態
  useEffect(() => {
    if (formState.success) {
      setShowConfirm(false);
    }
  }, [formState.success]);

  // 當 achievementId 變化時重置確認狀態
  useEffect(() => {
    setShowConfirm(false);
  }, [achievementId]);

  const handleClick = () => {
    setShowConfirm(true);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const handleConfirm = () => {
    action();
  };

  return (
    <div className="relative">
      {!showConfirm ? (
        <button
          onClick={handleClick}
          className="text-red-500 hover:text-red-700 transition duration-300 flex items-center"
          type="button"
        >
          <FaTrash className="mr-1" size={14} /> Delete
        </button>
      ) : (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-red-600">Confirm?</span>
          <SubmitButton onClick={handleConfirm} />
          <button
            onClick={handleCancel}
            className="text-gray-700 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-xs"
            type="button"
          >
            No
          </button>
        </div>
      )}
      
      {formState.errors?._form && (
        <div className="text-red-500 text-xs mt-1">
          {formState.errors._form.join(', ')}
        </div>
      )}
    </div>
  );
}

// 添加一個顯示加載狀態的按鈕組件
function SubmitButton({ onClick }: { onClick: () => void }) {
  const { pending } = useFormStatus();
  
  return (
    <button
      onClick={onClick}
      className={`text-white ${pending ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-700'} px-2 py-1 rounded text-xs`}
      type="button"
      disabled={pending}
    >
      {pending ? 'Deleting...' : 'Yes'}
    </button>
  );
}
