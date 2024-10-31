import { NotodoWithData } from "@/db/queries/notodos";
import { paths } from "@/paths";
import Link from "next/link";
import { TimeDifference } from "../common";

interface NotodoListItemProps {
  notodo: NotodoWithData;
  userId: string;
}

export default function NotodoListItem({ notodo, userId }: NotodoListItemProps) {
  const activeChallenge = notodo.challenges.find(challenge => !challenge.endTime);

  return (
    <div className="rounded-lg py-2 px-4 shadow hover:shadow-md transition duration-300 text-stone-700 bg-stone-50">
      <div className="flex justify-between items-center">
        <Link href={paths.notodoShowPage(userId, notodo.id)}>
          <h3 className="text-lg font-semibold my-1">{notodo.title}</h3>
        </Link >
        <div className="text-sm text-stone-500">
          {activeChallenge && (
            <Link href={paths.challengeShowPage(userId, notodo.id, activeChallenge.id)}>
              <TimeDifference
                startTime={new Date(activeChallenge.startTime)}
              />
            </Link>
          )}
        </div>
      </div>
    </div >
  );
}
