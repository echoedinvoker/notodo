import { db } from "@/db";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import NotodoShowActions from "@/components/notodo/notodo-show-actions";
import { paths } from "@/paths";

interface NotodoShowPageProps {
  params: {
    notodoId: string;
    userId: string;
  };
}

export default async function NotodoShowPage({ params: { notodoId, userId } }: NotodoShowPageProps) {
  const notodo = await db.notodo.findFirst({
    where: { id: notodoId }
  });

  if (!notodo) {
    return <div>Notodo not found</div>
  }

  return <div className="flex flex-col gap-4 p-4">
    <Link href={paths.notodoListPage(userId)}>
      <h1 className="text-xl font-bold text-stone-700">{notodo.title}</h1>
    </Link>
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <div className="rounded-lg py-2 px-4 shadow hover:shadow-md transition duration-300 text-stone-700 bg-stone-50 mb-4">
          <Link href={paths.thresholdListPage(userId, notodoId)}>
            <Button>Thresholds</Button>
          </Link>
        </div>
        <div className="rounded-lg py-2 px-4 shadow hover:shadow-md transition duration-300 text-stone-700 bg-stone-50 mb-4">
          <Link href={paths.challengeListPage(userId, notodoId)}>
            <Button>Challenges</Button>
          </Link>
        </div>
      </div>
      <NotodoShowActions notodoId={notodoId} />
    </div>
  </div>
}

// export async function generateStaticParams() {
//   const notodos = await db.notodo.findMany({ include: { user: { select: { id: true } } } });
//   return notodos.map(notodo => ({
//     notodoId: notodo.id.toString(),
//     userId: notodo.user.id.toString()
//   }));
// }
