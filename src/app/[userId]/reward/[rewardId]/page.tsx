interface RewardShowPageProps {
  params: {
    rewardId: string
  }
}
// TODO: plan to this page... totally remove (if so, links logic must mutate) or render something...?
export default function RewardShowPage({ params: { rewardId } }: RewardShowPageProps) {
  return (
    <div>
      {rewardId}
    </div>
  )
}
