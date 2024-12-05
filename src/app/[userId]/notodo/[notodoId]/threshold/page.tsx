import { db } from "@/db";
import { fetchThresholds } from "@/db/queries/thresholds";
import ThresholdList from "@/components/threhold/threshold-list";
import ThresholdListActions from "@/components/threhold/threshold-list-actions";

interface ThresholdListPageProps {
  params: {
    notodoId: string;
    userId: string;
  };
}

export default async function ThresholdListPage({ params: { notodoId, userId } }: ThresholdListPageProps) {
  const thresholds = await fetchThresholds(notodoId);

  return <div>
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <ThresholdList fetchThresholds={() => fetchThresholds(notodoId)} notodoId={notodoId} userId={userId} />
      </div>
      {/* TODO: Implement Threshold list actions */}
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
