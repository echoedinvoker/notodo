import ChallengeShowActions from "@/components/challenge/challenge-show-actions";
import { TimeDifference } from "@/components/common";
import { db } from "@/db";
import { paths } from "@/paths";
import Link from "next/link";
import { Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({ subsets: ['latin'] });

interface ChallengeShowPageProps {
  params: {
    userId: string;
    notodoId: string;
    challengeId: string;
  }
}

export default async function ChallengeShowPage({ params: { userId, notodoId, challengeId } }: ChallengeShowPageProps) {
  const challenge = await db.challenge.findFirst({
    where: { id: challengeId },
    include: {
      notodo: true,
      challengeNotes: true
    }
  });

  if (!challenge) return <div>Challenge not found</div>;

  return (
    <div className="flex flex-col gap-4 p-4">
      <Link href={paths.notodoListPage(userId)}>
        <h1 className="text-xl font-bold text-stone-700">
          {challenge.notodo.title}
        </h1>
      </Link>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <TimeDifference
            startTime={new Date(challenge.startTime)}
            endTime={challenge.endTime ? new Date(challenge.endTime) : undefined}
            formatType="digital"
            className={`text-6xl font-bold ${robotoMono.className} bg-black text-green-500 p-4 rounded-lg shadow-lg inline-block`}
          />
          <div className="col-span-3">
            {challenge.challengeNotes.map(note => (
              <div key={note.id} className="rounded-lg py-2 px-4 shadow hover:shadow-md transition duration-300 text-stone-700 bg-stone-50">
                {note.content}
              </div>
            ))}
          </div>
        </div>
        <ChallengeShowActions notodoId={notodoId} />
      </div>
    </div>
  )
}
