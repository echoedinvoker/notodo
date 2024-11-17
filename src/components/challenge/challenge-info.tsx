import { paths } from "@/paths";
import Link from "next/link";

interface ChallengeInfoProps {
  userId: string;
  notodoId: string;
}

export default function ChallengeInfo({ userId, notodoId }: ChallengeInfoProps) {
  return (
    <Link className="flex-1" href={paths.challengeListPage(userId, notodoId)}>
      <div className="rounded-lg py-2 px-4 shadow hover:shadow-md transition duration-300 text-stone-700 bg-stone-50 mb-4">
        <h3>Challenges</h3>
        <dl>
          <dt>Status:</dt>
          <dd>Challenging</dd>

          <dt>Points earned per hour:</dt>
          <dd>1.5</dd>

          <dt>Hours elasped:</dt>
          <dd>62</dd>
        </dl>
      </div>
    </Link>
  )
}
