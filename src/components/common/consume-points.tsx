
import { FaCoins } from "react-icons/fa";
import { Link } from "@nextui-org/react";
import { NotodoWithData } from "@/db/queries/notodos";
import { getNotodosResult } from "@/helpers/utils";
import { paths } from "@/paths";

interface ConsumePointsProps {
  fetchNotodos: () => Promise<NotodoWithData[]>;
  userId: string;
}

export default async function ConsumePoints({ fetchNotodos, userId }: ConsumePointsProps) {
  const notodos = await fetchNotodos();
  const { totalScore, totalWeight } = getNotodosResult(notodos);
  
  return (
    <Link
      href={paths.rewardListPage(userId)}
      className="w-full flex items-center justify-start text-stone-700"
    >
      <FaCoins size="20" />
      <span className="font-bold ext-blue-600 mx-1">{totalScore}</span>
      <span className="border-1 border-stone-300 rounded-full py-0.5 px-1 text-xs italic pr-2">+{totalWeight.toFixed(2)}/hr</span>
    </Link>
  )
}
