import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import HeaderAuth from "./header-auth";
import { NotodoWithData } from "@/db/queries/notodos";
import { ConsumePoints } from "./common";
import { RewardClaimWithReward } from "@/db/queries/rewardClaims";
import NotodoLogo from "./notodo-logo";
import { paths } from "@/paths";

interface HeaderProps {
  fetchNotodos?: () => Promise<NotodoWithData[]>;
  fetchRewardClaims?: () => Promise<RewardClaimWithReward[]>;
  userId?: string;
}

export default async function Header({ fetchNotodos, fetchRewardClaims, userId }: HeaderProps) {
  const menuItems = [
    { name: "Notodos", href: userId ? paths.notodoListPage(userId) : "/" },
    { name: "Achievements", href: userId ? paths.achievementListPage(userId) : "/" },
  ];

  return (
    <Navbar className="shadow mb-6 rounded-lg text-stone-800">
      <NavbarContent className="md:hidden">
        <details className="relative">
          <summary className="list-none cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </summary>
          <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {userId && menuItems.map((item, index) => (
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

      <NavbarBrand>
        <Link href="/" className="flex items-center" prefetch>
          <NotodoLogo className="h-8 w-auto" animate={true} />
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        {userId && menuItems.map((item, index) => (
          <NavbarItem key={`${item.name}-${index}`}>
            <Link href={item.href} className="text-stone-800 hover:text-stone-600">
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden md:flex">
          {fetchNotodos && fetchRewardClaims && userId && (
            <ConsumePoints
              fetchNotodos={fetchNotodos}
              fetchRewardClaims={fetchRewardClaims}
              userId={userId}
            />
          )}
        </NavbarItem>
        <NavbarItem>
          <HeaderAuth />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
