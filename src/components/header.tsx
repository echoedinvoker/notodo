import { Input, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"
import Link from "next/link"
import HeaderAuth from "./header-auth"
import { NotodoWithData } from "@/db/queries/notodos";
import { ConsumePoints } from "./common";
import { RewardClaimWithReward } from "@/db/queries/rewardClaims";

interface HeaderProps {
  fetchNotodos?: () => Promise<NotodoWithData[]>;
  fetchRewardClaims?: () => Promise<RewardClaimWithReward[]>;
  userId?: string;
}

export default async function Header({ fetchNotodos, fetchRewardClaims, userId }: HeaderProps) {
  return (
    <Navbar className="shadow mb-6 rounded-lg text-stone-800">
      <NavbarBrand>
        <Link
          href="/"
          className="font-bold"
          prefetch
        >
          NOTODO
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Input />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="gap-2">
        <NavbarItem>
          {fetchNotodos && fetchRewardClaims && userId &&
            <ConsumePoints
              fetchNotodos={fetchNotodos}
              fetchRewardClaims={fetchRewardClaims}
              userId={userId}
            />
          }
        </NavbarItem>
        <NavbarItem>
          <HeaderAuth />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
