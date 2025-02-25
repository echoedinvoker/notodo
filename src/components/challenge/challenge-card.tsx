import Link from "next/link";
import { Challenge } from "@prisma/client";
import { paths } from "@/paths";
import { StatusBadge } from "../common/status-badge";
import { formatDistanceToNow, format, formatDistance } from "date-fns";

interface ChallengeCardProps {
  challenge: Challenge;
  userId: string;
  notodoId: string;
}

export default function ChallengeCard({ 
  challenge, 
  userId, 
  notodoId 
}: ChallengeCardProps) {
  const startTime = new Date(challenge.startTime);
  const endTime = challenge.endTime ? new Date(challenge.endTime) : null;
  const isActive = !endTime || endTime > new Date();
  
  const formatTimeDisplay = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const formatEndTime = (date: Date) => {
    return format(date, "MMM d, yyyy 'at' h:mm a");
  };

  const duration = endTime 
    ? formatDistance(startTime, endTime)
    : formatDistanceToNow(startTime);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 relative">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold text-gray-800">Challenge #{challenge.id.slice(-4)}</h2>
        <StatusBadge isAchieved={!isActive} />
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-700">
          Started: <span className="font-semibold">{formatTimeDisplay(startTime)}</span>
        </p>
        {endTime && (
          <p className="text-sm text-gray-700 mt-1">
            Ended: <span className="font-semibold">{formatEndTime(endTime)}</span>
          </p>
        )}
        <p className="text-sm text-gray-700 mt-1">
          Duration: <span className="font-semibold">{duration}</span>
        </p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <Link
          href={paths.challengeShowPage(userId, notodoId, challenge.id)}
          className="text-sm text-blue-500 hover:text-blue-700 transition duration-300"
        >
          View Notes
        </Link>
        
        {isActive && (
          <Link
            href={paths.notodoShowPage(userId, notodoId)}
            className="text-sm text-blue-500 hover:text-blue-700 transition duration-300"
          >
            End Challenge
          </Link>
        )}
      </div>
    </div>
  );
}
