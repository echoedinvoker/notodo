import { NavbarBrand } from "@nextui-org/react";
import Link from "next/link";
import NotodoLogo from "../notodo-logo";

export default function NotodoLogoWrapper() {
  return (
    <NavbarBrand>
      <Link href="/" className="flex items-center" prefetch>
        <NotodoLogo className="h-8 w-auto" animate={true} />
      </Link>
    </NavbarBrand>
  );
}
