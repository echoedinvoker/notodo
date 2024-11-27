'use client';

import { FaCoins } from "react-icons/fa";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface ConsumePointsProps {
  userId: string;
  totalScore: number;
  totalWeight?: number;
}

export default function ConsumePoints({ userId, totalScore, totalWeight }: ConsumePointsProps) {
  const [isHovered, setIsHovered] = useState(false);
  const showPoints = !totalWeight || !isHovered;
  const router = useRouter()

  function handleClick() {
    router.push(`/${userId}/reward`)
  }

  return (
    <Button
      onClick={handleClick}
      variant={!showPoints ? "flat" : "light"}
      startContent={<div><FaCoins size="10" /></div>}
      className="w-full flex items-center justify-start text-stone-700 hover:text-white hover:font-bold"
      size="sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={!totalWeight}
    >
      {!showPoints ? (
        <span className="font-bold text-sm text-stone-50">CONSUME POINTS</span>
      ) : (
        <>
          <span className="font-bold text-lg mr-1 text-blue-600">{totalScore}</span>
          <span className="text-sm">pts</span>
          {totalWeight && <span className="border border-stone-300 rounded-full py-0.5 px-1 text-xs italic pr-2">+{totalWeight}/hr</span>}
        </>
      )}
    </Button>
  )
}
