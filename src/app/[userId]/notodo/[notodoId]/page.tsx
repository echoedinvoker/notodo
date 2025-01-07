import { db } from "@/db";
import { paths } from "@/paths";
import Link from "next/link";

interface NotodoShowPageProps {
  params: {
    userId: string;
    notodoId: string;
  };
}

export default async function NotodoShowPage({ params: { userId, notodoId } }: NotodoShowPageProps) {
  const notodo = await db.notodo.findFirst({
    where: { id: notodoId },
    include: {
      challenges: true
    },
  });

  if (!notodo) {
    return <div>Notodo not found</div>
  }

  const currentChallenge = notodo.challenges.find(challenge => !challenge.endTime)

  return (
    <div>
      {notodo.weight !== null
        ? <div>Initial points per hours: {notodo.weight}</div>
        : <div>Notodo is not weighted</div>}
      <div className="flex items-center gap-3">
        <span>
          Current status:
        </span>
        {currentChallenge
          ? <div className="w-5 h-5 rounded-full bg-green-500 animate-pulse"></div>
          : <div className="w-5 h-5 rounded-full bg-gray-500"></div>}
      </div>
      <div>
        <div>Notodo notes:</div>
        <p>{notodo.content}</p>
      </div>
      <div>
        <Link href={paths.editNotodoPage(userId, notodoId)}>Edit</Link>
        <Link href={paths.deleteNotodoPage(userId, notodoId)}>Delete</Link>
      </div>
    </div>
  )
}
