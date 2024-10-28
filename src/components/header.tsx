import { Input, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"
import Link from "next/link"
import HeaderAuth from "./header-auth"

export default async function Header() {
  return (
    <Navbar className="shadow mb-6 rounded-lg text-stone-800">
      <NavbarBrand>
        <Link href="/" className="font-bold">NOTODO</Link>  {/* Left brand and it can be clicked to go to the home page */}
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Input />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <HeaderAuth />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
