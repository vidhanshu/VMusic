"use client";

import { usePathname } from "next/navigation";
import { Breadcrumbs, BreadcrumbItem, cn } from "@nextui-org/react";

const CustomBreadcrumbs = () => {
  const pathname = usePathname();
  const breadcrumbs = [...new Set(pathname.split("/"))]
    .map((path) => {
      const label = path.split("-").join(" ");
      return {
        label: label === "" ? "Home" : label,
        href: path === "" ? "/" : `/${path}`,
      };
    });

  return (
    <Breadcrumbs
      underline="hover"
      className={cn(pathname === "/" && "hidden", "mb-4")}
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <BreadcrumbItem
          className="capitalize"
          key={index}
          href={breadcrumb.href}
        >
          {breadcrumb.label}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
