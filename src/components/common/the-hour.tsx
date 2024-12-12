import type { NotodoWithData } from "@/db/queries/notodos";
import { FaClock } from "react-icons/fa";

interface TheHourProps {
  notodo: NotodoWithData;
}

export default function TheHour({ notodo }: TheHourProps) {
  const newestChallenge = notodo.challenges.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }).at(0);

  if (!newestChallenge) return null;

  const hours = Math.floor((new Date(newestChallenge.endTime || new Date()).getTime() - new Date(newestChallenge.startTime).getTime()) / 1000 / 60 / 60);

  return (
    <div className="flex gap-1 items-center justify-start">
      <FaClock className="w-4 h-4" />
      <div className="flex items-baseline text-sm">
        Challenge lasted for&nbsp;
        <span className="font-semibold text-xl">{hours}</span>
        &nbsp;{hours === 1 ? "hr" : "hrs"}
      </div>
    </div>
  );
}
