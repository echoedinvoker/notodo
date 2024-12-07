import { ToggleMenu } from "@/components/common";
import Link from "next/link";
import { paths } from "@/paths";

interface TheMenuProps {
  userId: string;
}

export default function TheMenu({ userId }: TheMenuProps) {
  return (
    <>
      <ToggleMenu className="absolute right-3 -top-1 peer z-30 sm:hidden" />
      <div className="fixed inset-0 hidden peer-has-[:checked]:block sm:peer-has-[:checked]:hidden bg-black/30 z-20 backdrop-blur-sm sm:hidden"></div>
      <div className="mt-[250px] mb-[500px] hidden peer-has-[:checked]:flex sm:peer-has-[:checked]:hidden flex-col gap-12 justify-start items-center fixed inset-0 z-20 screen-w screen-h">
        <Link className="hover:underline uppercase font-semibold tracking-wide" href={paths.createNotodoPage(userId)} prefetch>create</Link>
        <Link className="hover:underline uppercase font-semibold tracking-wide" href={paths.rewardListPage(userId)} prefetch>consume</Link>
      </div>
    </>
  )
}
