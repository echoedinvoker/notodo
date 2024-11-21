import type { NotodoWithData } from "@/db/queries/notodos";

export function formatTimeDifference(start: Date, end: Date): string {
  const diff = Math.abs(end.getTime() - start.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const parts: string[] = [];

  if (days > 0) {
    parts.push(`${days} ${days === 1 ? 'day' : 'days'}`);
  }
  if (hours > 0) {
    parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);
  }
  if (seconds > 0 || parts.length === 0) {
    parts.push(`${seconds} ${seconds === 1 ? 'second' : 'seconds'}`);
  }

  return parts.join(' ');
}

export function formatDigitalClock(start: Date, end: Date): string {
  const diff = Math.abs(end.getTime() - start.getTime());
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

interface NotodosResult {
  totalScore: number;
  totalWeight: number;
}

export function getNotodosResult(notodos: NotodoWithData[]): NotodosResult {
  const result = notodos.reduce((acc, notodo) => {
    const {
      totalScore,
      currentWeight
    } = calculateNotodoScore(notodo);

    return {
      totalScore: acc.totalScore + totalScore,
      totalWeight: acc.totalWeight + (currentWeight || 0)
    };
  }, {
    totalScore: 0,
    totalWeight: 0
  });

  return result
}

interface ScoreResult {
  isOngoing: boolean;
  totalScore: number;
  currentScore: number | null;
  currentWeight: number | null;
  nextThreshold?: {
    hours: number;
    weight: number;
  };
}

export function calculateNotodoScore(notodo: NotodoWithData): ScoreResult {
  let totalScore = 0;
  let currentScore: number | null = null;
  let currentWeight: number | null = null;
  let currentThresholdIndex = -1;
  let totalDurationHours = 0;
  let isOngoing = false;

  const orderedThresholds = notodo.thresholds.sort((a, b) => a.duration - b.duration);
  const orderedThresholdHours = orderedThresholds.map((threshold) => threshold.duration);
  const orderedWeights = [notodo.weight!, ...orderedThresholds.map((threshold) => threshold.weight)];

  for (const challenge of notodo.challenges) {
    const {
      challengeScore,
      currentWeight: challengeWeight,
      currentThresholdIndex: newIndex,
      durationHours,
      isOngoing: challengeIsOngoing,
    } = calculateChallengeScore(challenge, orderedThresholdHours, orderedWeights);

    if (challengeIsOngoing) {
      currentScore = challengeScore;
      currentWeight = challengeWeight;
    }

    totalScore += challengeScore;
    currentThresholdIndex = newIndex;
    totalDurationHours += durationHours;
    isOngoing = isOngoing || challengeIsOngoing;
  }

  return {
    isOngoing,
    totalScore: Math.floor(totalScore),
    currentScore: currentScore !== null ? Math.floor(currentScore) : null,
    currentWeight,
    nextThreshold: getNextThreshold({
      currentThresholdIndex,
      orderedThresholdHours,
      orderedWeights,
      totalDurationHours,
    }),
  };
}

interface ChallengeScoreResult {
  challengeScore: number;
  currentWeight: number | null;
  currentThresholdIndex: number;
  durationHours: number;
  isOngoing: boolean;
}

function calculateChallengeScore(
  challenge: NotodoWithData['challenges'][number],
  orderedThresholdHours: number[],
  orderedWeights: number[]
): ChallengeScoreResult {

  const durationHours = calculateDurationHours(challenge.startTime, challenge.endTime);

  let remainingHours = durationHours;
  let challengeScore = 0;
  let currentWeight: number | null = orderedWeights[0];
  let currentThresholdIndex = -1;

  for (let i = 0; i <= orderedThresholdHours.length; i++) {
    const currentThresholdHour = orderedThresholdHours[i] || Infinity;
    const previousThresholdHour = i > 0 ? orderedThresholdHours[i - 1] : 0;
    const weight = orderedWeights[i];

    const { score, hoursUsed } = calculateScoreForThreshold(
      remainingHours,
      previousThresholdHour,
      currentThresholdHour,
      weight
    );

    challengeScore += score;
    remainingHours -= hoursUsed;
    currentWeight = weight;

    if (remainingHours <= 0) {
      currentThresholdIndex = i - 1;
      break;
    }
  }

  const isOngoing = !challenge.endTime;

  return {
    challengeScore,
    currentWeight: isOngoing ? currentWeight : null,
    currentThresholdIndex,
    durationHours,
    isOngoing,
  };
}

export function calculateDurationHours(startTime: Date, endTime: Date | null): number {
  const end = endTime || new Date();
  return Math.floor((end.getTime() - startTime.getTime()) / (1000 * 60 * 60));
}

function calculateScoreForThreshold(
  remainingHours: number,
  thresholdStart: number,
  thresholdEnd: number,
  weight: number
): { score: number; hoursUsed: number } {
  const hoursInThisRange = Math.min(
    remainingHours,
    thresholdEnd - thresholdStart
  );
  const score = hoursInThisRange * weight;
  return { score, hoursUsed: hoursInThisRange };
}

interface GetNextThresholdArgs {
  currentThresholdIndex: number;
  orderedThresholdHours: number[];
  orderedWeights: number[];
  totalDurationHours: number;
}

function getNextThreshold({
  currentThresholdIndex,
  orderedThresholdHours,
  orderedWeights,
  totalDurationHours
}: GetNextThresholdArgs): { hours: number; weight: number; } | undefined {
  if (currentThresholdIndex < orderedThresholdHours.length - 1) {
    return {
      hours: orderedThresholdHours[currentThresholdIndex + 1] - totalDurationHours,
      weight: orderedWeights[currentThresholdIndex + 2],
    };
  }
}
