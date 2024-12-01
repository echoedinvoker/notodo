interface RewardShowPageProps {
  params: {
    rewardId: string
  }
}
export default function RewardShowPage({ params: { rewardId } }: RewardShowPageProps) {
  return (
    <div>
      {rewardId}
    </div>
  )
}
