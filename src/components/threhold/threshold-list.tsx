import type { Notodo, Threshold } from "@prisma/client";
import Link from "next/link";
import { paths } from "@/paths";
import { db } from "@/db";

interface ThresholdListProps {
  fetchThresholds: () => Promise<Threshold[]>;
  notodoId: string;
  userId: string;
}

interface ListItem {
  isThreshold: boolean;
  id: string;
  title: string;
  content: string;
  weight: number | null;
  duration?: number;
}

export default async function ThresholdList({ fetchThresholds, notodoId, userId }: ThresholdListProps) {
  const thresholds = await fetchThresholds();
  const notodo = await db.notodo.findUnique({ where: { id: notodoId } });

  if (!notodo) {
    return (
      <div className="flex items-center justify-center px-8 py-16 text-stone-400">
        Notodo not found.
      </div>
    )
  }

  if (thresholds.length === 0) {
    return (
      <div className="flex items-center justify-center px-8 py-16 text-stone-400">
        <Link
          className="hover:drop-shadow-md active:text-stone-300 transition text-lg"
          href={paths.createThresholdPage(userId, notodoId)}>
          No threshold found. Create one?
        </Link>
      </div>
    )
  }

  const mixedList: ListItem[] = [
    { isThreshold: false, id: notodo.id, title: notodo.title, content: notodo.content, weight: notodo.weight },
    ...thresholds.map((threshold) => ({ isThreshold: true, id: threshold.id, title: threshold.title, content: threshold.content, weight: threshold.weight, duration: threshold.duration }))
  ];

  const sortedList = notodo.weight ? mixedList.sort((a, b) => (b.weight || 0) - (a.weight || 0)) : mixedList;


  // TODO: indicate to the current threshold and done/not done
  return (
    <div className="flex flex-col gap-6">
      {sortedList.map((item) => (
        // TODO: align to center when small screen?
        <div className="flex items-center justify-start gap-3" key={item.id}>
          <Link href={item.isThreshold ? paths.editThresholdPage(userId, notodoId, item.id) : paths.editNotodoPage(userId, notodoId)} prefetch>
            <div className={`flex items-center justify-center h-8 w-8 ${item.isThreshold ? 'bg-stone-50' : 'bg-stone-300'} text-md font-semibold rounded-full shadow-sm hover:shadow-lg active:shadow-md hover:-translate-y-0.5 active:-translate-y-0 duration-200`}>
              {item.weight}
            </div>
          </Link>
          {/* TODO: do some refactor here, codes are too complex already */}
          {item.isThreshold ? (
            <Link href={paths.threadShowPage(userId, notodoId, item.id)} className="group" prefetch>
              <h3 className="text-sm italic">{item.title}</h3>
              <div className="border-t-2 border-stone-300 opacity-0 group-hover:opacity-100 duration-200"></div>
            </Link>
          ) : (
            <Link href={paths.notodoShowPage(userId, notodoId)} className="group" prefetch>
              <h3 className="text-sm italic">{item.title}</h3>
              <div className="border-t-2 border-stone-300 opacity-0 group-hover:opacity-100 duration-200"></div>
            </Link>
          )}
          {/* TODO: add content in small text under title to make it more informative on the screen */}
        </div>
      ))}
    </div>
  )
}
