import { Navbar } from "@nextui-org/react";
import { NotodoWithData } from "@/db/queries/notodos";
import { RewardClaimWithReward } from "@/db/queries/rewardClaims";
import { paths } from "@/paths";
import SmallNavbarMenu from "./common/sm-navbar-menu";
import NotodoLogoWrapper from "./common/notodo-logo-wrapper";
import MediumNavbarMenu from "./common/md-navbar-menu";
import HeaderRight from "./common/header-right";
import { ConsumePoints } from "./common";

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
        menuItems={menuItems}
        userId={userId}
      >
        {fetchNotodos && fetchRewardClaims && userId && (
          <div className="px-4 py-2">
            <ConsumePoints
              fetchNotodos={fetchNotodos}
              fetchRewardClaims={fetchRewardClaims}
              userId={userId}
            />
          </div>
        )}
      </SmallNavbarMenu>

      <NotodoLogoWrapper />

      <MediumNavbarMenu menuItems={menuItems} userId={userId} />

      <HeaderRight
        fetchNotodos={fetchNotodos}
        fetchRewardClaims={fetchRewardClaims}
        userId={userId}
      />
    </Navbar>
  );
}
