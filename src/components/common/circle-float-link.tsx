import * as actions from "@/actions"
import Link from "next/link";

interface CircleFloatLinkProps {
  isLink: boolean;
  href?: string;
  notodoId?: string;
  actionType?: string;
  children: React.ReactNode;
  tip: string;
  onClick?: () => void;
  [key: string]: any;
}

export default function CircleFloatLink({ 
  isLink, 
  href, 
  notodoId, 
  actionType, 
  children, 
  tip, 
  onClick,
  ...props 
}: CircleFloatLinkProps) {
  const commonClassName = "group w-10 h-10 flex items-center justify-center rounded-full bg-stone-200 hover:bg-stone-300 hover:text-stone-100 transition duration-300 shadow hover:shadow-md";

  if (isLink && href) {
    return (
      <Link
        href={href}
        className={commonClassName}
        prefetch
        title={tip}
        {...props}
      >
        {children}
      </Link>
    )
  }

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={commonClassName}
        title={tip}
        type="button"
        {...props}
      >
        {children}
      </button>
    )
  }

  const action = actionType === 'giveup' ? actions.giveup.bind(null, notodoId!) : undefined;

  return (
    <form action={action}>
      <button
        type="submit"
        className={commonClassName}
        title={tip}
        {...props}
      >
        {children}
      </button>
    </form>
  )
}
