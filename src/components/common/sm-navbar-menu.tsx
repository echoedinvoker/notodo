"use client";

import Link from "next/link";
import type { MenuItem } from "../header";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

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
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;
  const isRewardActive = pathname.endsWith("reward");

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderMenuItems = () => {
    const items: React.ReactElement[] = [];

    if (userId) {
      menuItems.forEach((item, index) => {
        const active = isActive(item.href);
        items.push(
          <li
            key={`${item.name}-${index}`}
            className={active ? "bg-primary-100 text-primary-600" : ""}
          >
            <Link
              href={item.href}
              className={`block w-full py-2 px-4 ${active ? "font-bold" : ""}`}
            >
              {item.name}
            </Link>
          </li>,
        );
      });
    }

    React.Children.forEach(children, (child, index) => {
      if (React.isValidElement(child)) {
        items.push(
          <li
            key={`child-${index}`}
            className={isRewardActive ? "bg-primary-100 text-primary-600" : ""}
          >
            {React.cloneElement(
              child as React.ReactElement<{ className?: string }>,
              {
                className: `block w-full py-2 px-4 ${isRewardActive ? "font-bold" : ""} ${child.props.className || ""}`,
              },
            )}
          </li>,
        );
      }
    });

    return items;
  };

  return (
    <div className="md:hidden relative">
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className={`p-2 transition-all duration-200 ${isOpen
          ? "bg-primary-100 text-primary-600 rounded-md shadow-inner"
          : "hover:bg-gray-100 rounded-md"
          }`}
        aria-label="Open menu"
      >
        {isOpen ? (
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
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
        )}
      </button>
      {isOpen && (
        <ul
          ref={menuRef}
          className="absolute left-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded shadow-lg z-50 max-h-[80vh] overflow-y-auto"
        >
          {renderMenuItems()}
        </ul>
      )}
    </div>
  );
}
