'use client';

import { formatTimeDifference } from "@/helpers/utils";
import { useEffect, useState } from "react";

interface TimeDifferenceProps {
  startTime: Date;
  endTime?: Date;
  showSkeleton?: boolean;
  skeletonClassName?: string;
}

export default function TimeDifference({
  startTime,
  endTime,
  showSkeleton = false,
  skeletonClassName = "h-6 w-20 bg-gray-200 rounded animate-pulse"
}: TimeDifferenceProps) {
  const [timeDifference, setTimeDifference] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const updateTimeDifference = () => {
      const end = endTime || new Date();
      setTimeDifference(formatTimeDifference(startTime, end));
      setIsLoading(false);
    };

    updateTimeDifference();
    const intervalId = setInterval(updateTimeDifference, 1000);

    return () => clearInterval(intervalId);
  }, [startTime, endTime]);

  if (isLoading && showSkeleton) {
    return <div className={skeletonClassName}></div>;
  }

  return <>{timeDifference}</>;
}
