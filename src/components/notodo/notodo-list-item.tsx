import { NotodoWithData } from "@/db/queries/notodos";
import { paths } from "@/paths";
import Link from "next/link";
import { TheScore } from "../common";
import TheHour from "../common/the-hour";
import ThresholdNext from "../threhold/threshold-next";
import { calculateNotodoScore } from "@/helpers/utils";
import { Divider } from "@nextui-org/react";

interface NotodoListItemProps {
  notodo: NotodoWithData;
}

export default function NotodoListItem({ notodo }: NotodoListItemProps) {
  const activeChallenge = notodo.challenges.find(challenge => !challenge.endTime);
  const { isOngoing, currentScore, currentWeight, nextThreshold } = calculateNotodoScore(notodo);


  return (
    <div className="rounded-lg py-2 px-4 shadow hover:shadow-md transition duration-300 text-stone-700 bg-stone-50 active:bg-stone-100">
      <div className="flex flex-col justify-start items-start">
        <Link
          className="hover:drop-shadow-md transition active:text-stone-500"
          href={paths.notodoShowPage(notodo.user.id, notodo.id)}>
          <h3 className="text-md font-semibold my-1">{notodo.title}</h3>
        </Link >
        <Divider />
        <div className="text-sm text-stone-500 flex flex-col items-start justify-start">
          {activeChallenge && isOngoing && (
            <>
              <TheHour notodo={notodo} />
              <TheScore totalScore={currentScore!} currentWeight={currentWeight!} />
              <ThresholdNext
                notodo={notodo}
                nextThreshold={nextThreshold}
              />
            </>
          )}
        </div>
      </div>
    </div >
  );
}
