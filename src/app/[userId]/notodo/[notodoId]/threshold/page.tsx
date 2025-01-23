import { fetchThresholds } from "@/db/queries/thresholds";
import { Suspense } from "react";
import ThresholdList from "@/components/threhold/threshold-list";
import ThresholdListLoading from "@/components/threhold/threshold-list-loading";
import Link from "next/link";
import { paths } from "@/paths";

interface ThresholdListPageProps {
  params: {
    notodoId: string;
    userId: string;
  };
}

export default async function ThresholdListPage({ params: { notodoId, userId } }: ThresholdListPageProps) {

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg m-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Threshold List</h1>
        <Link
          href={paths.createThresholdPage(userId, notodoId)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Create Threshold
        </Link>
      </div>
      <Suspense fallback={<ThresholdListLoading />}>
        <ThresholdList fetchThresholds={() => fetchThresholds(notodoId)} userId={userId} notodoId={notodoId} />
      </Suspense>
    </div>
  )
}
