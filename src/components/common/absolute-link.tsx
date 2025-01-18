import Link from "next/link";

interface AbsoluteLinkProps {
  href: string;
  children?: React.ReactNode;
}

export default function AbsoluteLink({ href, children }: AbsoluteLinkProps) {
  return (
    <Link
      href={href}
      className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
      prefetch
    >
      {children || "Create"}
    </Link>
  );
}
