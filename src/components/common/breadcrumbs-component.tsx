'use client';

import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function BreadcrumbsComponent() {
  const pathname = usePathname()
  return (
    <Breadcrumbs>
      <BreadcrumbItem>Test</BreadcrumbItem>
      <BreadcrumbItem>Test</BreadcrumbItem>
      <BreadcrumbItem>Test</BreadcrumbItem>
      <BreadcrumbItem>Test</BreadcrumbItem>
    </Breadcrumbs>
  )
}
