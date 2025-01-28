'use client';

import { NavbarContent, NavbarItem } from "@nextui-org/react";
import { MenuItem } from "../header";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MediumNavbarMenuProps {
  menuItems: MenuItem[];
  userId?: string;
}

export default function MediumNavbarMenu({ menuItems, userId }: MediumNavbarMenuProps) {
  const pathname = usePathname();

  return (
    <NavbarContent className="hidden md:flex gap-4" justify="center">
      {userId &&
        menuItems.map((item, index) => (
          <NavbarItem key={`${item.name}-${index}`}>
            <Link
              href={item.href}
              className={`text-stone-800 hover:text-stone-600 ${
                pathname === item.href ? 'font-bold text-stone-600' : ''
              }`}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
    </NavbarContent>
  );
}
