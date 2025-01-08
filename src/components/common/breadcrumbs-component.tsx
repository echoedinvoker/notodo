'use client';

import { Skeleton } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = {
  href: string;
  label: string;
};

// TODO: need to change way to present the breadcrumbs when small screen
export default function BreadcrumbsComponent() {
  const pathname = usePathname()
  const [navItems, setNavItems] = useState<NavItem[]>([]);


  useEffect(() => {
    fetchSomething();
  }, [pathname])

  async function fetchSomething() {
    const response = await fetch('/api/label');
    const { segments } = await response.json();
    setNavItems(segments.reverse());
  }

  if (navItems.length === 0) {
    return (
      <Skeleton className="w-32 h-[20px]" />
    )
  }

  return (
    <>
      {navItems.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {navItems.map((item) => (
            <Link
              className="group relative text-sm whitespace-nowrap after:content-['>'] last-of-type:after:content-none text-stone-500 last-of-type:text-stone-700 last-of-type:cursor-default font-semibold tracking-wider hover:drop-shadow last-of-type:hover:drop-shadow-none"
              key={item.href}
              href={item.href}
              prefetch
            >
              {item.label}
              <div className="absolute inset-x-0 border-b-3 border-stone-400 opacity-0 group-hover:opacity-100 duration-250"></div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
