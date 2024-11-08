import type { NotodoWithData } from "@/db/queries/notodos";

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
    <div className="flex items-baseline">
      <span className="font-semibold text-xl">{hours}</span>
      <span className="text-sm ml-1">
        {hours > 1 ? 'hours' : 'hour'}
      </span>
    </div>
  );
}
