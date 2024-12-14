import * as actions from "@/actions"
import { FormButton } from "@/components/common";
import { db } from "@/db";
import { NotodoWithData } from "@/db/queries/notodos";
import { calculateNotodoScore } from "@/helpers/utils";

interface EditNotodoPageProps {
  params: {
    userId: string;
    notodoId: string;
  },
}

export default async function EditNotodoPage({ params: { userId, notodoId } }: EditNotodoPageProps) {
  const user = await db.user.findFirst({
    where: { id: userId },
  });
  const notodo: NotodoWithData | null = await db.notodo.findFirst({
    where: { id: notodoId, },
    include: { user: true, thresholds: true, challenges: true },
  });

  if (!notodo) {
    return <div>Not found</div>;
  }

  const { totalScore } = calculateNotodoScore(notodo);

  return (
    <div className="py-12 flex flex-col gap-6 items-start justify-around">
      <div>{user?.score}</div>
      <p className="text-sm text-stone-600 text-center w-full">
        Already earned&nbsp;
        <span className="text-xl font-semibold text-stone-700">
          {totalScore}
        </span>
        &nbsp;points from this notodo.
      </p>
      <form action={actions.deleteNotodo.bind(null, notodoId)} className="w-full text-center">
        <FormButton className="uppercase font-semibold min-w-[300px] hover:bg-red-500 hover:text-white">
          Delete and remove effect
        </FormButton>
      </form>
      <form action={actions.deleteNotodoKeepPoint.bind(null, notodoId, totalScore, userId)} className="w-full text-center">
        <FormButton className="uppercase font-semibold min-w-[300px] hover:bg-red-500 hover:text-white">
          Delete and keep effect
        </FormButton>
      </form>
    </div>
  )
}
