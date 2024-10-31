import { db } from "@/db";
import { fetchThresholds } from "@/db/queries/thresholds";
import ThresholdListbox from "@/components/threhold/threshold-list-actions";
import ThresholdList from "@/components/threhold/threshold-list";
import Link from "next/link";
import { paths } from "@/paths";
import ThresholdListActions from "@/components/threhold/threshold-list-actions";

interface ThresholdListPageProps {
  params: {
    notodoId: string;
    userId: string;
  };
}

export default async function ThresholdListPage({ params: { notodoId, userId } }: ThresholdListPageProps) {
  const thresholds = await fetchThresholds(notodoId);

  return <div className="flex flex-col gap-4 p-4">
    <Link href={paths.notodoShowPage(userId, notodoId)}>
      <h1 className="text-xl font-bold text-stone-700">Threshold List</h1>
    </Link>
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <ThresholdList fetchThresholds={() => fetchThresholds(notodoId)} notodoId={notodoId} userId={userId} />
      </div>
      <ThresholdListActions thresholds={thresholds} notodoId={notodoId} userId={userId} />
    </div>
  </div>
}

export async function generateStaticParams() {
  const notodos = await db.notodo.findMany({ include: { user: { select: { id: true } } } });
  return notodos.map(notodo => ({
    notodoId: notodo.id.toString(),
    userId: notodo.user.id.toString()
  }));
}
