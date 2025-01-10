import { FormButton, TheScore } from "../common";
import TheHour from "../common/the-hour";
import ThresholdNext from "../threhold/threshold-next";
import { NotodoWithData } from "@/db/queries/notodos";
import { calculateNotodoScore } from "@/helpers/utils";
import * as actions from "@/actions"
import Link from "next/link";
import { paths } from "@/paths";

interface NotodoListItemInfoProps {
  notodo: NotodoWithData;
}

export default function NotodoListItemInfo({ notodo }: NotodoListItemInfoProps) {
  const { isOngoing, currentScore, currentWeight, nextThreshold } = calculateNotodoScore(notodo);

  const wrappedAction = async () => {
    "use server";
    await actions.startChallenge(notodo.id)
  }

  return (
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
              href={`${paths.editNotodoPage(notodo.user.id, notodo.id)}?enableWeight=true`}
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
  )
}
