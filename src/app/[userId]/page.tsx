import AchievementNotifications from "@/components/achievement-notifications";
import PointsPerHourChart from "@/components/points-per-hour-chart";
import { getPointHistory } from "@/helpers/utils";

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
      <h1>Points History</h1>
      <div style={{ width: '100%', height: 400 }}>
        <PointsPerHourChart history={history || []} />
      </div>
      <AchievementNotifications userId={userId} />
    </div>
  );
}

