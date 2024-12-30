import * as actions from "@/actions"
import Link from "next/link";

interface CircleFloatLinkProps {
  isLink: boolean;
  href?: string;
  notodoId?: string;
  actionType?: string;
  children: React.ReactNode;
}

export default function CircleFloatLink({ isLink, href, notodoId, actionType, children }: CircleFloatLinkProps) {
  if (isLink && href)
    return (
      <Link
        href={href}
        className="scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 duration-250 rounded-full drop-shadow-sm hover:drop-shadow-lg bg-stone-50 hover:bg-stone-100 active:bg-stone-200 w-8 h-8 flex justify-center items-center hover:-translate-y-0.5 active:-translate-y-0"
        prefetch
      >
        {children}
      </Link>
    )

  const action = actions.giveup.bind(null, notodoId!);

  return (
    <form action={action}>
      <button
        type="submit"
        className="scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 duration-250 rounded-full drop-shadow-sm hover:drop-shadow-lg bg-stone-50 hover:bg-stone-100 active:bg-stone-200 w-8 h-8 flex justify-center items-center hover:-translate-y-0.5 active:-translate-y-0"
      >
        {children}
      </button>
    </form>
  )
}
