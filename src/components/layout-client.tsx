"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/sidebar";
import { SidebarProvider } from "@/components/dashboard/sidebar-context";
import Header from "@/components/dashboard/header";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide global header/sidebar on specific full-screen review pages
  const hideHeader =
    pathname.startsWith("/dashboard/alternatives/review") ||
    pathname.startsWith("/dashboard/safety/");

  const hideSidebar = 
    pathname.startsWith("/dashboard/alternatives/review") ||
    pathname.startsWith("/dashboard/safety/");

  return (
    <SidebarProvider>
      <div className="h-full w-full flex overflow-hidden">
        {!hideSidebar && <Sidebar />}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {!hideHeader && <Header />}
          <main className="flex-1 overflow-y-auto bg-slate-50 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
