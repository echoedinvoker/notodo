'use client';

import { FaCoins } from "react-icons/fa";
import FormButton from "./form-button";
import { useState } from "react";

interface ConsumePointsProps {
  totalScore: number;
  totalWeight: number;
}

export default function ConsumePoints({ totalScore, totalWeight }: ConsumePointsProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <form>
      <FormButton
        variant={isHovered ? "warning" : "light"}
        startContent={<div><FaCoins size="10" /></div>}
        className="w-full flex items-center justify-start text-stone-700 hover:text-white hover:font-bold"
        size="sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? (
          <span className="font-bold text-sm text-stone-50">CONSUME POINTS</span>
        ) : (
          <>
            <span className="font-bold text-lg mr-1 text-blue-600">{totalScore}</span>
            <span className="text-sm">pts</span>
            <span className="border border-stone-300 rounded-full py-0.5 px-1 text-xs italic pr-2">+{totalWeight}/hr</span>
          </>
        )}
      </FormButton>
    </form>
  )
}
