import { Input, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"
import Link from "next/link"
import HeaderAuth from "./header-auth"
import { NotodoWithData } from "@/db/queries/notodos";
import { ConsumePoints } from "./common";

interface HeaderProps {
  fetchNotodos?: () => Promise<NotodoWithData[]>;
  userId?: string;
}

export default async function Header({ fetchNotodos, userId }: HeaderProps) {
  return (
    <Navbar className="shadow mb-6 rounded-lg text-stone-800">
      <NavbarBrand>
        <Link href="/" className="font-bold" prefetch>NOTODO</Link>  {/* Left brand and it can be clicked to go to the home page */}
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Input />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="gap-2">
        <NavbarItem>
          {fetchNotodos && userId && <ConsumePoints fetchNotodos={fetchNotodos} userId={userId} />}
        </NavbarItem>
        <NavbarItem>
          <HeaderAuth />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
