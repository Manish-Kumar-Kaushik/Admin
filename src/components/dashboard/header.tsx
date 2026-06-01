"use client";

import React, { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  Calendar,
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import { useSidebar } from "@/components/dashboard/sidebar-context";

export default function Header() {
  const { toggle } = useSidebar();
  const [search, setSearch] = useState("");

  return (
    <header className="sticky top-0 z-30 h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shrink-0 shadow-sm transition-all duration-300">
      {/* Sidebar Toggle Hamburger */}
      <div className="flex-none flex items-center">
        <button
          onClick={toggle}
          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Global Search Bar (Removed as per request) */}
      <div className="flex-1 flex justify-center px-4"></div>

      {/* Right Controls */}
      <div className="flex-none flex items-center gap-2.5 md:gap-4">
        {/* Help Button */}
        <button className="hidden sm:flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors font-semibold text-[14px] px-2">
          <HelpCircle className="w-5 h-5" />
          Help
        </button>

        {/* Notification Bell */}
        <button
          className="relative w-8 h-8 flex items-center justify-center border border-slate-200 bg-white hover:border-slate-300 rounded-full text-slate-500 hover:text-slate-800 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#EF4444] border-2 border-white rounded-full flex items-center justify-center text-[9px] text-white font-bold leading-none shadow-sm">
            5
          </span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 select-none cursor-pointer hover:opacity-80 transition-opacity ml-2">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
            alt="Admin Avatar"
            className="w-8 h-8 rounded-full object-cover shadow-sm border border-slate-200"
          />
          <div className="hidden lg:flex flex-col leading-none">
            <span className="text-[13px] font-bold text-slate-800">Admin User</span>
            <span className="text-[11px] text-slate-400 mt-1">Super Admin</span>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 hidden lg:block ml-1" />
        </div>
      </div>
    </header>
  );
}
