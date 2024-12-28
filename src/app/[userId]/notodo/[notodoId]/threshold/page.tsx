import { fetchThresholds } from "@/db/queries/thresholds";
import { Suspense } from "react";
import ThresholdList from "@/components/threhold/threshold-list";
import ThresholdListLoading from "@/components/threhold/threshold-list-loading";

interface ThresholdListPageProps {
  params: {
    notodoId: string;
    userId: string;
  };
}

// TODO: maybe merge this with edit/create page
export default async function ThresholdListPage({ params: { notodoId, userId } }: ThresholdListPageProps) {

  return (
    <div className="col gap-4 p-4">
      <Suspense fallback={<ThresholdListLoading />}>
        <ThresholdList fetchThresholds={() => fetchThresholds(notodoId)} userId={userId} notodoId={notodoId} />
      </Suspense>
    </div>
  )
}
