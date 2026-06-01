"use client";

import React from "react";
import Sidebar from "@/components/dashboard/sidebar";
import { SidebarProvider } from "@/components/dashboard/sidebar-context";
import Header from "@/components/dashboard/header";
import { usePathname } from "next/navigation";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Hide global header only on alternative review page as requested
  const isAlternativeReview = pathname.startsWith("/dashboard/alternatives/review");

  return (
    <SidebarProvider>
      <div className="h-full w-full flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {!isAlternativeReview && <Header />}
          <main className="flex-1 overflow-y-auto bg-slate-50 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
