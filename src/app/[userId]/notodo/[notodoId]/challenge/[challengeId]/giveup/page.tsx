import * as actions from "@/actions"
import { FormButton } from "@/components/common";
import { db } from "@/db";

interface GiveupPageProps {
  params: {
    notodoId: string;
    challengeId: string;
  },
}

export default async function GiveupPage({ params: { notodoId, challengeId } }: GiveupPageProps) {
  const challenge = await db.challenge.findFirst({
    where: {
      id: challengeId,
    },
  });

  if (!challenge) {
    return <div>Challenge not found</div>
  }

  const maintainedHours = Math.floor((new Date().getTime() - new Date(challenge.startTime).getTime()) / 1000 / 60 / 60);

  return (
    <div className="py-12 flex flex-col gap-6 items-start justify-around">
      <p className="text-sm text-stone-600 text-center w-full">
        Already keep&nbsp;
        <span className="text-xl font-semibold text-stone-700">
          {maintainedHours}
        </span>
        &nbsp;{maintainedHours > 1 ? 'hours' : 'hour'}.
      </p>
      <form action={actions.giveup.bind(null, notodoId)} className="w-full text-center">
        <FormButton className="uppercase font-semibold min-w-[300px] hover:bg-red-500 hover:text-white">
          Confirm Give Up
        </FormButton>
      </form>
    </div>
  )
}
