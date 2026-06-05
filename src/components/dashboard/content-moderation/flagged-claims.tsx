"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Download,
  Filter,
  Search,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreVertical,
  Shield,
  Clock,
  Flag,
  CheckSquare,
  AlertTriangle,
  RotateCcw,
  Sliders,
  Check
} from "lucide-react";

interface ClaimItem {
  id: string;
  claimText: string;
  badges: { label: string; type: "red" | "orange" | "blue" | "purple" }[];
  productName: string;
  sku: string;
  platform: string;
  platformType: string;
  riskLevel: "High" | "Medium" | "Low";
  status: "Pending" | "Resolved" | "Dismissed";
  flaggedDate: string;
  flaggedTime: string;
  thumbnail: React.ReactNode;
  platformLogo: React.ReactNode;
}

// SVG Product Icons
const CalmMaxIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-sky-600 bg-sky-50 rounded-lg p-1.5 border border-slate-100 shrink-0">
    <rect x="11" y="10" width="10" height="17" rx="2" fill="#0EA5E9" />
    <rect x="12" y="6" width="8" height="4" rx="1" fill="#0284C7" />
    <circle cx="16" cy="15" r="2.5" fill="#fff" opacity="0.9" />
  </svg>
);

const SlimProIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-rose-600 bg-rose-50 rounded-lg p-1.5 border border-slate-100 shrink-0">
    <path d="M10 8h12l-2 19H12L10 8z" fill="#FDA4AF" />
    <ellipse cx="16" cy="8" rx="6" ry="2" fill="#F43F5E" />
    <rect x="12" y="15" width="8" height="3" rx="0.5" fill="#fff" opacity="0.9" />
  </svg>
);

const SleepZenIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-indigo-650 bg-indigo-50 rounded-lg p-1.5 border border-slate-100 shrink-0">
    <rect x="7" y="12" width="18" height="12" rx="4" fill="#818CF8" />
    <ellipse cx="16" cy="18" rx="5" ry="2.5" fill="#4F46E5" />
    <circle cx="16" cy="18" r="1" fill="#fff" />
  </svg>
);

const ClearSkinIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-amber-600 bg-amber-50 rounded-lg p-1.5 border border-slate-100 shrink-0">
    <rect x="11" y="12" width="10" height="15" rx="2.5" fill="#FBBF24" />
    <path d="M14 12v-5h4v5" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="13" y="4" width="6" height="3" rx="0.5" fill="#78350F" />
  </svg>
);

const BrainBoostIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-teal-600 bg-teal-50 rounded-lg p-1.5 border border-slate-100 shrink-0">
    <rect x="10" y="11" width="12" height="16" rx="2" fill="#0D9488" />
    <path d="M12 7h8v4h-8z" fill="#0F766E" />
    <circle cx="16" cy="17" r="2" fill="#5EEAD4" />
  </svg>
);

// SVG Platform Logos
const YouTubeLogo = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 text-red-600 shrink-0 fill-current">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.522 3.5 12 3.5 12 3.5s-7.522 0-9.388.555a3.002 3.002 0 0 0-2.11 2.108C0 8.03 0 12 0 12s0 3.97.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.478 20.5 12 20.5 12 20.5s7.522 0 9.388-.555a3.002 3.002 0 0 0 2.11-2.108C24 15.97 24 12 24 12s0-3.97-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramLogo = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#E1306C] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
  </svg>
);

const AmazonLogo = () => (
  <div className="flex flex-col items-center justify-center shrink-0 relative select-none">
    <span className="font-black text-slate-900 text-[10px] leading-none">a</span>
    <svg viewBox="0 0 16 4" fill="none" className="w-3 h-0.5 text-amber-500 -mt-[1px]">
      <path d="M1 1c2 2 8 2 14 0" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M13.5 0.5L15 1L14 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const TikTokLogo = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 text-black shrink-0 fill-current">
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.07-2.88-.51-4.05-1.37a8.084 8.084 0 0 1-2.34-2.6v7.7c.07 1.94-.48 3.93-1.68 5.46-1.57 2.01-4.17 3.07-6.68 2.78-2.61-.17-5.07-1.8-6.19-4.19-1.28-2.64-1.03-6.02.82-8.39 1.64-2.14 4.41-3.17 7.02-2.73V11c-1.3-.39-2.76-.14-3.83.67-1.12.82-1.74 2.19-1.69 3.6.01 1.25.6 2.47 1.58 3.22.99.78 2.31 1.05 3.53.81 1.25-.21 2.36-1.07 2.87-2.22.25-.59.35-1.24.34-1.88V.02z" />
  </svg>
);

