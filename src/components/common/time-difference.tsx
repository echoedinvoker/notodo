'use client';

import { formatTimeDifference, formatDigitalClock } from "@/helpers/utils";
import { useEffect, useState } from "react";

interface TimeDifferenceProps {
  startTime: Date;
  endTime?: Date;
  showSkeleton?: boolean;
  skeletonClassName?: string;
  formatType?: 'default' | 'digital';
  className?: string;
}

export default function TimeDifference({
  startTime,
  endTime,
  showSkeleton = false,
  skeletonClassName = "h-6 w-20 bg-gray-200 rounded animate-pulse",
  formatType = 'default',
  className = ''
}: TimeDifferenceProps) {
  const [timeDifference, setTimeDifference] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const updateTimeDifference = () => {
      const end = endTime || new Date();
      const formatFunction = formatType === 'digital' ? formatDigitalClock : formatTimeDifference;
      setTimeDifference(formatFunction(startTime, end));
    };

    updateTimeDifference();
    const intervalId = setInterval(updateTimeDifference, 1000);

    return () => clearInterval(intervalId);
  }, [startTime, endTime, formatType]);

  if (!isClient) {
    return showSkeleton ? <div className={skeletonClassName}></div> : null;
  }

  return <div className={className}>{timeDifference}</div>;
}
