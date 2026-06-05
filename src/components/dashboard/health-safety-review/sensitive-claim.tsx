"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Users,
  Clock,
  RefreshCw,
  Sparkles,
  Download,
  Filter,
  Search,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Edit3,
  Check,
  ExternalLink,
  Info,
  ShieldCheck,
  AlertCircle,
  Flag
} from "lucide-react";

interface ClaimQueueItem {
  id: string;
  productName: string;
  brand: string;
  category: string;
  claimType: string;
  riskLevel: string;
  riskLevelType: "low" | "medium" | "high" | "medical";
  evidenceCount: number;
  confidence: number;
  sourceReview: string;
  status: "Pending" | "Needs Review" | "Approved" | "Escalated" | "Rejected";
  thumbnail: React.ReactNode;
}

// Brand SVG Product Icons
const SerumIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-amber-600 bg-amber-50 rounded-lg p-1.5 border border-slate-150 shrink-0">
    <rect x="12" y="14" width="8" height="13" rx="2" fill="#D97706" />
    <path d="M14 14v-6h4v6" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="13" y="4" width="6" height="3" rx="0.5" fill="#475569" />
  </svg>
);

const CeraVeIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-blue-600 bg-blue-50 rounded-lg p-1.5 border border-slate-150 shrink-0">
    <rect x="8" y="12" width="16" height="15" rx="2.5" fill="#3B82F6" />
    <rect x="10" y="8" width="12" height="4" rx="0.5" fill="#1D4ED8" />
  </svg>
);

const NatureMadeIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-emerald-600 bg-emerald-50 rounded-lg p-1.5 border border-slate-150 shrink-0">
    <rect x="10" y="10" width="12" height="17" rx="3" fill="#10B981" />
    <ellipse cx="16" cy="15" rx="4" ry="2" fill="#fff" opacity="0.9" />
  </svg>
);

const OatsIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-amber-700 bg-amber-50 rounded-lg p-1.5 border border-slate-150 shrink-0">
    <path d="M8 8h16v18H8z" fill="#F59E0B" />
    <circle cx="16" cy="17" r="3" fill="#D97706" />
  </svg>
);

const GummiesIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-rose-600 bg-rose-50 rounded-lg p-1.5 border border-slate-150 shrink-0">
    <rect x="10" y="12" width="12" height="15" rx="3" fill="#F43F5E" />
    <rect x="12" y="7" width="8" height="5" rx="1.5" fill="#BE123C" />
  </svg>
);

const GlowIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-yellow-600 bg-yellow-50 rounded-lg p-1.5 border border-slate-150 shrink-0">
    <rect x="11" y="13" width="10" height="14" rx="2" fill="#EAB308" />
    <path d="M13 13v-5h6v5" stroke="#CA8A04" strokeWidth="1.5" />
  </svg>
);

const SlimFitIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-pink-600 bg-pink-50 rounded-lg p-1.5 border border-slate-150 shrink-0">
    <path d="M10 8h12l-2 19H12L10 8z" fill="#EC4899" />
    <ellipse cx="16" cy="8" rx="6" ry="1.5" fill="#BE185D" />
  </svg>
);

const SunscreenIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-sky-600 bg-sky-50 rounded-lg p-1.5 border border-slate-150 shrink-0">
    <rect x="10" y="11" width="12" height="16" rx="2.5" fill="#0EA5E9" />
    <circle cx="16" cy="18" r="3" fill="#fff" opacity="0.9" />
  </svg>
);