const FacebookLogo = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 text-blue-600 shrink-0 fill-current">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const mockClaims: ClaimItem[] = [
  {
    id: "1",
    claimText: "This product cures anxiety overnight with 100% guaran...",
    badges: [
      { label: "Health Claim", type: "red" },
      { label: "Unverified", type: "orange" }
    ],
    productName: "CalmMax Capsules",
    sku: "SKU: CMX-500",
    platform: "YouTube",
    platformType: "Video",
    riskLevel: "High",
    status: "Pending",
    flaggedDate: "May 14, 2025",
    flaggedTime: "10:24 AM",
    thumbnail: <CalmMaxIcon />,
    platformLogo: <YouTubeLogo />
  },
  {
    id: "2",
    claimText: "Lose 20 lbs in 7 days without diet or exercise!",
    badges: [
      { label: "Health Claim", type: "red" },
      { label: "Misleading", type: "red" }
    ],
    productName: "SlimPro Shake",
    sku: "SKU: SP-1000",
    platform: "Instagram",
    platformType: "Ad",
    riskLevel: "High",
    status: "Pending",
    flaggedDate: "May 14, 2025",
    flaggedTime: "09:48 AM",
    thumbnail: <SlimProIcon />,
    platformLogo: <InstagramLogo />
  },
  {
    id: "3",
    claimText: "NASA approved technology proven to improve sleep by...",
    badges: [
      { label: "Performance", type: "blue" },
      { label: "Unverified", type: "orange" }
    ],
    productName: "SleepZen Device",
    sku: "SKU: SZ-200",
    platform: "Amazon",
    platformType: "Review",
    riskLevel: "Medium",
    status: "Pending",
    flaggedDate: "May 14, 2025",
    flaggedTime: "08:15 AM",
    thumbnail: <SleepZenIcon />,
    platformLogo: <AmazonLogo />
  },
  {
    id: "4",
    claimText: "#1 dermatologist recommended for acne",
    badges: [
      { label: "Medical Claim", type: "red" },
      { label: "No Evidence", type: "purple" }
    ],
    productName: "ClearSkin Serum",
    sku: "SKU: CS-300",
    platform: "TikTok",
    platformType: "Video",
    riskLevel: "High",
    status: "Resolved",
    flaggedDate: "May 13, 2025",
    flaggedTime: "06:30 PM",
    thumbnail: <ClearSkinIcon />,
    platformLogo: <TikTokLogo />
  },
  {
    id: "5",
    claimText: "Increase your IQ by 40 points in just 3 days",
    badges: [
      { label: "Cognitive Claim", type: "purple" },
      { label: "Misleading", type: "red" }
    ],
    productName: "BrainBoost Pro",
    sku: "SKU: BBP-900",
    platform: "Facebook",
    platformType: "Ad",
    riskLevel: "High",
    status: "Dismissed",
    flaggedDate: "May 13, 2025",
    flaggedTime: "04:12 PM",
    thumbnail: <BrainBoostIcon />,
    platformLogo: <FacebookLogo />
  }
];

