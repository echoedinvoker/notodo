import React from 'react';
import { fetchAchievements } from '@/db/queries/achievements';
import { fetchRewardData, fetchRewards } from '@/db/queries/rewards';
import { fetchNotodos } from '@/db/queries/notodos';
import { getNotodosResult } from '@/helpers/utils';
import { fetchThresholdsWithIsAchieved } from '@/db/queries/thresholds';
import { FormButton } from './common';
import * as actions from "@/actions";
import { FaTimes } from 'react-icons/fa';

interface AchievementNotificationsProps {
  userId: string;
}

export default async function AchievementNotifications({ userId }: AchievementNotificationsProps) {
  const [achievements, rewards, notodos, thresholds] = await Promise.all([
    fetchAchievements(userId),
    fetchRewards(userId),
    fetchNotodos(userId),
    fetchThresholdsWithIsAchieved(userId)
  ]);

  const { totalScore, totalWeight } = getNotodosResult(notodos);

  const notNotifiedAchievements = achievements
    .filter((achievement) => !achievement.notified)
    .filter((achievement) => achievement.thresholds.every((threshold) => threshold.isAchieved))
    .filter((achievement) => achievement.pointsPerHour ? totalWeight >= achievement.pointsPerHour : true)

  const notNotifiedRewardIds = rewards
    .filter((reward) => !reward.notified)
    .filter((reward) => reward.pointCost <= totalScore)
    .map((reward) => reward.id)

  const notNotifiedRewardsData = await Promise.all(
    notNotifiedRewardIds.map((rewardId) => fetchRewardData(rewardId, userId))
  );
  const consumableNotNotifiedRewards = notNotifiedRewardsData.filter((rewardData) => rewardData && rewardData.consumable);

  const notNotifiedThresholds = thresholds.filter((threshold) => !threshold.notified && threshold.isAchieved);

  return (
    <div className="space-y-6">
      {/* Achievements Card */}
      {notNotifiedAchievements.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Achievements</h2>
          <div className="space-y-4">
            {notNotifiedAchievements.map((achievement) => (
              <div key={achievement.id} className="bg-blue-50 rounded-lg p-4 flex justify-between items-center border border-blue-200">
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-1">{achievement.name}</h3>
                  <p className="text-sm text-blue-600">Achievement unlocked!</p>
                </div>
                <form action={actions.notifiedAchievement.bind(null, achievement.id)}>
                  <button className="text-blue-400 hover:text-blue-600 transition-colors duration-200 rounded-full p-1 hover:bg-blue-100">
                    <FaTimes size={20} />
                    <span className="sr-only">Dismiss notification</span>
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rewards Card */}
      {consumableNotNotifiedRewards.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Rewards</h2>
          <div className="space-y-4">
            {consumableNotNotifiedRewards.map((reward) => (
              <div key={reward?.reward.id} className="bg-green-50 rounded-lg p-4 flex justify-between items-center border border-green-200">
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-1">{reward?.reward.name}</h3>
                  <p className="text-sm text-green-600">Reward available!</p>
                </div>
                <form action={actions.notifiedReward.bind(null, reward!.reward.id)}>
                  <button className="text-green-400 hover:text-green-600 transition-colors duration-200 rounded-full p-1 hover:bg-green-100">
                    <FaTimes size={20} />
                    <span className="sr-only">Dismiss notification</span>
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Thresholds Card */}
      {notNotifiedThresholds.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Thresholds</h2>
          <div className="space-y-4">
            {notNotifiedThresholds.map((threshold) => (
              <div key={threshold.id} className="bg-yellow-50 rounded-lg p-4 flex justify-between items-center border border-yellow-200">
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800 mb-1">{threshold.title}</h3>
                  <p className="text-sm text-yellow-600">Threshold reached!</p>
                </div>
                <form action={actions.notifiedThreshold.bind(null, threshold.id)}>
                  <button className="text-yellow-400 hover:text-yellow-600 transition-colors duration-200 rounded-full p-1 hover:bg-yellow-100">
                    <FaTimes size={20} />
                    <span className="sr-only">Dismiss notification</span>
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
