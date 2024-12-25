import Link from "next/link";

interface RewardActionLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function RewardActionLink({ href, children }: RewardActionLinkProps) {
  return (
    <Link
      className="bg-stone-50 w-8 h-8 rounded-full z-40 cursor-pointer hover:bg-stone-100 active:bg-stone-50 flex items-center justify-center hover:scale-110 active:scale-105 hover:shadow-lg active:shadow-sm duration-200"
      href={href}
    >
      {children}
    </Link>
  )
}
