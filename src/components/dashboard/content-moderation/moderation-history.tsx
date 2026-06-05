"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Shield,
  FileText,
  ShieldAlert,
  Bot,
  MessageSquare,
  Download,
  Filter,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Eye,
  RotateCcw,
  Check,
  Search
} from "lucide-react";

interface HistoryItem {
  id: string;
  contentTitle: string;
  contentSub: string;
  type: "Review" | "Comment" | "Claim" | "Ad" | "AI Output";
  action: "Removed" | "Flagged" | "No Action";
  reason: string;
  reasonSub: string;
  severity: "High" | "Medium" | "Low";
  moderator: string;
  moderatorAvatarColor: string;
  moderatorInitials: string;
  date: string;
  time: string;
  thumbnail: React.ReactNode;
}

// Brand SVG Platform Logos / Icons
const CalmMaxMini = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-sky-600 bg-sky-50 rounded-lg p-1.5 border border-slate-100 shrink-0">
    <rect x="11" y="10" width="10" height="17" rx="2" fill="#0EA5E9" />
    <rect x="12" y="6" width="8" height="4" rx="1" fill="#0284C7" />
  </svg>
);

const HeadphoneMini = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-slate-655 bg-slate-100 rounded-lg p-1.5 border border-slate-200 shrink-0">
    <rect x="6" y="14" width="4" height="10" rx="1.5" fill="currentColor" />
    <rect x="22" y="14" width="4" height="10" rx="1.5" fill="currentColor" />
    <path d="M8 14V12a8 8 0 0 1 16 0v2" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);

const PhoneMini = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-slate-655 bg-slate-100 rounded-lg p-1.5 border border-slate-200 shrink-0">
    <rect x="9" y="4" width="14" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="16" cy="24" r="1.5" fill="currentColor" />
  </svg>
);

const YoutubeLogoMini = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8 text-red-600 bg-red-50 rounded-lg p-2 border border-slate-100 shrink-0 fill-current">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.522 3.5 12 3.5 12 3.5s-7.522 0-9.388.555a3.002 3.002 0 0 0-2.11 2.108C0 8.03 0 12 0 12s0 3.97.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.478 20.5 12 20.5 12 20.5s7.522 0 9.388-.555a3.002 3.002 0 0 0 2.11-2.108C24 15.97 24 12 24 12s0-3.97-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const WatchMini = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-slate-655 bg-slate-100 rounded-lg p-1.5 border border-slate-200 shrink-0">
    <rect x="9" y="9" width="14" height="14" rx="3" fill="none" stroke="currentColor" strokeWidth="2.5" />
    <path d="M12 5h8v4h-8zM12 23h8v4h-8z" fill="currentColor" />
  </svg>
);

