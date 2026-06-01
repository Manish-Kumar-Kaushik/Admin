"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/sidebar";
import { SidebarProvider } from "@/components/dashboard/sidebar-context";
import Header from "@/components/dashboard/header";
import { usePathname } from "next/navigation";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
<<<<<<< HEAD
  const hideHeader = pathname === "/dashboard/settings/users";
=======
  // Hide global header only on alternative review page as requested
  const isAlternativeReview = pathname.startsWith("/dashboard/alternatives/review");
>>>>>>> af258eda14bc52c9db8fe898ffaa3441e277c349

  return (
    <SidebarProvider>
      <div className="h-full w-full flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full overflow-hidden">
<<<<<<< HEAD
          {!hideHeader && <Header />}
=======
          {!isAlternativeReview && <Header />}
>>>>>>> af258eda14bc52c9db8fe898ffaa3441e277c349
          <main className="flex-1 overflow-y-auto bg-slate-50 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
