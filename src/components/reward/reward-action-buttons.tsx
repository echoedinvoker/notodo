import { paths } from "@/paths";
import Link from "next/link";

export default function RewardActionButtons({ userId, rewardId }: { userId: string, rewardId: string }) {
  return (
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
  )
}
