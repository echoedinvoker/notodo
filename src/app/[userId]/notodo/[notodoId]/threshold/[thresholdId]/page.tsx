import ThresholdForm from "@/components/threhold/threshold-form";
import { db } from "@/db";
import { Link } from "@nextui-org/react";
import { notFound } from "next/navigation";
import { paths } from "@/paths";
import ThresholdDeleteForm from "@/components/threhold/threshold-delete-form";

interface ThresholdShowPageProps {
  params: {
    notodoId: string;
    thresholdId: string;
    userId: string;
  };
}

export default async function ThresholdShowPage({ params: { notodoId, thresholdId, userId } }: ThresholdShowPageProps) {
  const threshold = await db.threshold.findUnique({
    where: { id: thresholdId }
  });

  if (!threshold) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <Link href={paths.notodoShowPage(userId, notodoId)}>
        <h1 className="text-xl font-bold text-stone-700">{threshold.title}</h1>
      </Link>
      <div className="mx-auto shadow bg-stone-50 p-2">
        <ThresholdForm
          actionType="edit"
          notodoId={notodoId}
          userId={userId}
          thresholdId={thresholdId}
          initialData={{
            title: threshold.title,
            content: threshold.content,
            duration: threshold.duration.toString(),
            weight: threshold.weight.toString()
          }}
        />
        <ThresholdDeleteForm notodoId={notodoId} thresholdId={thresholdId} />
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const thresholds = await db.threshold.findMany({
    include: {
      notodo: {
        select: {
          id: true,
          user: {
            select: {
              id: true
            }
          }
        }
      }
    }
  });
  return thresholds.map(threshold => ({
    notodoId: threshold.notodo.id.toString(),
    thresholdId: threshold.id.toString(),
    userId: threshold.notodo.user.id.toString()
  }));
}

