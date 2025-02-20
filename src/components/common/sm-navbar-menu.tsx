"use client";

import {
  NavbarContent,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import type { MenuItem } from "../header";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

interface SmallNavbarMenuProps {
  menuItems: MenuItem[];
  userId?: string;
  children?: React.ReactNode;
}

export default function SmallNavbarMenu({
  menuItems,
  userId,
  children,
}: SmallNavbarMenuProps) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;
  const isRewardActive = pathname.endsWith("reward");
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  const renderMenuItems = () => {
    const items: React.ReactElement[] = [];

    if (userId) {
      menuItems.forEach((item, index) => {
        const active = isActive(item.href);
        items.push(
          <DropdownItem
            key={`${item.name}-${index}`}
            className={active ? "bg-primary-100 text-primary-600" : ""}
          >
            <Button
              onClick={() => handleNavigation(item.href)}
              className={`w-full text-left ${active ? "font-bold" : ""}`}
            >
              {item.name}
            </Button>
          </DropdownItem>,
        );
      });
    }

    React.Children.forEach(children, (child, index) => {
      if (React.isValidElement(child)) {
        items.push(
          <DropdownItem
            key={`child-${index}`}
            className={isRewardActive ? "bg-primary-100 text-primary-600" : ""}
          >
          {React.cloneElement(child as React.ReactElement<{ className?: string; onClick?: () => void }>, {
            className: `w-full ${isRewardActive ? 'font-bold' : ''} ${child.props.className || ''}`,
            onClick: () => {
              if (child.props.href) {
                handleNavigation(child.props.href);
              }
            },
          })}
          </DropdownItem>,
        );
      }
    });

    return items;
  };

  return (
    <NavbarContent className="md:hidden">
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly variant="light" aria-label="Open menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Navigation menu">
          {renderMenuItems()}
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  );
}
