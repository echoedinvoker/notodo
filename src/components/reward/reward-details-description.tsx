import { Achievement, Reward } from "@prisma/client";

interface RewardDetailsDescriptionProps {
  reward: Reward & { achievements: Achievement[] };
}

export default function RewardDetailsDescription({ reward }: RewardDetailsDescriptionProps) {
  return (
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Description
        </h2>
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          <p className="text-gray-700">
            {reward.description || "No description available."}
          </p>
        </div>
      </section>
  );
}
