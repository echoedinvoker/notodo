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
      <ThresholdCreateForm userId={userId} notodoId={notodoId} />
    </div>
  )
}
