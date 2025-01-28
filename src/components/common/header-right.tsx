import { NavbarContent, NavbarItem } from "@nextui-org/react";
import ConsumePoints from "./consume-points";
import HeaderAuth from "../header-auth";
import { NotodoWithData } from "@/db/queries/notodos";
import { RewardClaimWithReward } from "@/db/queries/rewardClaims";

interface HeaderRightProps {
  fetchNotodos?: () => Promise<NotodoWithData[]>;
  fetchRewardClaims?: () => Promise<RewardClaimWithReward[]>;
  userId?: string;
}

export default function HeaderRight({ fetchNotodos, fetchRewardClaims, userId }: HeaderRightProps) {
  return (
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
  )
}
