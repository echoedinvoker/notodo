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
    <div className="space-y-3 text-sm text-gray-600">
      {isOngoing ? (
        <>
          <TheHour notodo={notodo} />
          {currentWeight ? (
            <>
              <TheScore totalScore={currentScore!} currentWeight={currentWeight!} />
              <ThresholdNext notodo={notodo} nextThreshold={nextThreshold} />
            </>
          ) : (
            <Link
              href={`${paths.editNotodoPage(notodo.user.id, notodo.id)}?enableWeight=true`}
              className="block text-center py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
              prefetch
            >
              Enable Scoring
            </Link>
          )}
        </>
      ) : (
        <form action={wrappedAction} className="mt-4">
          <FormButton className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
            Start New Challenge
          </FormButton>
        </form>
      )}
    </div>
  )
}
