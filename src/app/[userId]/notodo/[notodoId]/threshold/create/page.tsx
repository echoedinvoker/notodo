import ThresholdCreateForm from "@/components/threhold/threshold-create-form";

interface ThresholdCreatePageProps {
  params: {
    userId: string;
    notodoId: string;
  }
}

export default function ThresholdCreatePage({ params: { userId, notodoId } }: ThresholdCreatePageProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg m-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Threshold</h1>
      <ThresholdCreateForm userId={userId} notodoId={notodoId} />
    </div>
  )
}
