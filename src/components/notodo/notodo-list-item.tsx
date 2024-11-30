import { NotodoWithData } from "@/db/queries/notodos";
import { paths } from "@/paths";
import Link from "next/link";
import { TheScore } from "../common";
import NotodoListItemToggleDisplay from "./notodo-list-item-toggle-display";
import TheHour from "../common/the-hour";
import ThresholdNext from "../threhold/threshold-next";
import { calculateNotodoScore } from "@/helpers/utils";

interface NotodoListItemProps {
  notodo: NotodoWithData;
}

export default function NotodoListItem({ notodo }: NotodoListItemProps) {
  const activeChallenge = notodo.challenges.find(challenge => !challenge.endTime);
  const { isOngoing, currentScore, currentWeight, nextThreshold } = calculateNotodoScore(notodo);


  return (
    <div className="rounded-lg py-2 px-4 shadow hover:shadow-md transition duration-300 text-stone-700 bg-stone-50">
      <Link href={paths.notodoShowPage(notodo.user.id, notodo.id)}>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold my-1">{notodo.title}</h3>
          <div className="text-sm text-stone-500 flex items-center justify-end">
            {activeChallenge && isOngoing && (
              <>
                {
                  notodo.displayTimeAsScore
                    ? <div className="flex items-center gap-2">
                      <TheScore totalScore={currentScore!} currentWeight={currentWeight!} />
                      {nextThreshold && <ThresholdNext nextThreshold={nextThreshold} />}
                    </div>
                    : <TheHour notodo={notodo} />
                }
              </>
            )}
            {typeof notodo.weight === 'number' && activeChallenge && (
              <NotodoListItemToggleDisplay notodo={notodo} />
            )}
          </div>
        </div>
      </Link >
    </div >
  );
}
