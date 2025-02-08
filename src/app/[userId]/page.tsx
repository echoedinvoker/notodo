import { db } from "@/db";

type Event = {
  date: Date;
  type: "challenge-start" | "challenge-end" | "threshold-reached";
  id: string;
  weightChange: number;
};
type PointHistoryItem = {
  date: string;
  pointsPerHour: number;
  events: Array<{ type: string; id: string }>;
};

interface PrivateHomeProps {
  params: {
    userId: string;
  };
}

export default async function PrivateHome({
  params: { userId },
}: PrivateHomeProps) {
  const history = await getPointHistory(userId);

  return (
    <div>
      <pre>{JSON.stringify(history, null, 2)}</pre>
    </div>
  );
}

async function getPointHistory(userId: string): Promise<PointHistoryItem[]> {
  const notodos = await db.notodo.findMany({
    where: {
      userId,
      weight: { not: null },
    },
    include: {
      challenges: true,
      thresholds: true,
    },
  });

  if (notodos.length === 0)  return [];

  return generatePointHistory(getEvents(notodos));
}


function getEvents(notodos: any[]): Event[] {
  let events: Event[] = [];
  const now = new Date();

  for (const notodo of notodos) {
    for (const challenge of notodo.challenges) {
      events.push({
        date: challenge.startTime,
        type: "challenge-start",
        id: challenge.id,
        weightChange: notodo.weight!,
      });

      let reachedWeights = [notodo.weight!];
      for (const threshold of notodo.thresholds) {
        const thresholdTime = new Date(
          challenge.startTime.getTime() + threshold.duration * 60 * 60 * 1000,
        );

        if (thresholdTime > (challenge.endTime || now)) {
          break;
        }

        events.push({
          date: thresholdTime,
          type: "threshold-reached",
          id: threshold.id,
          weightChange: threshold.weight - reachedWeights.at(-1)!,
        });

        reachedWeights.push(threshold.weight);
      }

      if (challenge.endTime) {
        events.push({
          date: challenge.endTime,
          type: "challenge-end",
          id: challenge.id,
          weightChange: -reachedWeights.at(-1)!,
        });
      }
    }
  }

  return events.sort((a, b) => a.date.getTime() - b.date.getTime());
}

function generatePointHistory(events: Event[]): PointHistoryItem[] {
  let pointHistory: PointHistoryItem[] = [];
  let currentPointsPerHour = 0;
  let currentDate: string | null = null;
  let currentEvents: Array<{ type: string; id: string }> = [];
  let currentWeightChange = 0;

  for (const event of events) {
    const eventDate = event.date.toISOString();

    if (eventDate !== currentDate) {
      if (currentDate !== null) {
        currentPointsPerHour += currentWeightChange;
        pointHistory.push({
          date: currentDate,
          pointsPerHour: currentPointsPerHour,
          events: currentEvents,
        });
      }
      currentDate = eventDate;
      currentEvents = [];
      currentWeightChange = 0;
    }
    currentEvents.push({ type: event.type, id: event.id });
    currentWeightChange += event.weightChange;
  }

  if (currentDate !== null) {
    currentPointsPerHour += currentWeightChange;
    pointHistory.push({
      date: currentDate,
      pointsPerHour: currentPointsPerHour,
      events: currentEvents,
    });
  }

  return pointHistory;
}
