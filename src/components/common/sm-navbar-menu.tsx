import { NotodoWithData } from "@/db/queries/notodos";
import { RewardClaimWithReward } from "@/db/queries/rewardClaims";
import { NavbarContent } from "@nextui-org/react";
import Link from "next/link";
import ConsumePoints from "./consume-points";
import type { MenuItem } from "../header";

interface SmallNavbarMenuProps {
  fetchNotodos?: () => Promise<NotodoWithData[]>;
  fetchRewardClaims?: () => Promise<RewardClaimWithReward[]>;
  menuItems: MenuItem[];
  userId?: string;
}

export default function SmallNavbarMenu({ fetchNotodos, fetchRewardClaims, menuItems, userId }: SmallNavbarMenuProps) {
  return (
      <NavbarContent className="md:hidden">
        <details className="relative">
          <summary className="list-none cursor-pointer">
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
          </summary>
          <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {userId &&
                menuItems.map((item, index) => (
                  <Link
                    key={`${item.name}-${index}`}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {item.name}
                  </Link>
                ))}
              {fetchNotodos && fetchRewardClaims && userId && (
                <div className="px-4 py-2">
                  <ConsumePoints
                    fetchNotodos={fetchNotodos}
                    fetchRewardClaims={fetchRewardClaims}
                    userId={userId}
                  />
                </div>
              )}
            </div>
          </div>
        </details>
      </NavbarContent>
  )
}
