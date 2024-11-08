import { NotodoWithData } from "@/db/queries/notodos";
import { paths } from "@/paths";
import Link from "next/link";
import { TheScore, TimeDifference } from "../common";
import NotodoListItemToggleDisplay from "./notodo-list-item-toggle-display";
import TheHour from "../common/the-hour";

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
        <div className="text-sm text-stone-500 flex items-center justify-end">
          {activeChallenge && (
            <Link href={paths.challengeShowPage(userId, notodo.id, activeChallenge.id)}>
              {
                notodo.displayTimeAsScore
                  ? <TheScore notodo={notodo} />
                  : <TheHour notodo={notodo} />
              }
            </Link>
          )}
          {typeof notodo.weight === 'number' && (
            <NotodoListItemToggleDisplay notodo={notodo} />
          )}
        </div>
      </div>
    </div >
  );
}