const CameraMini = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-slate-655 bg-slate-100 rounded-lg p-1.5 border border-slate-200 shrink-0">
    <path d="M9 10h3l2-3h4l2 3h3a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3z" fill="none" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="16" cy="17" r="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ShoeMini = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-slate-655 bg-slate-100 rounded-lg p-1.5 border border-slate-200 shrink-0">
    <path d="M4 18s4-8 12-8 10 4 12 8v4H4v-4z" fill="none" stroke="currentColor" strokeWidth="2.5" />
    <path d="M10 10l2 4M14 10l2 4" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const mockHistory: HistoryItem[] = [
  {
    id: "CR-871239",
    contentTitle: "Sony WH-1000XM5 Review",
    contentSub: "Product Review",
    type: "Review",
    action: "Removed",
    reason: "Misleading Claim",
    reasonSub: "Exaggerated performance",
    severity: "High",
    moderator: "AI Auto-Moderation",
    moderatorAvatarColor: "bg-indigo-650",
    moderatorInitials: "AI",
    date: "May 26, 2025",
    time: "10:24 AM",
    thumbnail: <HeadphoneMini />
  },
  {
    id: "CC-992311",
    contentTitle: "Top 5 Headphones 2025",
    contentSub: "YouTube Comment",
    type: "Comment",
    action: "Flagged",
    reason: "Harassment / Abusive",
    reasonSub: "Personal attack",
    severity: "High",
    moderator: "Sarah Johnson",
    moderatorAvatarColor: "bg-purple-600",
    moderatorInitials: "SJ",
    date: "May 26, 2025",
    time: "09:58 AM",
    thumbnail: <YoutubeLogoMini />
  },
  {
    id: "CL-778923",
    contentTitle: "Miracle Weight Loss Pills",
    contentSub: "Product Claim",
    type: "Claim",
    action: "Removed",
    reason: "False Information",
    reasonSub: "Health claim not allowed",
    severity: "High",
    moderator: "AI Auto-Moderation",
    moderatorAvatarColor: "bg-indigo-650",
    moderatorInitials: "AI",
    date: "May 26, 2025",
    time: "09:32 AM",
    thumbnail: <CalmMaxMini />
  },
  {
    id: "RV-653221",
    contentTitle: "Nike Air Max 270",
    contentSub: "User Review",
    type: "Review",
    action: "No Action",
    reason: "—",
    reasonSub: "",
    severity: "Low",
    moderator: "Mike Davis",
    moderatorAvatarColor: "bg-teal-600",
    moderatorInitials: "MD",
    date: "May 26, 2025",
    time: "09:15 AM",
    thumbnail: <ShoeMini />
  },
  {
    id: "AD-223411",
    contentTitle: "Apple Watch Series 9",
    contentSub: "Ad Content",
    type: "Ad",
    action: "Flagged",
    reason: "Incomplete Disclosure",
    reasonSub: "Missing affiliate disclosure",
    severity: "Medium",
    moderator: "Emma Wilson",
    moderatorAvatarColor: "bg-indigo-500",
    moderatorInitials: "EW",
    date: "May 25, 2025",
    time: "08:42 PM",
    thumbnail: <WatchMini />
  },
  {
    id: "AI-554712",
    contentTitle: "iPhone 15 Pro Max",
    contentSub: "AI Generated Summary",
    type: "AI Output",
    action: "Removed",
    reason: "Policy Violation",
    reasonSub: "Prohibited comparison",
    severity: "High",
    moderator: "AI Auto-Moderation",
    moderatorAvatarColor: "bg-indigo-650",
    moderatorInitials: "AI",
    date: "May 25, 2025",
    time: "07:21 PM",
    thumbnail: <PhoneMini />
  },
  {
    id: "RV-331245",
    contentTitle: "Canon EOS R8",
    contentSub: "Product Review",
    type: "Review",
    action: "Flagged",
    reason: "Spam",
    reasonSub: "Repetitive content",
    severity: "Low",
    moderator: "David Lee",
    moderatorAvatarColor: "bg-blue-600",
    moderatorInitials: "DL",
    date: "May 25, 2025",
    time: "06:48 PM",
    thumbnail: <CameraMini />
  }
];

