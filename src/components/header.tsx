import {
  Navbar,
} from "@nextui-org/react";
import { NotodoWithData } from "@/db/queries/notodos";
import { RewardClaimWithReward } from "@/db/queries/rewardClaims";
import { paths } from "@/paths";
import SmallNavbarMenu from "./common/sm-navbar-menu";
import NotodoLogoWrapper from "./common/notodo-logo-wrapper";
import MediumNavbarMenu from "./common/md-navbar-menu";
import HeaderRight from "./common/header-right";

interface HeaderProps {
  fetchNotodos?: () => Promise<NotodoWithData[]>;
  fetchRewardClaims?: () => Promise<RewardClaimWithReward[]>;
  userId?: string;
}

export interface MenuItem {
  name: string;
  href: string;
}

export default async function Header({
  fetchNotodos,
  fetchRewardClaims,
  userId,
}: HeaderProps) {
  const menuItems = [
    { name: "Notodos", href: userId ? paths.notodoListPage(userId) : "/" },
    {
      name: "Achievements",
      href: userId ? paths.achievementListPage(userId) : "/",
    },
  ];

  return (
    <Navbar className="shadow mb-6 rounded-lg text-stone-800">
      <SmallNavbarMenu
        fetchNotodos={fetchNotodos}
        fetchRewardClaims={fetchRewardClaims}
        menuItems={menuItems}
        userId={userId}
      />

      <NotodoLogoWrapper />

      <MediumNavbarMenu menuItems={menuItems} userId={userId} />

      <HeaderRight fetchNotodos={fetchNotodos} fetchRewardClaims={fetchRewardClaims} userId={userId} />
    </Navbar>
  );
}
