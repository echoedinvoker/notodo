import Link from "next/link";

interface AbsoluteLinkProps {
  href: string;
  chrildren?: React.ReactNode;
}

export default function AbsoluteLink({ href, chrildren }: AbsoluteLinkProps) {
  return (
    <Link
      href={href}
      className="outline-none absolute right-3 -top-1 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 bg-stone-50 p-2 py-1 text-xs uppercase font-semibold text-stone-500"
      prefetch
    >
      {chrildren || "Create"}
    </Link>
  );
}
