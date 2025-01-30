import { fetchRewardWithRewardId } from "@/db/queries/rewards"
import { paths } from "@/paths"
import Link from "next/link"
import ConsumeRewardButton from "@/components/reward/consume-reward-button"
import { fetchNotodos } from "@/db/queries/notodos"
import { fetchRewardClaims } from "@/db/queries/rewardClaims"
import { getNotodosResult } from "@/helpers/utils"
import { fetchRelatedAchievementsByRewardId } from "@/db/queries/achievementsRewards"
import { fetchRelatedThresholdsByAchievementId } from "@/db/queries/achievementsThresholds"
import { areAllAchievementsCompleted } from "@/helpers/processAchievements"
import type { ProcessedAchievement, ProcessedThreshold } from "@/db/queries/achievements"

interface RewardShowPageProps {
  params: {
    userId: string
    rewardId: string
  }
}

export default async function RewardShowPage({ params: { userId, rewardId } }: RewardShowPageProps) {
  const reward = await fetchRewardWithRewardId(rewardId)

  if (!reward) {
    return <div className="text-center text-red-500">Reward not found</div>
  }

  const notodos = await fetchNotodos(userId)
  const { totalScore, totalWeight } = getNotodosResult(notodos)
  const rewardClaims = await fetchRewardClaims(userId)
  const totalConsumed = rewardClaims.reduce((acc, claim) => acc + claim.reward.pointCost, 0)

  const relatedAchievements = await fetchRelatedAchievementsByRewardId(reward.id)
  
  const achievementsWithThresholds = await Promise.all(
    relatedAchievements.map(async (achievement) => {
      const thresholds = await fetchRelatedThresholdsByAchievementId(achievement.id)
      return {
        ...achievement,
        thresholds: thresholds.map(threshold => ({
          ...threshold,
          challengeDuration: 0,
          isAchieved: false
        })) as ProcessedThreshold[]
      } as ProcessedAchievement
    })
  )

  const allAchievementsCompleted = areAllAchievementsCompleted(achievementsWithThresholds, totalWeight)

  const consumable = totalScore >= (totalConsumed + reward.pointCost) && allAchievementsCompleted

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg m-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{reward.name}</h1>

      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <p className="text-lg">
          Point Cost: <span className="font-semibold text-blue-600">{reward.pointCost}</span>
        </p>
        <p className="text-lg">
          Created At: <time className="font-semibold text-blue-600">{reward.createdAt.toLocaleString()}</time>
        </p>
      </div>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Description</h2>
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          <p className="text-gray-700">{reward.description || "No description available."}</p>
        </div>
      </section>

      <div className="mb-6">
        <ConsumeRewardButton rewardId={rewardId} consumable={consumable} />
      </div>

      <div className="flex justify-between items-center">
        <Link
          href={paths.rewardListPage(userId)}
          className="text-blue-500 hover:text-blue-700 transition duration-300"
        >
          &larr; Back to Rewards
        </Link>
        <div>
          <Link
            href={paths.rewardEditPage(userId, rewardId)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 mr-2"
          >
            Edit
          </Link>
          <Link
            href={paths.rewardDeletePage(userId, rewardId)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Delete
          </Link>
        </div>
      </div>
    </div>
  )
}
