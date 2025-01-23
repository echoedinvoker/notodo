import type { Threshold } from "@prisma/client";
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
  duration: number;
  dotType?: string;
}

const EmptyDot = () => (
  <div className="flex flex-none items-center justify-center h-3 w-3 bg-stone-300 rounded-full opacity-0"></div>
);

const DotLineUp = () => (
  <div className="flex flex-none items-center justify-center h-3 w-3 bg-stone-300 rounded-full after:contents-[''] after:bg-stone-300 after:w-1 after:h-14 after:-translate-y-6"></div>
);

const DotLineDown = () => (
  <div className="flex flex-none items-center justify-center h-3 w-3 bg-stone-300 rounded-full after:contents-[''] after:bg-stone-300 after:w-1 after:h-14 after:translate-y-6"></div>
);

const EndDot = () => (
  <div className="flex flex-none items-center justify-center h-3 w-3 bg-stone-500 rounded-full animate-pulse z-10"></div>
);


export default async function ThresholdList({ fetchThresholds, notodoId, userId }: ThresholdListProps) {
  const thresholds = await fetchThresholds();
  const notodo = await db.notodo.findUnique({ where: { id: notodoId } });
  const currentChallenge = await db.challenge.findFirst({
    where: {
      notodoId,
      endTime: null
    }
  });

  const currentDuration = currentChallenge ? Math.floor((new Date().getTime() - currentChallenge.startTime.getTime()) / 1000 / 60 / 60) : 0;

  if (!notodo) {
    return (
      <div className="flex items-center justify-center px-8 py-16 text-gray-400">
        Notodo not found.
      </div>
    )
  }

  if (thresholds.length === 0) {
    return (
      <div className="flex items-center justify-center px-8 py-16 text-gray-400">
        <Link
          className="text-blue-500 hover:text-blue-700 transition duration-300 text-lg"
          href={paths.createThresholdPage(userId, notodoId)}>
          No threshold found. Create one?
        </Link>
      </div>
    )
  }

  const mixedList: ListItem[] = [
    { isThreshold: false, id: notodo.id, title: notodo.title, content: notodo.content, weight: notodo.weight, duration: 0 },
    ...thresholds.map((threshold) => ({ isThreshold: true, id: threshold.id, title: threshold.title, content: threshold.content, weight: threshold.weight, duration: threshold.duration }))
  ];

  const sortedList = notodo.weight ? mixedList.sort((a, b) => (b.duration || 0) - (a.duration || 0)) : mixedList;

  // TODO: refactor to somewhere else
  const listWithDotTypes: ListItem[] = sortedList.map((item, index) => {
    const nextItem = sortedList[index + 1];
    const prevItem = sortedList[index - 1];

    const isFirstItem = index === 0;
    const isLastItem = index === sortedList.length - 1;

    if (currentDuration === 0) {
      if (!item.isThreshold) return { ...item, dotType: 'end' };
      return { ...item, dotType: 'empty' };
    }

    if (currentDuration > 0) {
      if (item.duration > currentDuration) return { ...item, dotType: 'empty' };
      if (prevItem && prevItem.duration > currentDuration) return { ...item, dotType: 'end' };
      if (item.duration >= 0) {
        if (isFirstItem) return { ...item, dotType: 'end' }; // TODO: maybe add a create plus button above in this senario
        return { ...item, dotType: 'up' };
      }
      return { ...item, dotType: 'empty' };
    }

    if (currentDuration < 0) {
      if (item.duration < currentDuration) return { ...item, dotType: 'empty' };
      if (nextItem && nextItem.duration < currentDuration) return { ...item, dotType: 'end' };
      if (item.duration <= 0) {
        if (isLastItem) return { ...item, dotType: 'end' }; // TODO: maybe add a create plus button below in this senario
        return { ...item, dotType: 'down' };
      }
      return { ...item, dotType: 'empty' };
    }

    return item;
  });

  // TODO: align to center when small screen?
  return (
    <div className="space-y-6">
      {listWithDotTypes.map((item) => {
        // TODO: do some refactor here, codes are too complex already
        const renderDot = (dotType: string = '') => {
          switch (dotType) {
            case 'empty':
              return <EmptyDot />;
            case 'up':
              return <DotLineUp />;
            case 'down':
              return <DotLineDown />;
            case 'end':
              return <EndDot />;
            default:
              return <div>Err</div>
          }
        };
        return (
          <div className="flex items-center justify-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition duration-200" key={item.id}>
            <Link href={item.isThreshold ? paths.editThresholdPage(userId, notodoId, item.id) : paths.editNotodoPage(userId, notodoId)} prefetch>
              <div className={`flex items-center justify-center h-8 w-8 ${item.isThreshold ? 'bg-gray-100' : 'bg-gray-300'} text-md font-semibold rounded-full shadow-sm hover:shadow-md active:shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition duration-200`}>
                {item.weight}
              </div>
            </Link>

            {renderDot(item.dotType)}

            <div className="flex-grow">
              {item.isThreshold ? (
                <Link href={paths.threadShowPage(userId, notodoId, item.id)} className="group" prefetch>
                  <h3 className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition duration-200">{item.title}</h3>
                  <div className="border-t-2 border-blue-300 opacity-0 group-hover:opacity-100 transition duration-200"></div>
                </Link>
              ) : (
                <Link href={paths.notodoShowPage(userId, notodoId)} className="group" prefetch>
                  <h3 className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition duration-200">{item.title}</h3>
                  <div className="border-t-2 border-blue-300 opacity-0 group-hover:opacity-100 transition duration-200"></div>
                </Link>
              )}
              <p className="text-sm text-gray-500 mt-1">{item.content}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
