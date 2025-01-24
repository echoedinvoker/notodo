import Link from "next/link";

interface AbsoluteLinkProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
}

export default function AbsoluteLink({ href, className, children }: AbsoluteLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold uppercase  py-2 px-4 rounded transition duration-300 ease-in-out ${className}` }
      prefetch
    >
      {children || "Create"}
    </Link>
  );
}
