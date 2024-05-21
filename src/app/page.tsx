"use client";

import { DashboardNavbar } from "@/components/Navbar";
import { DashboardSidebar } from "@/components/sidebar";
import { SidebarProvider, useSidebarContext } from "@/context/SidebarCntext";
import type { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

const DashboardLayout: FC<PropsWithChildren> = function ({ children }) {
  return (
    <SidebarProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SidebarProvider>
  );
};

const DashboardLayoutContent: FC<PropsWithChildren> = function ({ children }) {
  const { isCollapsed } = useSidebarContext();

  return (
    <>
      <DashboardNavbar />
      <div className="mt-16 flex items-start">

        <DashboardSidebar />
        <div
          id="main-content"
          className={twMerge(
            "relative h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900",
            isCollapsed ? "lg:ml-[4.5rem]" : "lg:ml-64",
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;