const mockClaimsQueue: ClaimQueueItem[] = [
  {
    id: "1",
    productName: "CeraVe Moisturizing Cream",
    brand: "CeraVe",
    category: "Skincare",
    claimType: "Hydration",
    riskLevel: "Low",
    riskLevelType: "low",
    evidenceCount: 5,
    confidence: 86,
    sourceReview: "Target",
    status: "Pending",
    thumbnail: <CeraVeIcon />
  },
  {
    id: "2",
    productName: "NatureMade Cholesterol Support",
    brand: "NatureMade",
    category: "Supplements",
    claimType: "Health Benefit",
    riskLevel: "High",
    riskLevelType: "high",
    evidenceCount: 12,
    confidence: 72,
    sourceReview: "Amazon",
    status: "Needs Review",
    thumbnail: <NatureMadeIcon />
  },
  {
    id: "3",
    productName: "ProGlow Acne Serum",
    brand: "ProGlow Labs",
    category: "Skincare",
    claimType: "Treatment Claim",
    riskLevel: "Medical Claims",
    riskLevelType: "medical",
    evidenceCount: 8,
    confidence: 48,
    sourceReview: "Walmart",
    status: "Needs Review",
    thumbnail: <SerumIcon />
  },
  {
    id: "4",
    productName: "Instant Oats+",
    brand: "Oats Brand",
    category: "Food",
    claimType: "Heart Health",
    riskLevel: "Medium",
    riskLevelType: "medium",
    evidenceCount: 6,
    confidence: 61,
    sourceReview: "Amazon",
    status: "Pending",
    thumbnail: <OatsIcon />
  },
  {
    id: "5",
    productName: "Kids Immunity Gummies",
    brand: "Gummies Co",
    category: "Supplements",
    claimType: "Immune Support",
    riskLevel: "Low",
    riskLevelType: "low",
    evidenceCount: 4,
    confidence: 84,
    sourceReview: "Target",
    status: "Approved",
    thumbnail: <GummiesIcon />
  },
  {
    id: "6",
    productName: "Glow Bright Vitamin C Serum",
    brand: "Glow Brand",
    category: "Beauty",
    claimType: "Brightening",
    riskLevel: "Low",
    riskLevelType: "low",
    evidenceCount: 3,
    confidence: 78,
    sourceReview: "Sephora",
    status: "Approved",
    thumbnail: <GlowIcon />
  },
  {
    id: "7",
    productName: "SlimFit Protein Powder",
    brand: "SlimFit",
    category: "Supplements",
    claimType: "Weight Management",
    riskLevel: "High",
    riskLevelType: "high",
    evidenceCount: 9,
    confidence: 40,
    sourceReview: "GNC",
    status: "Escalated",
    thumbnail: <SlimFitIcon />
  },
  {
    id: "8",
    productName: "Pure Shield Sunscreen SPF 50",
    brand: "Pure Shield",
    category: "Skincare",
    claimType: "Safety Promise",
    riskLevel: "Medium",
    riskLevelType: "medium",
    evidenceCount: 5,
    confidence: 66,
    sourceReview: "Ulta",
    status: "Rejected",
    thumbnail: <SunscreenIcon />
  }
];

