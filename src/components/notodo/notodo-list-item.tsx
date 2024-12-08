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
  [key: string]: any;
}

export default function NotodoListItem({ notodo, ...props }: NotodoListItemProps) {
  const { isOngoing, currentScore, currentWeight, nextThreshold } = calculateNotodoScore(notodo);

  const wrappedAction = async () => {
    "use server";
    await actions.startChallenge(notodo.id)
  }

  return (
    <div className="rounded-lg py-3 px-5 shadow hover:shadow-md transition duration-300 text-stone-700 bg-stone-50 active:bg-stone-100" {...props}>
      <div className="h-full flex flex-col justify-start items-start">
        <Link
          className="hover:drop-shadow-md transition active:text-stone-500"
          href={paths.notodoShowPage(notodo.user.id, notodo.id)}>
          <h3 className="text-md font-semibold my-1">{notodo.title}</h3>
        </Link >
        <Divider className="my-1" />
        <div className="w-full min-h-24 text-sm text-stone-500 flex flex-col items-start justify-start gap-1">
          {isOngoing ? (
            <>
              <TheHour notodo={notodo} />
              {currentWeight ? (
                <>
                  <TheScore totalScore={currentScore!} currentWeight={currentWeight!} />
                  <ThresholdNext
                    notodo={notodo}
                    nextThreshold={nextThreshold}
                  />
                </>
              ) : (
                <Link
                  href={paths.editNotodoPage(notodo.user.id, notodo.id)}
                  className="flex-1 w-full flex justify-center items-center bg-opacity-0 hover:drop-shadow-md active:drop-shadow-none transition duration-250 p-2 text-stone-300 hover:text-stone-400 uppercase rounded-md font-mono font-semibold"
                  prefetch
                >
                  No score yet, enable it?
                </Link>
              )}
              
            </>
          ) : (
            <form action={wrappedAction} className="w-full h-20 flex justify-center items-center">
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
