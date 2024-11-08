'use client';

import type { NotodoWithData } from "@/db/queries/notodos";
import { useEffect, useState } from "react";

interface TheScoreProps {
  notodo: NotodoWithData;
}

export default function TheScore({ notodo }: TheScoreProps) {
  const [isClient, setIsClient] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  console.log(notodo);


  useEffect(() => {
    setIsClient(true);

    if (!isClient) {
      return;
    }

    const updateCurrentTime = () => {
      return setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
    }

    const intervalId = updateCurrentTime();

    return () => clearInterval(intervalId);
  }, [isClient]);


  return (
    <div className="flex items-baseline">
      <span className="font-semibold text-xl">{isClient ? currentTime.getTime() : ''}</span>
      <span className="text-sm italic ml-1">+15/hr</span>
      <span className="text-sm ml-1">pts</span>
    </div>
  );
  }
