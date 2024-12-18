import { paths } from "@/paths";
import Link from "next/link";

interface NotodoCreateLinkProps {
  userId: string;
}

export default function NotodoCreateLink({ userId }: NotodoCreateLinkProps) {
  return (
    <Link
      href={paths.createNotodoPage(userId)}
      className="absolute right-3 -top-1 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 bg-stone-50 p-2 py-1 text-xs uppercase font-semibold text-stone-500"
      prefetch
    >
      Create
    </Link>
  );
}