export default function ModerationHistory() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("Newest First");

  const toggleSelectAll = () => {
    if (selectedIds.length === mockHistory.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(mockHistory.map((item) => item.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="bg-[#FAFBFD] min-h-full w-full font-sans pb-6">
      <div className="w-full max-w-full px-3 sm:px-4 md:px-5 py-4 md:py-6 space-y-4 md:space-y-6">
        
        {/* Title Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full select-none">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl border border-[#EEF2FF] bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5] shadow-3xs shrink-0">
              <Shield className="h-5 w-5 fill-[#EEF2FF] text-[#4F46E5]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
                Moderation History
              </h1>
              <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
                View all moderation actions taken across content, claims, AI outputs, and ads.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5 shrink-0">
            <button className="flex justify-center items-center gap-1.5 h-9 px-3.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-3xs transition whitespace-nowrap">
              <Download className="h-4 w-4 text-slate-400" /> Export
            </button>
            <button className="flex justify-center items-center gap-1.5 h-9 px-4 text-xs font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm transition whitespace-nowrap">
              <Filter className="h-4 w-4" /> Filters
            </button>
          </div>
        </div>

        {/* KPI Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2.5 sm:gap-3 w-full">
          {/* Card 1: Total Actions */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-3xs flex items-center gap-3 w-full min-w-0">
            <div className="h-9 w-9 rounded-xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center shrink-0">
              <Shield className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Total Actions</span>
              <span className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5 block">4,892</span>
              <span className="text-[8px] text-emerald-600 font-bold block mt-0.5 leading-tight">
                ↑ 12.4% <span className="text-slate-400 font-medium text-[8px]">vs last 30 days</span>
              </span>
            </div>
          </div>

          {/* Card 2: Content Removed */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-3xs flex items-center gap-3 w-full min-w-0">
            <div className="h-9 w-9 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
              <FileText className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Content Removed</span>
              <span className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5 block">1,248</span>
              <span className="text-[8px] text-emerald-600 font-bold block mt-0.5 leading-tight">
                ↑ 8.1% <span className="text-slate-400 font-medium text-[8px]">vs last 30 days</span>
              </span>
            </div>
          </div>

          {/* Card 3: Content Flagged */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-3xs flex items-center gap-3 w-full min-w-0">
            <div className="h-9 w-9 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
              <ShieldAlert className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Content Flagged</span>
              <span className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5 block">2,176</span>
              <span className="text-[8px] text-red-650 font-bold block mt-0.5 leading-tight">
                ↑ 15.3% <span className="text-slate-400 font-medium text-[8px]">vs last 30 days</span>
              </span>
            </div>
          </div>

          {/* Card 4: Auto Actions */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-3xs flex items-center gap-3 w-full min-w-0">
            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Bot className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Auto Actions</span>
              <span className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5 block">3,112</span>
              <span className="text-[8px] text-emerald-600 font-bold block mt-0.5 leading-tight">
                ↑ 18.7% <span className="text-slate-400 font-medium text-[8px]">vs last 30 days</span>
              </span>
            </div>
          </div>

          {/* Card 5: Appeals */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-3xs flex items-center gap-3 w-full min-w-0 col-span-2 sm:col-span-1">
            <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <MessageSquare className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Appeals</span>
              <span className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5 block">326</span>
              <span className="text-[8px] text-blue-600 font-bold block mt-0.5 leading-tight">
                ↓ 6.2% <span className="text-slate-400 font-medium text-[8px]">vs last 30 days</span>
              </span>
            </div>
          </div>
        </div>

        {/* Main combined card containing filters, sorting, and table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-3xs overflow-hidden min-w-0">
          
          {/* Filters and Sorting bar - now inside the card container */}
          <div className="px-5 py-4 flex flex-wrap items-center gap-3.5 select-none border-b border-slate-100">
            
            {/* Date range picker */}
            <div className="relative flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
              <input
                type="text"
                value="May 20 - May 26, 2025"
                readOnly
                className="border-0 bg-transparent py-1.5 pl-9 pr-3 text-xs font-bold text-slate-700 outline-none w-[180px]"
              />
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Action type */}
            <div className="relative">
              <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3.5 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer w-[135px]">
                <option>All Action Types</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Content type */}
            <div className="relative">
              <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3.5 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer w-[135px]">
                <option>All Content Types</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Reason */}
            <div className="relative">
              <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3.5 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer w-[125px]">
                <option>All Reasons</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Severity */}
            <div className="relative">
              <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3.5 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer w-[125px]">
                <option>All Severity</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Moderators */}
            <div className="relative">
              <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3.5 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer w-[135px]">
                <option>All Moderators</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            <div className="w-full flex items-center justify-between mt-1 pt-1.5">
              <button className="flex items-center gap-1 text-xs font-bold text-[#4F46E5] hover:text-[#4338CA] transition">
                Clear All
              </button>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Sort:</span>
                <div className="relative">
                  <select 
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3.5 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer w-[135px] hover:bg-slate-100/70 transition"
                  >
                    <option>Newest First</option>
                    <option>Oldest First</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          {/* Table Wrapper */}
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[950px] text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/60 border-b border-slate-150 text-slate-400 font-bold uppercase tracking-wider text-[10px] select-none">
                  <th className="py-3.5 px-4 w-[4%] text-center">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.length === mockHistory.length}
                      onChange={toggleSelectAll}
                      className="rounded border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5 cursor-pointer" 
                    />
                  </th>
                  <th className="py-3.5 px-4 w-[28%]">Content</th>
                  <th className="py-3.5 px-3 w-[10%]">Type</th>
                  <th className="py-3.5 px-3 w-[10%]">Action</th>
                  <th className="py-3.5 px-4 w-[16%]">Reason</th>
                  <th className="py-3.5 px-3 w-[8%]">Severity</th>
                  <th className="py-3.5 px-4 w-[14%]">Moderator</th>
                  <th className="py-3.5 px-4 w-[12%]">Date & Time</th>
                  <th className="py-3.5 px-8 w-[10%]">Content ID</th>
                  <th className="py-3.5 px-4 w-[6%] text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {mockHistory.map((item) => {
                  const isSelected = selectedIds.includes(item.id);
                  return (
                    <tr
                      key={item.id}
                      className={cn(
                        "hover:bg-slate-50/40 transition-colors cursor-pointer",
                        isSelected ? "bg-slate-50/80" : ""
                      )}
                      onClick={() => toggleSelect(item.id)}
                    >
                      <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(item.id)}
                          className="rounded border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5 cursor-pointer"
                        />
                      </td>
                      
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          {item.thumbnail}
                          <div className="leading-tight min-w-0">
                            <span className="text-xs font-bold text-slate-900 block truncate max-w-[200px]">{item.contentTitle}</span>
                            <span className="text-[10px] text-slate-400 font-semibold block mt-0.5 truncate">{item.contentSub}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-3">
                        <span className="inline-flex justify-center items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide border bg-slate-50 text-slate-600 border-slate-200 shadow-3xs">
                          {item.type}
                        </span>
                      </td>

                      <td className="py-4 px-3">
                        <span className={cn(
                          "inline-flex justify-center items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide border shadow-3xs",
                          item.action === "Removed" && "bg-red-50 text-red-600 border-red-100",
                          item.action === "Flagged" && "bg-amber-50 text-amber-600 border-amber-100",
                          item.action === "No Action" && "bg-emerald-50 text-emerald-600 border-emerald-100"
                        )}>
                          {item.action}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <div className="leading-tight">
                          <span className="text-slate-900 font-bold block">{item.reason}</span>
                          {item.reasonSub && (
                            <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                              {item.reasonSub}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-3 select-none">
                        <span className={cn(
                          "inline-flex items-center gap-1 text-[10px] font-bold",
                          item.severity === "High" && "text-red-655",
                          item.severity === "Medium" && "text-amber-550",
                          item.severity === "Low" && "text-emerald-600"
                        )}>
                          <span className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            item.severity === "High" && "bg-red-500",
                            item.severity === "Medium" && "bg-amber-500",
                            item.severity === "Low" && "bg-emerald-500"
                          )}></span>
                          {item.severity}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "h-5.5 w-5.5 rounded-full flex items-center justify-center text-[8px] font-extrabold text-white shrink-0 select-none",
                            item.moderatorAvatarColor
                          )}>
                            {item.moderatorInitials}
                          </span>
                          <span className="text-slate-900 block truncate max-w-[110px]">{item.moderator}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-[11px] leading-tight font-medium text-slate-505">
                        <span className="text-slate-800 font-semibold block">{item.date}</span>
                        <span className="text-slate-400 block mt-0.5">{item.time}</span>
                      </td>

                      <td className="py-4 px-8 text-slate-500 font-semibold text-[11px]">
                        {item.id}
                      </td>

                      <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1.5">
                          <button className="h-7 w-7 rounded-lg border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition shadow-3xs bg-white">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button className="h-7 w-7 rounded-lg border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition shadow-3xs bg-white">
                            <MoreVertical className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="px-5 py-4.5 border-t border-slate-100 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white text-slate-400 font-bold select-none">
            <span className="text-[11px] font-bold text-slate-400">
              Showing 1 to 10 of 4,892 results
            </span>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-400 font-medium">Rows per page</span>
                <div className="relative">
                  <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-650 outline-none cursor-pointer hover:bg-slate-50 transition shadow-3xs">
                    <option>10 / page</option>
                    <option>25 / page</option>
                    <option>50 / page</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-455">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="h-8 w-8 rounded-lg bg-[#4F46E5] text-white flex items-center justify-center text-xs font-bold shadow-sm">1</button>
                <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-semibold hover:bg-slate-50 transition text-slate-600">2</button>
                <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-semibold hover:bg-slate-50 transition text-slate-600">3</button>
                <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-semibold hover:bg-slate-50 transition text-slate-600">4</button>
                <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-semibold hover:bg-slate-50 transition text-slate-600">5</button>
                <span className="px-1 text-slate-350 text-xs">...</span>
                <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-semibold hover:bg-slate-50 transition text-slate-600">490</button>
                <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-455">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
