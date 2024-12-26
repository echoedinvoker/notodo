import { fetchThresholds } from "@/db/queries/thresholds";
import { Suspense } from "react";
import ThresholdList from "@/components/threhold/threshold-list";
import ThresholdListActions from "@/components/threhold/threshold-list-actions";
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
    <div className="flex flex-col gap-4 p-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4 sm:col-span-3">
          <Suspense fallback={<ThresholdListLoading />}>
            <ThresholdList fetchThresholds={() => fetchThresholds(notodoId)} userId={userId} notodoId={notodoId} />
          </Suspense>
        </div>
        {/* TODO: refactor ThresholdListActions */}
        <ThresholdListActions userId={userId} notodoId={notodoId} />
      </div>
    </div>
  )
}