export default function FlaggedClaims() {
  const [selectedClaimId, setSelectedClaimId] = useState<string>("1");
  const [activeTab, setActiveTab] = useState<string>("All");

  return (
    <div className="bg-slate-50 min-h-full w-full font-sans pb-6">
      <div className="w-full max-w-full px-2.5 sm:px-4 md:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        


        {/* Title Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full select-none">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-lg border border-[#E0E7FF] bg-white flex items-center justify-center text-[#4F46E5] shadow-3xs shrink-0">
              <Shield className="h-5 w-5 fill-[#EEF2FF] text-[#4F46E5]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
                Flagged Claims
              </h1>
              <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
                Review and take action on claims that may be misleading, unverified, or policy-violating.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5 shrink-0">
            <button className="flex justify-center items-center gap-1.5 h-8.5 px-3.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-3xs transition whitespace-nowrap">
              <Download className="h-3.5 w-3.5 text-slate-400" /> Export Report
            </button>
            <button className="flex justify-center items-center gap-1.5 h-8.5 px-4 text-xs font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm transition whitespace-nowrap">
              <Filter className="h-3.5 w-3.5" /> Filters
            </button>
          </div>
        </div>

        {/* KPI Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 w-full">
          {/* Card 1: Total Flagged */}
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 sm:p-4 shadow-3xs flex items-center gap-3 w-full min-w-0">
            <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-red-50 text-red-550 flex items-center justify-center shrink-0">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Flagged</span>
              <span className="text-lg sm:text-2xl font-extrabold text-slate-900 mt-0.5 block">1,248</span>
              <span className="text-[9px] sm:text-[10px] text-red-650 font-bold block mt-0.5 leading-tight">
                ↑ 12% <span className="block sm:inline text-slate-400 font-medium text-[8px] sm:text-[10px]">from last 7 days</span>
              </span>
            </div>
          </div>

          {/* Card 2: Pending Review */}
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 sm:p-4 shadow-3xs flex items-center gap-3 w-full min-w-0">
            <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pending Review</span>
              <span className="text-lg sm:text-2xl font-extrabold text-slate-900 mt-0.5 block">436</span>
              <span className="text-[9px] sm:text-[10px] text-amber-600 font-bold block mt-0.5 leading-tight">
                ↑ 8% <span className="block sm:inline text-slate-400 font-medium text-[8px] sm:text-[10px]">from last 7 days</span>
              </span>
            </div>
          </div>

          {/* Card 3: High Priority */}
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 sm:p-4 shadow-3xs flex items-center gap-3 w-full min-w-0">
            <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Flag className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">High Priority</span>
              <span className="text-lg sm:text-2xl font-extrabold text-slate-900 mt-0.5 block">217</span>
              <span className="text-[9px] sm:text-[10px] text-red-650 font-bold block mt-0.5 leading-tight">
                ↑ 15% <span className="block sm:inline text-slate-400 font-medium text-[8px] sm:text-[10px]">from last 7 days</span>
              </span>
            </div>
          </div>

          {/* Card 4: Resolved */}
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 sm:p-4 shadow-3xs flex items-center gap-3 w-full min-w-0">
            <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-purple-50 text-purple-650 flex items-center justify-center shrink-0">
              <CheckSquare className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Resolved</span>
              <span className="text-lg sm:text-2xl font-extrabold text-slate-900 mt-0.5 block">594</span>
              <span className="text-[9px] sm:text-[10px] text-emerald-600 font-bold block mt-0.5 leading-tight">
                ↓ 10% <span className="block sm:inline text-slate-400 font-medium text-[8px] sm:text-[10px]">from last 7 days</span>
              </span>
            </div>
          </div>

          {/* Card 5: Dismissed */}
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 sm:p-4 shadow-3xs flex items-center gap-3 w-full min-w-0">
            <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-emerald-50/60 text-emerald-600 flex items-center justify-center shrink-0">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Dismissed</span>
              <span className="text-lg sm:text-2xl font-extrabold text-slate-900 mt-0.5 block">176</span>
              <span className="text-[9px] sm:text-[10px] text-emerald-600 font-bold block mt-0.5 leading-tight">
                ↓ 5% <span className="block sm:inline text-slate-400 font-medium text-[8px] sm:text-[10px]">from last 7 days</span>
              </span>
            </div>
          </div>
        </div>

        {/* Main Work Table Card */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-3xs overflow-hidden">
          
          {/* Tabs and Search Bar row */}
          <div className="px-5 py-4.5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none">
            {/* Left selector tabs */}
            <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-600">
              <button 
                onClick={() => setActiveTab("All")}
                className={cn(
                  "px-3 py-1.5 rounded-lg border transition",
                  activeTab === "All" 
                    ? "bg-indigo-50/50 text-[#4F46E5] border-indigo-150 shadow-3xs" 
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                )}
              >
                All (1,248)
              </button>

              <button 
                onClick={() => setActiveTab("High Priority")}
                className={cn(
                  "px-3 py-1.5 rounded-lg border transition",
                  activeTab === "High Priority" 
                    ? "bg-indigo-50/50 text-[#4F46E5] border-indigo-150 shadow-3xs" 
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                )}
              >
                High Priority (217)
              </button>

              <button 
                onClick={() => setActiveTab("Pending")}
                className={cn(
                  "px-3 py-1.5 rounded-lg border transition",
                  activeTab === "Pending" 
                    ? "bg-indigo-50/50 text-[#4F46E5] border-indigo-150 shadow-3xs" 
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                )}
              >
                Pending (436)
              </button>

              <button 
                onClick={() => setActiveTab("Resolved")}
                className={cn(
                  "px-3 py-1.5 rounded-lg border transition",
                  activeTab === "Resolved" 
                    ? "bg-indigo-50/50 text-[#4F46E5] border-indigo-150 shadow-3xs" 
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                )}
              >
                Resolved (594)
              </button>

              <button 
                onClick={() => setActiveTab("Dismissed")}
                className={cn(
                  "px-3 py-1.5 rounded-lg border transition",
                  activeTab === "Dismissed" 
                    ? "bg-indigo-50/50 text-[#4F46E5] border-indigo-150 shadow-3xs" 
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                )}
              >
                Dismissed (176)
              </button>
            </div>

            {/* Right side search inputs */}
            <div className="relative w-full sm:w-[220px]">
              <input
                type="text"
                placeholder="Search claims..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-9 py-1.5 text-xs text-slate-700 font-medium outline-none focus:bg-white focus:border-slate-350 transition-colors"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Sub Filters Toolbar row */}
          <div className="px-5 py-3.5 bg-[#FAFBFD] border-b border-slate-100 flex flex-wrap items-center gap-3 select-none">
            <div className="relative">
              <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer w-[120px]">
                <option>Claim Type</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer w-[120px]">
                <option>Platform</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer w-[120px]">
                <option>Risk Level</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer w-[120px]">
                <option>Status</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Date range picker */}
            <div className="relative flex items-center border border-slate-200 rounded-lg bg-white shadow-3xs overflow-hidden">
              <input
                type="text"
                placeholder="Date Range"
                className="border-0 bg-transparent py-1.5 pl-3 pr-9 text-xs font-bold text-slate-700 outline-none w-[135px] placeholder:text-slate-700"
              />
              <Calendar className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Clear All triggers */}
            <button className="text-xs font-bold text-[#4F46E5] hover:text-[#4338CA] transition ml-auto">
              Clear All
            </button>
          </div>

          {/* Main Table Wrapper */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/60 border-b border-slate-150 text-slate-455 font-bold uppercase tracking-wider text-[10px] select-none">
                  <th className="py-3 px-5 w-[5%] text-center"></th>
                  <th className="py-3 px-5 w-[35%]">Claim</th>
                  <th className="py-3 px-4 w-[16%]">Product / Source</th>
                  <th className="py-3 px-4 w-[12%]">Platform</th>
                  <th className="py-3 px-4 w-[10%] text-center">Risk Level</th>
                  <th className="py-3 px-4 w-[10%] text-center">Status</th>
                  <th className="py-3 px-4 w-[14%]">Flagged On</th>
                  <th className="py-3 px-5 w-[8%] text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {mockClaims.map((item) => {
                  const isSelected = item.id === selectedClaimId;
                  return (
                    <tr
                      key={item.id}
                      className={cn(
                        "hover:bg-slate-50/50 transition-colors cursor-pointer",
                        isSelected && "bg-[#F8FAFC]"
                      )}
                      onClick={() => setSelectedClaimId(item.id)}
                    >
                      <td className="py-4 px-5 text-center">
                        <button className="flex items-center justify-center mx-auto focus:outline-none">
                          {isSelected ? (
                            <span className="h-4 w-4 rounded-full bg-[#4F46E5] text-white flex items-center justify-center text-[9px] shadow-sm shadow-[#4f46e5]/40">
                              <Check className="h-2.5 w-2.5 stroke-[3]" />
                            </span>
                          ) : (
                            <span className="h-4 w-4 rounded-full border border-slate-300 hover:border-slate-400 bg-white block"></span>
                          )}
                        </button>
                      </td>
                      
                      <td className="py-4 px-5">
                        <div className="space-y-1.5">
                          <p className="text-xs font-bold text-slate-900 leading-normal max-w-[320px]">
                            "{item.claimText}"
                          </p>
                          <div className="flex flex-wrap gap-1.5 select-none">
                            {item.badges.map((b, idx) => (
                              <span
                                key={idx}
                                className={cn(
                                  "px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide border",
                                  b.type === "red" && "bg-red-50 text-red-600 border-red-100",
                                  b.type === "orange" && "bg-amber-50/60 text-amber-600 border-amber-100",
                                  b.type === "blue" && "bg-indigo-50/50 text-[#4F46E5] border-indigo-100",
                                  b.type === "purple" && "bg-purple-50 text-purple-650 border-purple-100"
                                )}
                              >
                                {b.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {item.thumbnail}
                          <div className="leading-tight min-w-0">
                            <span className="text-xs font-bold text-slate-900 block truncate">{item.productName}</span>
                            <span className="text-[10px] text-slate-400 font-medium block mt-0.5 truncate">{item.sku}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-slate-655 font-semibold">
                        <div className="flex items-center gap-2">
                          {item.platformLogo}
                          <div className="leading-tight">
                            <span className="text-slate-900 block">{item.platform}</span>
                            <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{item.platformType}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-center select-none">
                        <span className={cn(
                          "inline-flex justify-center px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide border",
                          item.riskLevel === "High" && "bg-red-50 text-red-600 border-red-100",
                          item.riskLevel === "Medium" && "bg-amber-50 text-amber-600 border-amber-100",
                          item.riskLevel === "Low" && "bg-emerald-50 text-emerald-600 border-emerald-100"
                        )}>
                          {item.riskLevel}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-center select-none">
                        <span className={cn(
                          "inline-flex justify-center px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wide",
                          item.status === "Pending" && "bg-amber-50 text-amber-600",
                          item.status === "Resolved" && "bg-emerald-50 text-emerald-600",
                          item.status === "Dismissed" && "bg-slate-100 text-slate-600"
                        )}>
                          {item.status}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-[11px] leading-tight font-medium text-slate-500">
                        <span className="text-slate-800 font-semibold block">{item.flaggedDate}</span>
                        <span className="text-slate-400 block mt-0.5">{item.flaggedTime}</span>
                      </td>

                      <td className="py-4 px-5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button className="h-7 w-7 rounded-lg border border-slate-200 hover:bg-white flex items-center justify-center text-slate-455 hover:text-slate-700 bg-slate-50/50 shadow-3xs transition">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button className="h-7 w-7 rounded-lg border border-slate-200 hover:bg-white flex items-center justify-center text-slate-455 hover:text-slate-700 bg-slate-50/50 shadow-3xs transition">
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

          {/* Table Footer Pagination */}
          <div className="px-5 py-4.5 border-t border-slate-100 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white text-slate-455 font-bold select-none">
            <span className="text-[11px] font-bold text-slate-400">
              Showing 1 to 10 of 1,248 results
            </span>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-650 outline-none cursor-pointer shadow-3xs hover:bg-slate-50 transition">
                  <option>10 / page</option>
                  <option>25 / page</option>
                  <option>50 / page</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>

              <div className="flex items-center gap-1">
                <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-400">
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button className="h-8 w-8 rounded-lg bg-[#4F46E5] text-white flex items-center justify-center text-xs font-bold shadow-sm">1</button>
                <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-semibold hover:bg-slate-50 transition text-slate-600">2</button>
                <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-semibold hover:bg-slate-50 transition text-slate-600">3</button>
                <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-semibold hover:bg-slate-50 transition text-slate-600">4</button>
                <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-semibold hover:bg-slate-50 transition text-slate-600">5</button>
                <span className="px-1.5 text-slate-300 text-xs">...</span>
                <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-semibold hover:bg-slate-50 transition text-slate-600">125</button>
                <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-400">
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
