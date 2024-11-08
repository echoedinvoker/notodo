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


export function calculateNotodoScore(notodo: NotodoWithData): number {
  let totalScore = 0;

  const orderedThresholds = notodo.thresholds.sort((a, b) => a.duration - b.duration);
  const orderedThresholdHours = orderedThresholds.map((threshold) => threshold.duration);
  const orderedWeights = [notodo.weight!, ...orderedThresholds.map((threshold) => threshold.weight)];


  for (const challenge of notodo.challenges) {
    const startTime = new Date(challenge.startTime);
    const endTime = challenge.endTime ? new Date(challenge.endTime) : new Date();

    const durationHours = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60));

    let remainingHours = durationHours;
    let challengeScore = 0;

    // Calculate the score for this challenge
    for (let i = 0; i <= orderedThresholdHours.length; i++) {
      const currentThresholdHour = orderedThresholdHours[i] || Infinity;
      const previousThresholdHour = i > 0 ? orderedThresholdHours[i - 1] : 0;
      const weight = orderedWeights[i];

      const hoursInThisRange = Math.min(
        remainingHours,
        currentThresholdHour - previousThresholdHour
      );

      if (hoursInThisRange > 0) {
        challengeScore += hoursInThisRange * weight;
        remainingHours -= hoursInThisRange;
      }

      if (remainingHours <= 0) break;
    }

    totalScore += challengeScore;
  }

  return totalScore;
}
