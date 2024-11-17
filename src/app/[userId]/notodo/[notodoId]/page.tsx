import { db } from "@/db";
import Link from "next/link";
import NotodoShowActions from "@/components/notodo/notodo-show-actions";
import { paths } from "@/paths";
import ThresholdInfo from "@/components/threhold/threshold-info";
import ChallengeInfo from "@/components/challenge/challenge-info";
import NotodoInfo from "@/components/notodo/notodo-info";

interface NotodoShowPageProps {
  params: {
    notodoId: string;
    userId: string;
  };
}

export default async function NotodoShowPage({ params: { notodoId, userId } }: NotodoShowPageProps) {
  const notodo = await db.notodo.findFirst({
    where: { id: notodoId }
  });
  if (!notodo) {
    return <div>Notodo not found</div>
  }

  return (
    <div>
      <Link href={paths.notodoListPage(userId)}>
        <h1 className="text-xl font-bold text-stone-700">{notodo.title}</h1>
      </Link>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <div className="flex flex-col gap-4 p-4">
            <NotodoInfo notodo={notodo} />
            <div className="flex flex-col md:flex-row md:gap-4">
              <ThresholdInfo userId={userId} notodoId={notodoId} />
              <ChallengeInfo userId={userId} notodoId={notodoId} />
            </div>
          </div>
        </div>
        <NotodoShowActions notodo={notodo} />
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const notodos = await db.notodo.findMany({ include: { user: { select: { id: true } } } });
  return notodos.map(notodo => ({
    notodoId: notodo.id.toString(),
    userId: notodo.user.id.toString()
  }));
}
