"use client";

import { usePathname } from "next/navigation";
import Navbar from "./nav";
import Preloader from "./preloader";
import SmoothScroll from "./smooth-scroll";
import React from "react";

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardOrLogin = pathname?.startsWith("/dashboard") || pathname?.startsWith("/login");

  if (isDashboardOrLogin) {
    return <>{children}</>;
  }

  return (
    <SmoothScroll>
      <Navbar />
      <Preloader>{children}</Preloader>
    </SmoothScroll>
  );
}
