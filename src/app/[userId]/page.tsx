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
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Points History</h1>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div style={{ width: '100%', height: 400 }}>
          <PointsPerHourChart history={history || []} />
        </div>
      </div>
        <AchievementNotifications userId={userId} />
    </div>
  );
}
