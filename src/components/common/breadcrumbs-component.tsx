'use client';

import { BreadcrumbItem, Breadcrumbs, Skeleton } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = {
  href: string;
  label: string;
};

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
      <Skeleton className="w-72 h-[20px]" />
    )
  }

  return (
    <>
    {navItems.length > 0 && (
      <Breadcrumbs>
      {navItems.map((item) => (
        <BreadcrumbItem
          key={item.href}
          href={item.href}>{item.label}</BreadcrumbItem>
      ))}
      </Breadcrumbs>
    )}
    </>
  )
}
