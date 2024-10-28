import { NotodoWithData } from "@/db/queries/notodos";
import { paths } from "@/paths";
import Link from "next/link";

interface NotodoListProps {
  fetchNotodos: () => Promise<NotodoWithData[]>;
  userId: string;
}

export default async function NotodoList({ fetchNotodos, userId }: NotodoListProps) {
  const notodos = await fetchNotodos();
  const now = new Date();

  const renderedNotodos = notodos.map((notodo) => {
    let completedThresholds = 0;
    let totalThresholds = notodo.thresholds?.length || 0;

    if (notodo.activeAt) {
      const activeAt = new Date(notodo.activeAt);
      const elapsedSeconds = (now.getTime() - activeAt.getTime()) / 1000;
      completedThresholds = notodo.thresholds?.filter(t => elapsedSeconds >= t.duration).length || 0;
    }

    return (
      <div key={notodo.id} className="rounded-lg py-2 px-4 shadow hover:shadow-md transition duration-300 text-stone-700 bg-stone-50">
        <Link href={paths.notodoShowPage(userId, notodo.id)}>
          <h3 className="text-lg font-semibold my-1">{notodo.title}</h3>
          {(notodo.activeAt || totalThresholds > 0) && (
            <div className="flex flex-row gap-4 text-xs text-stone-400">
              {notodo.activeAt && <p>{(Date.now() - notodo.activeAt.getTime()) / 1000}</p>}
              {totalThresholds > 0 && (
                <p>{completedThresholds}/{totalThresholds}</p>
              )}
            </div>)}
        </Link>
      </div>)
  })

  return (
    <div className="flex flex-col gap-2">
      {renderedNotodos}
    </div>
  )
}
