import ThresholdForm from "@/components/threhold/threshold-form";
import { db } from "@/db";
import { Button } from "@nextui-org/react";
import { notFound } from "next/navigation";

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
      <h1 className="text-xl font-bold">Threshold Form</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <ThresholdForm
            actionType="edit"
            notodoId={notodoId}
            userId={userId}
            thresholdId={thresholdId}
            initialData={{
              title: threshold.title,
              content: threshold.content,
              duration: threshold.duration.toString(),
            }}
          />
        </div>
        <div className="border rounded p-4">
          <div className="flex flex-col m-2">
            <Button color="primary">Test</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// export async function generateStaticParams() {
//   const thresholds = await db.threshold.findMany({
//     include: {
//       notodo: {
//         select: {
//           id: true,
//           user: {
//             select: {
//               id: true
//             }
//           }
//         }
//       }
//     }
//   });
//   return thresholds.map(threshold => ({
//     notodoId: threshold.notodo.id.toString(),
//     thresholdId: threshold.id.toString(),
//     userId: threshold.notodo.user.id.toString()
//   }));
// }
//
