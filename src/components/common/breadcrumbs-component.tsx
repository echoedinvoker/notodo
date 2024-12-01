'use client';

import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  disabled: boolean;
};

export default function BreadcrumbsComponent() {
  const pathname = usePathname()
  const navItems = generateNavItems(pathname);


  return (
    <>
    {navItems.length > 0 && (
      <Breadcrumbs>
      {navItems.map((item) => (
        <BreadcrumbItem href={item.href}>{item.label}</BreadcrumbItem>
      ))}
      </Breadcrumbs>
    )}
    </>
  )
}

function generateNavItems(pathname: string): NavItem[] {
  const parts = pathname.split('/').filter(Boolean);
  const navItems: NavItem[] = [];
  let currentPath = '';

  for (let i = 0; i < parts.length; i++) {
    currentPath += '/' + parts[i];
    
    let label = parts[i];
    if (i === 0) continue; // Skip the first part (user ID)
    
    navItems.push({
      href: currentPath,
      label: label,
      disabled: i === parts.length - 1 // Last item is disabled
    });
  }

  // Set all items except the last one to not disabled
  for (let i = 0; i < navItems.length - 1; i++) {
    navItems[i].disabled = false;
  }

  return navItems;
}