export default function SensitiveClaimReview() {
  const [selectedClaim, setSelectedClaim] = useState<ClaimQueueItem>(mockClaimsQueue[2]);
  const [notes, setNotes] = useState<string>("");

  return (
    <div className="bg-[#FAFBFD] min-h-full w-full font-sans pb-6">
      <div className="w-full max-w-full px-3 sm:px-4 md:px-5 py-4 md:py-6 space-y-4 md:space-y-6">
        
        {/* Title Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full select-none">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl border border-[#EEF2FF] bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5] shadow-3xs shrink-0">
              <FileText className="h-5 w-5 fill-[#EEF2FF] text-[#4F46E5]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
                Sensitive Claim Review
              </h1>
              <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
                Review sensitive product claims, validate evidence, and approve or reject product-facing health and safety messaging before publishing.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 shrink-0 select-none">
            <button className="flex justify-center items-center gap-1.5 h-9 px-3.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-3xs transition whitespace-nowrap">
              <RefreshCw className="h-3.5 w-3.5 text-slate-400" /> Refresh Queue
            </button>
            <button className="flex justify-center items-center gap-1.5 h-9 px-3.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-3xs transition whitespace-nowrap">
              <Sparkles className="h-3.5 w-3.5 text-slate-400" /> Run Re-analysis
            </button>
            <button className="flex justify-center items-center gap-1.5 h-9 px-4 text-xs font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm transition whitespace-nowrap">
              <Download className="h-3.5 w-3.5" /> Export Review Summary
            </button>
          </div>
        </div>

        {/* 6 Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 w-full">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-3xs flex items-center gap-3 w-full min-w-0">
            <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-655 flex items-center justify-center shrink-0">
              <FileText className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Pending Claims</span>
              <span className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5 block">128</span>
              <span className="text-[8px] text-red-600 font-bold block mt-0.5">
                ↑ 18 <span className="text-slate-400 font-medium">vs last 7 days</span>
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-3xs flex items-center gap-3 w-full min-w-0">
            <div className="h-9 w-9 rounded-xl bg-red-50 text-red-555 flex items-center justify-center shrink-0">
              <AlertTriangle className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">High Risk Claims</span>
              <span className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5 block">22</span>
              <span className="text-[8px] text-red-600 font-bold block mt-0.5">
                ↑ 6 <span className="text-slate-400 font-medium">vs last 7 days</span>
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-3xs flex items-center gap-3 w-full min-w-0">
            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-650 flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Approved Today</span>
              <span className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5 block">34</span>
              <span className="text-[8px] text-emerald-600 font-bold block mt-0.5">
                ↑ 9 <span className="text-slate-400 font-medium">vs yesterday</span>
              </span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-3xs flex items-center gap-3 w-full min-w-0">
            <div className="h-9 w-9 rounded-xl bg-red-50 text-red-555 flex items-center justify-center shrink-0">
              <XCircle className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Rejected Today</span>
              <span className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5 block">11</span>
              <span className="text-[8px] text-emerald-600 font-bold block mt-0.5">
                ↓ 2 <span className="text-slate-400 font-medium">vs yesterday</span>
              </span>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-3xs flex items-center gap-3 w-full min-w-0">
            <div className="h-9 w-9 rounded-xl bg-purple-50 text-purple-655 flex items-center justify-center shrink-0">
              <Users className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Escalated Medical</span>
              <span className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5 block">7</span>
              <span className="text-[8px] text-red-655 font-bold block mt-0.5">
                ↑ 2 <span className="text-slate-400 font-medium">vs yesterday</span>
              </span>
            </div>
          </div>

          {/* Card 6 */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-3xs flex items-center gap-3 w-full min-w-0">
            <div className="h-9 w-9 rounded-xl bg-blue-50 text-[#4F46E5] flex items-center justify-center shrink-0">
              <Clock className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Avg. Review Time</span>
              <span className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5 block">2h 14m</span>
              <span className="text-[8px] text-emerald-655 font-bold block mt-0.5">
                ↓ 18m <span className="text-slate-400 font-medium">vs last 7 days</span>
              </span>
            </div>
          </div>
        </div>

        {/* Master Flex layout for two columns */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 w-full items-stretch lg:items-start">
          
          {/* Left Column (Claims Queue table & double sub-grid) */}
          <div className="flex-1 w-full min-w-0 space-y-4 sm:space-y-5">
            
            {/* Table Card */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-3xs overflow-hidden">
              {/* Header Title */}
              <div className="px-4 py-3 border-b border-slate-100 flex flex-col gap-3 select-none">
                <h2 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Sensitive Claims Queue</h2>
                
                {/* Search & dropdown toolbar */}
                <div className="flex flex-wrap gap-2.5 items-center">
                  <div className="relative">
                    <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer w-[125px]">
                      <option>Risk Level: All</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>
                  <div className="relative">
                    <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer w-[120px]">
                      <option>Category: All</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>
                  <div className="relative">
                    <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer w-[120px]">
                      <option>Claim Type: All</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>
                  <div className="relative">
                    <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer w-[120px]">
                      <option>Confidence: All</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>
                  <div className="relative flex-1 min-w-[140px]">
                    <input
                      type="text"
                      placeholder="Search claims..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs text-slate-700 font-medium outline-none focus:bg-white focus:border-slate-350 transition-colors"
                    />
                    <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div className="overflow-x-auto w-full">
                <table className="w-full min-w-[750px] text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/60 border-b border-slate-150 text-slate-400 font-bold uppercase tracking-wider text-[10px] select-none">
                      <th className="py-3 px-3 w-[4%] text-center">
                        <input type="checkbox" className="rounded border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5 cursor-pointer" />
                      </th>
                      <th className="py-3 px-3 w-[26%]">Product</th>
                      <th className="py-3 px-3 w-[12%]">Category</th>
                      <th className="py-3 px-3 w-[16%]">Claim Type</th>
                      <th className="py-3 px-3 w-[12%]">Risk Level</th>
                      <th className="py-3 px-3 w-[8%] text-center">Evidence Count</th>
                      <th className="py-3 px-3 w-[8%] text-center">Confidence</th>
                      <th className="py-3 px-3 w-[10%]">Source Review</th>
                      <th className="py-3 px-3 w-[10%] text-center">Status</th>
                      <th className="py-3 px-3 w-[4%] text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {mockClaimsQueue.map((item) => {
                      const isSelected = item.id === selectedClaim.id;
                      return (
                        <tr
                          key={item.id}
                          className={cn(
                            "hover:bg-slate-50/40 transition-colors cursor-pointer",
                            isSelected ? "bg-blue-50/40" : ""
                          )}
                          onClick={() => setSelectedClaim(item)}
                        >
                          <td className="py-3 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => setSelectedClaim(item)}
                              className="rounded border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5 cursor-pointer"
                            />
                          </td>
                          
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2.5 min-w-0">
                              {item.thumbnail}
                              <div className="leading-tight min-w-0">
                                <span className="text-xs font-bold text-slate-900 block truncate max-w-[130px]">{item.productName}</span>
                                <span className="text-[9px] text-slate-400 font-medium block mt-0.5 truncate">{item.brand}</span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-3 text-slate-655 font-semibold">
                            {item.category}
                          </td>

                          <td className="py-3 px-3 text-slate-655">
                            {item.claimType}
                          </td>

                          <td className="py-3 px-3 select-none">
                            <span className={cn(
                              "inline-flex justify-center px-2.5 py-0.5 rounded text-[9px] font-extrabold tracking-wide uppercase border",
                              item.riskLevelType === "low" && "bg-emerald-50 text-emerald-600 border-emerald-100",
                              item.riskLevelType === "medium" && "bg-amber-50 text-amber-600 border-amber-100",
                              item.riskLevelType === "high" && "bg-red-50/60 text-red-655 border-red-100",
                              item.riskLevelType === "medical" && "bg-red-50 text-red-600 border-red-100"
                            )}>
                              {item.riskLevel}
                            </span>
                          </td>

                          <td className="py-3 px-3 text-center font-bold">
                            {item.evidenceCount}
                          </td>

                          <td className="py-3 px-3 text-center font-bold">
                            <span className={cn(
                              item.confidence >= 80 ? "text-emerald-600" : item.confidence >= 60 ? "text-amber-550" : "text-red-550"
                            )}>
                              {item.confidence}%
                            </span>
                          </td>

                          <td className="py-3 px-3 text-slate-655">
                            {item.sourceReview}
                          </td>

                          <td className="py-3 px-3 text-center select-none" onClick={(e) => e.stopPropagation()}>
                            <span className={cn(
                              "inline-flex justify-center px-2 py-0.5 rounded text-[9px] font-extrabold tracking-wide uppercase",
                              item.status === "Pending" && "bg-amber-50 text-amber-550",
                              item.status === "Needs Review" && "bg-orange-50 text-orange-500",
                              item.status === "Approved" && "bg-emerald-50 text-emerald-600",
                              item.status === "Escalated" && "bg-purple-50 text-purple-650",
                              item.status === "Rejected" && "bg-slate-100 text-slate-500"
                            )}>
                              {item.status}
                            </span>
                          </td>

                          <td className="py-3 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                            <button className="h-7 w-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination footer */}
              <div className="px-4 py-3 border-t border-slate-100 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white text-slate-400 font-bold select-none">
                <span className="text-[11px] font-bold text-slate-400">
                  Showing 1 to 8 of 128 claims
                </span>
                
                <div className="flex items-center gap-4">
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
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-semibold hover:bg-slate-50 transition text-slate-600">16</button>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-455">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="relative">
                    <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-655 outline-none cursor-pointer hover:bg-slate-50 transition shadow-3xs">
                      <option>10 / page</option>
                      <option>25 / page</option>
                      <option>50 / page</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

            </div>

            {/* Side-by-side Grid: Claim Type Breakdown & Sensitive Claim Validation Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 w-full">
              
              {/* Claim Type Breakdown */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex flex-col justify-between">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-4">Claim Type Breakdown</h3>
                
                <div className="flex items-center justify-center gap-6">
                  {/* Donut graphic */}
                  <div className="relative h-28 w-28 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                      {/* Gray background circle */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F1F5F9" strokeWidth="4.2" />
                      
                      {/* Segments: total 100% */}
                      {/* Segment 1: Red (Medical) 31.3% -> length 31.3, offset 0 */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#EF4444" strokeWidth="4.2" strokeDasharray="31.3 68.7" strokeDashoffset="0" />
                      {/* Segment 2: Blue (Safety Promise) 21.9% -> length 21.9, offset 31.3 -> dashoffset = 100 - 31.3 = 68.7 */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3B82F6" strokeWidth="4.2" strokeDasharray="21.9 78.1" strokeDashoffset="-31.3" />
                      {/* Segment 3: Green (Ingredient Benefit) 18.8% -> length 18.8, offset 53.2 */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10B981" strokeWidth="4.2" strokeDasharray="18.8 81.2" strokeDashoffset="-53.2" />
                      {/* Segment 4: Yellow (Time-based Claim) 15.6% -> length 15.6, offset 72 */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F59E0B" strokeWidth="4.2" strokeDasharray="15.6 84.4" strokeDashoffset="-72" />
                      {/* Segment 5: Purple (Doctor Rec) 12.5% -> length 12.5, offset 87.6 */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#8B5CF6" strokeWidth="4.2" strokeDasharray="12.5 87.5" strokeDashoffset="-87.6" />
                    </svg>
                    <div className="absolute text-center leading-none">
                      <span className="text-lg font-extrabold text-slate-900 block">128</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wide mt-0.5 block">Total</span>
                    </div>
                  </div>

                  {/* Legends list */}
                  <div className="space-y-1.5 text-[9.5px] font-bold text-slate-655 w-full">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500 shrink-0"></span>
                        <span>Medical / Therapeutic</span>
                      </div>
                      <span className="text-slate-900">40 <span className="text-slate-400 font-medium">(31.3%)</span></span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-blue-500 shrink-0"></span>
                        <span>Safety Promise</span>
                      </div>
                      <span className="text-slate-900">28 <span className="text-slate-400 font-medium">(21.9%)</span></span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                        <span>Ingredient Benefit</span>
                      </div>
                      <span className="text-slate-900">24 <span className="text-slate-400 font-medium">(18.8%)</span></span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500 shrink-0"></span>
                        <span>Time-based Claim</span>
                      </div>
                      <span className="text-slate-900">20 <span className="text-slate-400 font-medium">(15.6%)</span></span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-purple-500 shrink-0"></span>
                        <span>Doctor Recommended</span>
                      </div>
                      <span className="text-slate-900">16 <span className="text-slate-400 font-medium">(12.5%)</span></span>
                    </div>
                  </div>
                </div>

                <button className="w-full text-center text-[10px] font-bold text-[#4F46E5] hover:text-[#4338CA] transition mt-4 select-none">
                  View full breakdown →
                </button>
              </div>

              {/* Validation Checklist Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex flex-col justify-between select-none">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-4">Sensitive Claim Validation Checklist</h3>
                
                <div className="space-y-3 flex-1">
                  <div className="flex items-start gap-2.5 text-xs font-semibold text-slate-800">
                    <span className="h-4.5 w-4.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-3xs shrink-0 select-none">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                    <span>Verify evidence quality and relevance</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs font-semibold text-slate-800">
                    <span className="h-4.5 w-4.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-3xs shrink-0 select-none">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                    <span>Confirm no disease-treatment or cure language</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs font-semibold text-slate-800">
                    <span className="h-4.5 w-4.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-3xs shrink-0 select-none">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                    <span>Confirm presence of appropriate disclaimer</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs font-semibold text-slate-800">
                    <span className="h-4.5 w-4.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-3xs shrink-0 select-none">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                    <span>Validate ingredient relevance and dosages</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs font-semibold text-slate-800">
                    <span className="h-4.5 w-4.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-3xs shrink-0 select-none">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                    <span>Review regulatory and platform policy risk</span>
                  </div>
                </div>

                <button className="w-full text-center text-[10px] font-bold text-[#4F46E5] hover:text-[#4338CA] transition mt-4 select-none">
                  View checklist guide →
                </button>
              </div>

            </div>

          </div>

          {/* Right Column: Claim Review Detail Card */}
          <div className="w-full lg:w-[480px] xl:w-[500px] bg-white border border-slate-200 rounded-xl shadow-3xs overflow-hidden shrink-0 flex flex-col">
            <div className="px-5 py-4 border-b border-slate-100">
              <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Claim Review Detail</h3>
            </div>

            {/* Content Body */}
            <div className="p-5 space-y-4 flex-1 overflow-y-auto">
              
              {/* Product Info top header */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-start gap-3 min-w-0">
                  {selectedClaim.thumbnail}
                  <div className="leading-tight min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{selectedClaim.productName}</h4>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-0.5 truncate">{selectedClaim.category} • {selectedClaim.claimType}</span>
                    <div className="flex items-center gap-1.5 mt-1.5 text-[10px] font-semibold text-slate-500">
                      <span className="text-slate-400 font-medium">Brand:</span>
                      <span className="text-slate-800 font-bold">{selectedClaim.brand}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[10px] font-semibold text-slate-500">
                      <span className="text-slate-400 font-medium">Sources:</span>
                      <span className="text-slate-800 font-semibold truncate max-w-[140px] flex items-center gap-1">
                        {selectedClaim.sourceReview} • Amazon • <span className="text-indigo-650 hover:underline cursor-pointer">website.com</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score meters */}
                <div className="flex items-center gap-2.5 shrink-0 select-none">
                  <div className="bg-slate-50/50 border border-slate-100 rounded-lg p-2 text-center w-[90px] shadow-3xs">
                    <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wide block">Health / Safety Score</span>
                    <span className="text-base font-extrabold text-red-650 block mt-1">42 / 100</span>
                    <span className="text-[8px] text-red-600 font-bold block mt-0.5 uppercase">High Risk</span>
                  </div>
                  <div className="bg-slate-50/50 border border-slate-100 rounded-lg p-2 text-center w-[75px] shadow-3xs">
                    <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wide block">Confidence</span>
                    <span className="text-base font-extrabold text-amber-600 block mt-1">{selectedClaim.confidence}%</span>
                    <span className="text-[8px] text-amber-600 font-bold block mt-0.5 uppercase">Low</span>
                  </div>
                </div>
              </div>

              {/* Warning Under Review Copy Box */}
              <div className="bg-red-50/40 border border-red-100 rounded-xl p-4 space-y-1 relative overflow-hidden">
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-red-655 uppercase tracking-wider">
                  <AlertTriangle className="h-3.5 w-3.5 fill-red-50 text-red-650 shrink-0" />
                  Claim Under Review
                </div>
                <p className="text-[11px] font-bold text-red-600 italic leading-relaxed">
                  "Helps treat acne and visibly reduce inflammation in 7 days."
                </p>
                <span className="text-[9px] text-slate-400 font-medium block mt-1">
                  This claim may imply a medical or therapeutic outcome and requires careful review for compliance.
                </span>
              </div>

              {/* Analysis & Risk Breakdown Subgrid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-slate-100 pb-4">
                {/* Claim Analysis */}
                <div className="space-y-1.5">
                  <h5 className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                    Claim Analysis
                  </h5>
                  <p className="text-[10px] font-medium text-slate-600 leading-normal">
                    AI analysis indicates this claim implies treatment of a skin condition (acne) and guarantees results within a specific timeframe. Clinical evidence provided is insufficient to substantiate treatment or outcome claims.
                  </p>
                </div>

                {/* Risk Factors */}
                <div className="space-y-1.5">
                  <h5 className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                    Risk Factors
                  </h5>
                  <ul className="space-y-1 text-[10px] font-semibold text-slate-600 list-disc pl-4 leading-normal">
                    <li>Implies treatment of a medical condition (acne).</li>
                    <li>Specific timeframe claim ("in 7 days").</li>
                    <li>Insufficient clinical evidence provided.</li>
                    <li>Potential regulatory sensitivity (FDA/FTC).</li>
                  </ul>
                </div>

                {/* Suggested Safer Wording */}
                <div className="space-y-1.5">
                  <h5 className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    Suggested Safer Wording
                  </h5>
                  <div className="text-[9.5px] font-medium text-slate-600 space-y-1 bg-slate-50/50 border border-slate-100 rounded-lg p-2">
                    <p>1. Helps support clearer-looking skin over time.*</p>
                    <p>2. Helps reduce the look of blemishes with regular use.*</p>
                    <p>3. Formulated to help support the appearance of clearer skin.*</p>
                    <p className="text-[8px] text-slate-400 mt-1 italic">*With consistent use.</p>
                  </div>
                </div>

                {/* Evidence Sources */}
                <div className="space-y-1.5">
                  <h5 className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                    Evidence Sources
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold border bg-indigo-50/50 text-[#4F46E5] border-indigo-100">Ingredient Database</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold border bg-indigo-50/50 text-[#4F46E5] border-indigo-100">Dermatology Source</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold border bg-indigo-50/50 text-[#4F46E5] border-indigo-100">Retailer Copy</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold border bg-purple-50 text-purple-650 border-purple-100">Expert Review</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold border bg-red-50 text-red-600 border-red-100">User Complaints</span>
                  </div>
                </div>
              </div>

              {/* Review notes and Policy Reminder */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {/* Notes */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-550 block">Reviewer Notes</label>
                  <div className="relative">
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value.slice(0, 1200))}
                      placeholder="Add notes, observations, and references..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 outline-none focus:bg-white focus:border-slate-350 transition-colors resize-none placeholder:text-slate-400 font-medium"
                    />
                    <span className="absolute bottom-1.5 right-2 text-[8px] font-semibold text-slate-400">
                      {notes.length} / 1200
                    </span>
                  </div>
                </div>

                {/* Policy reminder */}
                <div className="bg-[#EEF2FF] border border-[#E0E7FF] rounded-xl p-3.5 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-[#4F46E5] uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-[#4F46E5]" />
                      Policy Reminder
                    </span>
                    <p className="text-[9.5px] font-medium text-[#4338CA] leading-relaxed">
                      Do not allow claims that diagnose, treat, cure, or prevent any disease or medical condition. Avoid guaranteed results or specific time-based promises.
                    </p>
                  </div>
                  <button className="text-[9.5px] font-bold text-[#4F46E5] hover:text-[#4338CA] transition mt-2 flex items-center gap-1 self-start select-none">
                    View Claim Policy <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Actions Row */}
            <div className="p-4 border-t border-slate-100 bg-[#FAFBFD] flex flex-wrap gap-2 justify-between select-none">
              <button className="flex-1 min-w-[130px] flex items-center justify-center gap-1 h-9 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition">
                <Check className="h-4 w-4" /> Approve with Disclaimer
              </button>
              <button className="flex-1 min-w-[70px] flex items-center justify-center gap-1 h-9 text-xs font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm transition">
                <Edit3 className="h-3.5 w-3.5" /> Edit Claim
              </button>
              <button className="flex-1 min-w-[85px] flex items-center justify-center gap-1 h-9 text-xs font-bold text-white bg-[#EF4444] hover:bg-[#DC2626] rounded-lg shadow-sm transition">
                <XCircle className="h-3.5 w-3.5" /> Reject Claim
              </button>
              <button className="flex-1 min-w-[95px] flex items-center justify-center gap-1 h-9 text-xs font-bold text-white bg-[#F59E0B] hover:bg-[#D97706] rounded-lg shadow-sm transition">
                <Users className="h-3.5 w-3.5" /> Escalate Review
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Panel containing only Recent Decisions card */}
        <div className="w-full max-w-2xl">
          
          {/* Recent Decisions Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs">
            <div className="flex justify-between items-center mb-4 select-none">
              <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Recent Decisions</h3>
              <span className="text-[10px] font-bold text-[#4F46E5] hover:text-[#4338CA] cursor-pointer">View all</span>
            </div>

            <div className="divide-y divide-slate-100 text-[11px] text-slate-700">
              
              {/* Decision 1 */}
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2 w-28 shrink-0 select-none">
                  <div className="h-4.5 w-4.5 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-white stroke-[3.5]" />
                  </div>
                  <span className="text-emerald-600 font-bold">Approved</span>
                </div>
                <div className="flex-1 min-w-0 pr-4">
                  <span className="text-slate-700 font-semibold truncate block">Pure Shield Sunscreen SPF 50 – Safety Promise</span>
                </div>
                <div className="w-32 shrink-0 text-slate-400 font-medium">
                  by Sarah Johnson
                </div>
                <div className="w-16 shrink-0 text-right text-slate-400 font-medium">
                  1h ago
                </div>
              </div>
 
              {/* Decision 2 */}
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2 w-28 shrink-0 select-none">
                  <XCircle className="h-4.5 w-4.5 text-red-500 shrink-0" />
                  <span className="text-red-500 font-bold">Rejected</span>
                </div>
                <div className="flex-1 min-w-0 pr-4">
                  <span className="text-slate-700 font-semibold truncate block">HairRevive Shampoo – Hair Regrowth Claim</span>
                </div>
                <div className="w-32 shrink-0 text-slate-400 font-medium">
                  by Michael Chen
                </div>
                <div className="w-16 shrink-0 text-right text-slate-400 font-medium">
                  3h ago
                </div>
              </div>
 
              {/* Decision 3 */}
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2 w-28 shrink-0 select-none">
                  <Flag className="h-4 w-4 text-purple-650 shrink-0" />
                  <span className="text-purple-650 font-bold">Escalated</span>
                </div>
                <div className="flex-1 min-w-0 pr-4">
                  <span className="text-slate-700 font-semibold truncate block">HeartOmega Fish Oil – Heart Health Claim</span>
                </div>
                <div className="w-32 shrink-0 text-slate-400 font-medium">
                  by Dr. Emily Davis
                </div>
                <div className="w-16 shrink-0 text-right text-slate-400 font-medium">
                  5h ago
                </div>
              </div>
 
              {/* Decision 4 */}
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2 w-28 shrink-0 select-none">
                  <Clock className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                  <span className="text-orange-500 font-bold">Needs Review</span>
                </div>
                <div className="flex-1 min-w-0 pr-4">
                  <span className="text-slate-700 font-semibold truncate block">Calm Sleep Gummies – Sleep Aid Claim</span>
                </div>
                <div className="w-32 shrink-0 text-slate-400 font-medium">
                  by Daniel Kim
                </div>
                <div className="w-16 shrink-0 text-right text-slate-400 font-medium">
                  7h ago
                </div>
              </div>
 
              {/* Decision 5 */}
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2 w-28 shrink-0 select-none">
                  <div className="h-4.5 w-4.5 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-white stroke-[3.5]" />
                  </div>
                  <span className="text-emerald-600 font-bold">Approved</span>
                </div>
                <div className="flex-1 min-w-0 pr-4">
                  <span className="text-slate-700 font-semibold truncate block">Glow Bright Vitamin C Serum – Brightening Claim</span>
                </div>
                <div className="w-32 shrink-0 text-slate-400 font-medium">
                  by Aisha Patel
                </div>
                <div className="w-16 shrink-0 text-right text-slate-400 font-medium">
                  9h ago
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
