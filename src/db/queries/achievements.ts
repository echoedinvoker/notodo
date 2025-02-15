import { cache } from "react";
import { db } from "..";
import { Achievement, Threshold } from "@prisma/client";

export type ProcessedThreshold = {
  id: string;
  title: string;
  duration: number;
  challengeDuration: number | null;
  isAchieved: boolean;
  notodoId: string;
  notified: boolean;
};

export type ProcessedAchievement = {
  id: string;
  name: string;
  description: string | null;
  pointsPerHour: number | null;
  thresholds: ProcessedThreshold[];
  notified: boolean;
};

export const fetchRawAchievements = cache(async (userId: string) => {
  return db.achievement.findMany({
    where: { userId },
  });
});

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
      let challengeDuration: number | null = null;
      if (activeChallenge) {
        const startTime = new Date(activeChallenge.startTime);
        challengeDuration = Math.floor((now.getTime() - startTime.getTime()) / (1000 * 60 * 60)); // 轉換為小時
      }

      return {
        id: threshold.id,
        title: threshold.title,
        duration: threshold.duration,
        challengeDuration,
        isAchieved: challengeDuration !== null && challengeDuration >= threshold.duration,
        notodoId: threshold.notodo.id,
        notified: threshold.notified,
      };
    });

    return {
      id: achievement.id,
      name: achievement.name,
      description: achievement.description,
      pointsPerHour: achievement.pointsPerHour,
      thresholds: processedThresholds,
      notified: achievement.notified,
    };
  });
});

export const fetchAchievementDetails = cache(async (achievementId: string) => {
  const relatedRewardsPromise = db.reward.findMany({
    include: {
      achievements: {
        where: {
          id: achievementId
        }
      }
    }
  });

  const achievementDetailsPromise = db.achievement.findUnique({
    where: { id: achievementId },
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
  })

  const [relatedRewards, achievement] = await Promise.all([relatedRewardsPromise, achievementDetailsPromise]);
  return {
    achievement,
    relatedRewards
  };
})
