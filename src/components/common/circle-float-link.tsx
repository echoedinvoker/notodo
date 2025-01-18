import * as actions from "@/actions"
import Link from "next/link";

interface CircleFloatLinkProps {
  isLink: boolean;
  href?: string;
  notodoId?: string;
  actionType?: string;
  children: React.ReactNode;
  tip: string;
}

export default function CircleFloatLink({ isLink, href, notodoId, actionType, children, tip }: CircleFloatLinkProps) {
  const commonClassName = "w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 transition duration-300 shadow hover:shadow-md";

  if (isLink && href)
    return (
      <Link
        href={href}
        className={commonClassName}
        prefetch
        title={tip}
      >
        {children}
      </Link>
    )

  const action = actions.giveup.bind(null, notodoId!);

  return (
    <form action={action}>
      <button
        type="submit"
        className={commonClassName}
        title={tip}
      >
        {children}
      </button>
    </form>
  )
}
