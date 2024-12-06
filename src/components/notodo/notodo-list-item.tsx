import { NotodoWithData } from "@/db/queries/notodos";
import { paths } from "@/paths";
import Link from "next/link";
import { FormButton, TheScore } from "../common";
import TheHour from "../common/the-hour";
import ThresholdNext from "../threhold/threshold-next";
import { calculateNotodoScore } from "@/helpers/utils";
import { Divider } from "@nextui-org/react";
import * as actions from "@/actions"

interface NotodoListItemProps {
  notodo: NotodoWithData;
}

export default function NotodoListItem({ notodo }: NotodoListItemProps) {
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
        <div className="w-full text-sm text-stone-500 flex flex-col items-start justify-start">
          {isOngoing ? (
            <>
              <TheHour notodo={notodo} />
              <TheScore totalScore={currentScore!} currentWeight={currentWeight!} />
              <ThresholdNext
                notodo={notodo}
                nextThreshold={nextThreshold}
              />
            </>
          ) : (
            <form action={actions.startChallenge.bind(null, notodo.id)} className="w-full h-28 flex justify-center items-center">
              <FormButton className="w-full h-full bg-opacity-0 hover:drop-shadow-md active:drop-shadow-none transition duration-250 p-2 text-stone-400 uppercase rounded-md font-mono font-semibold">
                Start New Challenge!
              </FormButton>
            </form>
          )}

        </div>
      </div>
    </div >
  );
}
