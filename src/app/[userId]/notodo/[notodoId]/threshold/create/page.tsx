import ThresholdCreateForm from "@/components/threhold/threshold-create-form";

interface ThresholdCreatePageProps {
  params: {
    userId: string;
    notodoId: string;
  }
}

export default function ThresholdCreatePage({ params: { userId, notodoId } }: ThresholdCreatePageProps) {
  return (
    <div className="p-4">
      {/* TODO: Really need some hints of all thresholds' weights when creating new theshold */}
      <ThresholdCreateForm userId={userId} notodoId={notodoId} />
    </div>
  )
}
