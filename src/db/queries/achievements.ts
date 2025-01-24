import type {
  Achievement,
  Challenge,
  Notodo,
  Reward,
  Threshold,
} from "@prisma/client";
import { cache } from "react";
import { db } from "..";

type ActiveChallenge = Omit<Challenge, 'endTime'> & {
  endTime: null;
};

type NotodoWithActiveChallenge = Omit<Notodo, 'challenges'> & {
  challenges: ActiveChallenge[];
};

type ThresholdWithNotodo = Omit<Threshold, 'notodo'> & {
  notodo: NotodoWithActiveChallenge;
};

type AchievementThreshold = {
  threshold: ThresholdWithNotodo;
};

type AchievementReward = {
  reward: Reward;
};

type AchievementWithRelations = Omit<Achievement, 'thresholds' | 'rewards'> & {
  thresholds: AchievementThreshold[];
  rewards: AchievementReward[];
};

type ProcessedThreshold = {
  id: string;
  title: string;
  duration: number;
  challengeDuration: number;
  isAchieved: boolean;
};

type ProcessedAchievement = {
  id: string;
  name: string;
  description: string | null;
  pointsPerHour: number | null;
  thresholds: ProcessedThreshold[];
};

export const fetchAchievements = cache(async (userId: string): Promise<ProcessedAchievement[]> => {
  const achievements = await db.achievement.findMany({
    where: { userId },
    include: {
      thresholds: {
        include: {
          threshold: {
            include: {
              notodo: {
                include: {
                  challenges: {
                    where: {
                      endTime: null
                    }
                  }
                }
              },
            },
          },
        },
      },
    },
  });

  const now = new Date();

  return achievements.map(achievement => {
    const processedThresholds = achievement.thresholds.map(({ threshold }) => {
      const activeChallenge = threshold.notodo.challenges[0];
      let challengeDuration = 0;
      if (activeChallenge) {
        const startTime = new Date(activeChallenge.startTime);
        challengeDuration = Math.floor((now.getTime() - startTime.getTime()) / (1000 * 60 * 60)); // 轉換為小時
      }

      return {
        id: threshold.id,
        title: threshold.title,
        duration: threshold.duration,
        challengeDuration,
        isAchieved: challengeDuration >= threshold.duration
      };
    });

    return {
      id: achievement.id,
      name: achievement.name,
      description: achievement.description,
      pointsPerHour: achievement.pointsPerHour,
      thresholds: processedThresholds,
    };
  });
});
