"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Flag,
  Shield,
  Copy,
  TrendingUp,
  AlertCircle,
  TrendingDown,
  RefreshCw,
  Play,
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Check,
  Eye,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Brain,
  MessageSquare,
  HelpCircle
} from "lucide-react";

interface PatternItem {
  id: string;
  productName: string;
  category: string;
  patternType: string;
  trustScore: number;
  severity: "Low" | "Medium" | "High";
  evidenceCount: number;
  source: string;
  status: "Pending" | "Needs Review" | "Dismissed";
  thumbnail: React.ReactNode;
  brand: string;
  description: string;
  signals: string[];
  evidenceSamples: string[];
  timeline: { date: string; count: number }[];
}

const HeadphoneIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-blue-600 bg-blue-50 rounded-lg p-1.5 border border-slate-150 shrink-0">
    <path d="M6 18c0-5.5 4.5-10 10-10s10 4.5 10 10M6 18h4v6H6v-6zm16 0h4v6h-4v-6z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CreamIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-emerald-600 bg-emerald-50 rounded-lg p-1.5 border border-slate-150 shrink-0">
    <rect x="10" y="10" width="12" height="15" rx="2" fill="currentColor" opacity="0.8" />
    <path d="M12 10v-3h8v3" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const FryerIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-amber-600 bg-amber-50 rounded-lg p-1.5 border border-slate-150 shrink-0">
    <rect x="8" y="10" width="16" height="15" rx="3" fill="currentColor" opacity="0.8" />
    <circle cx="16" cy="15" r="2.5" fill="#fff" />
  </svg>
);

const AirPodsIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-indigo-600 bg-indigo-50 rounded-lg p-1.5 border border-slate-150 shrink-0">
    <path d="M9 10a3 3 0 0 1 6 0v8a3 3 0 0 1-6 0M17 10a3 3 0 0 1 6 0v8a3 3 0 0 1-6 0" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

const MonitorIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-slate-600 bg-slate-50 rounded-lg p-1.5 border border-slate-150 shrink-0">
    <rect x="6" y="8" width="20" height="13" rx="1.5" fill="currentColor" opacity="0.8" />
    <path d="M12 21h8M16 21v4" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const PotIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-purple-600 bg-purple-50 rounded-lg p-1.5 border border-slate-150 shrink-0">
    <rect x="8" y="12" width="16" height="12" rx="2" fill="currentColor" opacity="0.8" />
    <path d="M12 12V9h8v3" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const mockPatterns: PatternItem[] = [
  {
    id: "1",
    productName: "Sony WH-1000XM5",
    brand: "Sony",
    category: "Electronics",
    patternType: "Repeated wording",
    trustScore: 32,
    severity: "High",
    evidenceCount: 36,
    source: "Amazon",
    status: "Pending",
    thumbnail: <HeadphoneIcon />,
    description: "Repeated wording detected across 36 reviews. High similarity phrases found in multiple reviews within short time windows.",
    signals: [
      "Repeated phrasing across reviews",
      "Abrupt review velocity increase",
      "Low verified purchase ratio (18%)",
      "Duplicated sentence patterns"
    ],
    evidenceSamples: [
      "The noise cancellation is incredible and battery lasts all day. Best headphones...",
      "Noise canceling is amazing, battery life is long lasting. Totally worth it...",
      "Amazing noise cancellation and the battery goes all day. Highly recommend..."
    ],
    timeline: [
      { date: "Apr 10", count: 8 },
      { date: "Apr 17", count: 12 },
      { date: "Apr 24", count: 10 },
      { date: "May 1", count: 14 },
      { date: "May 8", count: 22 },
      { date: "May 16", count: 54 }
    ]
  },
  {
    id: "2",
    productName: "CeraVe Moisturizing Cream",
    brand: "CeraVe",
    category: "Skincare",
    patternType: "Sentiment mismatch",
    trustScore: 48,
    severity: "Medium",
    evidenceCount: 28,
    source: "Walmart",
    status: "Needs Review",
    thumbnail: <CreamIcon />,
    description: "Sentiment mismatch detected: Positive ratings with heavily critical review text details.",
    signals: [
      "High rating with low review sentiment score",
      "Repeated generic praises",
      "Clustered submissions in late evening hours"
    ],
    evidenceSamples: [
      "Gives me breaks and dry skin, but 5 stars because I like the brand name.",
      "Horrible texture and irritation. Best product ever recommended 5/5.",
      "Smells terrible and packaging was broken. Super happy with my purchase."
    ],
    timeline: [
      { date: "Apr 10", count: 5 },
      { date: "Apr 24", count: 8 },
      { date: "May 8", count: 15 },
      { date: "May 16", count: 28 }
    ]
  },
  {
    id: "3",
    productName: "Ninja Air Fryer AF101",
    brand: "Ninja",
    category: "Kitchen",
    patternType: "Sudden rating spike",
    trustScore: 24,
    severity: "High",
    evidenceCount: 42,
    source: "Amazon",
    status: "Pending",
    thumbnail: <FryerIcon />,
    description: "Abrupt volume spike: Rating increases from 4.1 to 4.8 in a 48 hour review window.",
    signals: [
      "Rating velocity spike (+72% volume)",
      "Non-verified accounts submission cluster",
      "One-word text patterns ('good', 'nice')"
    ],
    evidenceSamples: [
      "Good",
      "Nice product",
      "Work fine"
    ],
    timeline: [
      { date: "Apr 10", count: 2 },
      { date: "Apr 24", count: 4 },
      { date: "May 8", count: 9 },
      { date: "May 16", count: 42 }
    ]
  },
  {
    id: "4",
    productName: "Apple AirPods Pro",
    brand: "Apple",
    category: "Electronics",
    patternType: "Review burst",
    trustScore: 56,
    severity: "Medium",
    evidenceCount: 31,
    source: "Best Buy",
    status: "Needs Review",
    thumbnail: <AirPodsIcon />,
    description: "Review burst anomaly: Rapid influx of 5-star submissions in a single day.",
    signals: [
      "Time cluster anomaly (within 6 hours)",
      "Unusual count of brief review copies",
      "IP location cluster matches regional warehouse"
    ],
    evidenceSamples: [
      "Awesome audio and great fit, recommend.",
      "Airpods are great, worth the money.",
      "Super fast shipping, amazing sounds."
    ],
    timeline: [
      { date: "Apr 10", count: 1 },
      { date: "Apr 24", count: 3 },
      { date: "May 8", count: 6 },
      { date: "May 16", count: 31 }
    ]
  },
  {
    id: "5",
    productName: "LG 27-inch Monitor",
    brand: "LG",
    category: "Electronics",
    patternType: "5-star / 1-star imbalance",
    trustScore: 61,
    severity: "Low",
    evidenceCount: 19,
    source: "Newegg",
    status: "Dismissed",
    thumbnail: <MonitorIcon />,
    description: "Polarized ratings pattern: High counts of 5-star and 1-star reviews with minimal middle-tier ratings.",
    signals: [
      "Polarized rating distribution",
      "Competitor keywords detected in critical text",
      "Unverified buyers cluster"
    ],
    evidenceSamples: [
      "Broken on arrival, screen black. Cheap brand.",
      "Perfect display, absolute beast of a monitor 5 stars.",
      "Get a Samsung monitor instead, this is garbage."
    ],
    timeline: [
      { date: "Apr 10", count: 4 },
      { date: "Apr 24", count: 5 },
      { date: "May 8", count: 10 },
      { date: "May 16", count: 19 }
    ]
  },
  {
    id: "6",
    productName: "Instant Pot Duo",
    brand: "Instant Pot",
    category: "Home & Kitchen",
    patternType: "Repeated wording",
    trustScore: 35,
    severity: "High",
    evidenceCount: 27,
    source: "Amazon",
    status: "Pending",
    thumbnail: <PotIcon />,
    description: "Phrasing anomaly: Repeated template text matches promotional outreach scripts.",
    signals: [
      "High text similarity score (94%)",
      "Campaign tracking codes in review footers",
      "Verified gift card review patterns"
    ],
    evidenceSamples: [
      "Saves so much time in the kitchen. Very convenient cooker.",
      "Great kitchen addition, saves time and effort cooker.",
      "Very convenient cooker. Saves so much time in kitchen."
    ],
    timeline: [
      { date: "Apr 10", count: 3 },
      { date: "Apr 24", count: 6 },
      { date: "May 8", count: 11 },
      { date: "May 16", count: 27 }
    ]
  }
];

export default function SuspiciousReview() {
  const [selectedItem, setSelectedItem] = useState<PatternItem>(mockPatterns[0]);
  const [activeQueueFilter, setActiveQueueFilter] = useState<string>("All");

  return (
    <div className="bg-[#FAFBFD] min-h-full w-full font-sans pb-1 overflow-x-hidden">
      <div className="w-full max-w-full min-w-0 px-3 sm:px-4 md:px-5 pt-4 md:pt-6 pb-1 md:pb-2 space-y-4 md:space-y-6 overflow-x-hidden">
        
        {/* Title Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full select-none">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
              Suspicious Review Patterns
            </h1>
            <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
              Detect coordinated review anomalies, repeated wording, sentiment mismatch, and unusual rating behavior before using reviews in product scoring.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button className="flex justify-center items-center gap-1.5 h-9 px-3.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-3xs transition whitespace-nowrap">
              <RefreshCw className="h-3.5 w-3.5 text-slate-400" /> Refresh Analysis
            </button>
            <button className="flex justify-center items-center gap-1.5 h-9 px-3.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-3xs transition whitespace-nowrap">
              <Play className="h-3.5 w-3.5 text-slate-400 fill-current" /> Run Detection
            </button>
            <button className="flex justify-center items-center gap-1.5 h-9 px-4 text-xs font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm transition whitespace-nowrap">
              <Download className="h-3.5 w-3.5" /> Export Findings
            </button>
          </div>
        </div>

        {/* 6 Stats KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 w-full">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs flex items-center justify-start gap-3 sm:gap-4 w-full min-w-0">
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
              <Flag className="h-5 w-5 sm:h-5 sm:w-5 fill-red-50" />
            </div>
            <div className="min-w-0 leading-tight space-y-1">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block truncate">Flagged Products</span>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">384</span>
              <span className="text-[9px] sm:text-[10px] text-red-500 font-bold block truncate">
                ↑ 18% <span className="text-slate-400 font-medium">vs prior 7 days</span>
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs flex items-center justify-start gap-3 sm:gap-4 w-full min-w-0">
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
              <Shield className="h-5 w-5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0 leading-tight space-y-1">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block truncate">High Risk Patterns</span>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">52</span>
              <span className="text-[9px] sm:text-[10px] text-red-500 font-bold block truncate">
                ↑ 24% <span className="text-slate-400 font-medium">vs prior 7 days</span>
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs flex items-center justify-start gap-3 sm:gap-4 w-full min-w-0">
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
              <Copy className="h-5 w-5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0 leading-tight space-y-1">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block truncate">Repeated Wording</span>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">128</span>
              <span className="text-[9px] sm:text-[10px] text-red-500 font-bold block truncate">
                ↑ 16% <span className="text-slate-400 font-medium">vs prior 7 days</span>
              </span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs flex items-center justify-start gap-3 sm:gap-4 w-full min-w-0">
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <TrendingUp className="h-5 w-5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0 leading-tight space-y-1">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block truncate">Rating Spike Alerts</span>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">41</span>
              <span className="text-[9px] sm:text-[10px] text-red-500 font-bold block truncate">
                ↑ 12% <span className="text-slate-400 font-medium">vs prior 7 days</span>
              </span>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs flex items-center justify-start gap-3 sm:gap-4 w-full min-w-0">
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <AlertCircle className="h-5 w-5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0 leading-tight space-y-1">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block truncate">Sentiment Mismatch</span>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">73</span>
              <span className="text-[9px] sm:text-[10px] text-red-500 font-bold block truncate">
                ↑ 9% <span className="text-slate-400 font-medium">vs prior 7 days</span>
              </span>
            </div>
          </div>

          {/* Card 6 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs flex items-center justify-start gap-3 sm:gap-4 w-full min-w-0">
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <TrendingDown className="h-5 w-5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0 leading-tight space-y-1">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block truncate">Avg. Review Trust Impact</span>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">-8.4 <span className="text-xs font-bold text-slate-455">pts</span></span>
              <span className="text-[9px] sm:text-[10px] text-blue-600 font-bold block truncate">
                ↓ -1.3 pts <span className="text-slate-400 font-medium">vs prior 7 days</span>
              </span>
            </div>
          </div>
        </div>

        {/* Master Flex layout for two columns */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 w-full items-stretch lg:items-start">
          
          {/* Left Column (Suspicious Pattern Queue table & double sub-grid) */}
          <div className="flex-1 w-full min-w-0 space-y-4 sm:space-y-5">
            
            {/* Table Card */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-3xs overflow-hidden w-full min-w-0">
              
              {/* Table Toolbar controls inside card */}
              <div className="flex flex-wrap items-center gap-3 w-full p-4 select-none">
                <div className="relative">
                  <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-xs font-bold text-slate-700 outline-none cursor-pointer hover:bg-slate-50 transition shadow-3xs min-w-[120px]">
                    <option>Risk Level: All</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-xs font-bold text-slate-700 outline-none cursor-pointer hover:bg-slate-50 transition shadow-3xs min-w-[110px]">
                    <option>Source: All</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-xs font-bold text-slate-700 outline-none cursor-pointer hover:bg-slate-50 transition shadow-3xs min-w-[130px]">
                    <option>Pattern Type: All</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>

                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search product or pattern..."
                    className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:border-slate-350 transition-colors shadow-3xs font-medium"
                  />
                </div>

                <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-3xs">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto w-full">
                <table className="w-full min-w-[850px] text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/60 border-b border-slate-150 text-slate-400 font-bold uppercase tracking-wider text-[10px] select-none">
                      <th className="py-4 px-4 w-[4%] text-center">
                        <input type="checkbox" className="rounded border-slate-350 text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5 cursor-pointer" />
                      </th>
                      <th className="py-4 px-4 w-[28%]">Product</th>
                      <th className="py-4 px-4 w-[16%]">Pattern Type</th>
                      <th className="py-4 px-4 w-[14%] text-center">Review Trust Score</th>
                      <th className="py-4 px-4 w-[10%] select-none">Severity</th>
                      <th className="py-4 px-4 w-[10%] text-center">Evidence Count</th>
                      <th className="py-4 px-4 w-[8%]">Source</th>
                      <th className="py-4 px-4 w-[10%] text-center">Action</th>
                      <th className="py-4 px-4 w-[4%] text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {mockPatterns.map((item) => {
                      const isSelected = item.id === selectedItem.id;
                      return (
                        <tr
                          key={item.id}
                          className={cn(
                            "hover:bg-slate-50/40 transition-colors cursor-pointer",
                            isSelected ? "bg-blue-50/40" : ""
                          )}
                          onClick={() => setSelectedItem(item)}
                        >
                          <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => setSelectedItem(item)}
                              className="rounded border-slate-350 text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5 cursor-pointer"
                            />
                          </td>

                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2.5 min-w-0">
                              {item.thumbnail}
                              <div className="leading-tight min-w-0">
                                <span className="text-xs font-bold text-slate-900 block truncate max-w-[150px]">{item.productName}</span>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-4 text-slate-655 font-medium">
                            {item.patternType}
                          </td>

                          <td className="py-4 px-4 text-center select-none" onClick={(e) => e.stopPropagation()}>
                            <span className={cn(
                              "inline-flex justify-center items-center w-9 h-6 rounded text-xs font-black shadow-3xs",
                              item.trustScore < 30 ? "bg-red-50 text-red-555 border border-red-100" :
                              item.trustScore < 50 ? "bg-amber-50 text-amber-550 border border-amber-100" : "bg-blue-50 text-[#4F46E5] border border-blue-100"
                            )}>
                              {item.trustScore}
                            </span>
                          </td>

                          <td className="py-4 px-4 select-none">
                            <span className={cn(
                              "inline-flex justify-center px-2 py-0.5 rounded text-[9.5px] font-extrabold uppercase border shadow-3xs",
                              item.severity === "High" && "bg-red-50 text-red-655 border-red-100",
                              item.severity === "Medium" && "bg-amber-50 text-amber-550 border-amber-100",
                              item.severity === "Low" && "bg-blue-50 text-[#4F46E5] border-blue-100"
                            )}>
                              {item.severity}
                            </span>
                          </td>

                          <td className="py-4 px-4 text-center font-bold">
                            {item.evidenceCount}
                          </td>

                          <td className="py-4 px-4 text-slate-550 font-medium">
                            {item.source}
                          </td>

                          <td className="py-4 px-4 text-center select-none" onClick={(e) => e.stopPropagation()}>
                            <span className={cn(
                              "inline-flex justify-center px-2.5 py-0.5 rounded text-[9px] font-extrabold uppercase shadow-3xs",
                              item.status === "Pending" && "bg-amber-50 text-amber-550 border border-amber-100",
                              item.status === "Needs Review" && "bg-blue-50 text-[#4F46E5] border border-blue-100",
                              item.status === "Dismissed" && "bg-slate-100 text-slate-500 border border-slate-200"
                            )}>
                              {item.status}
                            </span>
                          </td>

                          <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                            <button className="h-7 w-7 rounded-lg border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition shadow-3xs bg-white">
                              <MoreVertical className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table pagination footer */}
              <div className="px-4 py-3 border-t border-slate-150 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white text-slate-400 font-bold select-none text-[11px]">
                <span>Showing 1 to 6 of 384 entries</span>
                
                <div className="flex items-center gap-1">
                  <button className="h-7 w-7 rounded border border-slate-250 flex items-center justify-center hover:bg-slate-50 transition text-slate-455">
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button className="h-7 w-7 rounded bg-[#4F46E5] text-white flex items-center justify-center font-bold">1</button>
                  <button className="h-7 w-7 rounded border border-slate-250 flex items-center justify-center hover:bg-slate-50 transition text-slate-600">2</button>
                  <button className="h-7 w-7 rounded border border-slate-250 flex items-center justify-center hover:bg-slate-50 transition text-slate-600">3</button>
                  <button className="h-7 w-7 rounded border border-slate-250 flex items-center justify-center hover:bg-slate-50 transition text-slate-600">4</button>
                  <button className="h-7 w-7 rounded border border-slate-250 flex items-center justify-center hover:bg-slate-50 transition text-slate-600">5</button>
                  <span className="px-1 text-slate-300">...</span>
                  <button className="h-7 w-7 rounded border border-slate-250 flex items-center justify-center hover:bg-slate-50 transition text-slate-600">64</button>
                  <button className="h-7 w-7 rounded border border-slate-250 flex items-center justify-center hover:bg-slate-50 transition text-slate-455">
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Row Grid (Breakdown & Checklist) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 w-full">
              
              {/* Pattern Type Breakdown */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex flex-col justify-between select-none">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Pattern Type Breakdown</h3>
                
                <div className="flex items-center justify-center gap-6 mt-4">
                  {/* Donut Graphic */}
                  <div className="relative h-24 w-24 flex items-center justify-center shrink-0">
                    <style dangerouslySetInnerHTML={{ __html: `
                      @keyframes spin-in {
                        from {
                          transform: rotate(-270deg) scale(0.65);
                          opacity: 0;
                        }
                        to {
                          transform: rotate(-90deg) scale(1);
                          opacity: 1;
                        }
                      }
                      @keyframes draw-segment {
                        from {
                          stroke-dasharray: 0 100;
                        }
                      }
                      .animate-svg-spin {
                        transform-origin: center;
                        animation: spin-in 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                      }
                      .animate-segment-draw {
                        animation: draw-segment 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                      }
                    `}} />
                    <svg viewBox="0 0 36 36" className="h-full w-full animate-svg-spin">
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F1F5F9" strokeWidth="4.5" />
                      {/* Repeated Wording (blue) 33.3% */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3B82F6" strokeWidth="4.5" strokeDasharray="33.3 66.7" strokeDashoffset="0" className="animate-segment-draw" />
                      {/* Rating Spike (red) 10.7% */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#EF4444" strokeWidth="4.5" strokeDasharray="10.7 89.3" strokeDashoffset="-33.3" className="animate-segment-draw" />
                      {/* Sentiment Mismatch (yellow) 19.0% */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F59E0B" strokeWidth="4.5" strokeDasharray="19.0 81.0" strokeDashoffset="-44" className="animate-segment-draw" />
                      {/* Review Burst (green) 21.4% */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10B981" strokeWidth="4.5" strokeDasharray="21.4 78.6" strokeDashoffset="-63" className="animate-segment-draw" />
                      {/* Incentivized Signal (purple) 15.6% */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#8B5CF6" strokeWidth="4.5" strokeDasharray="15.6 84.4" strokeDashoffset="-84.4" className="animate-segment-draw" />
                    </svg>
                    <div className="absolute text-center leading-none">
                      <span className="text-base font-extrabold text-slate-900 block">384</span>
                      <span className="text-[7.5px] font-bold text-slate-400 uppercase mt-0.5 block">Total</span>
                    </div>
                  </div>

                  {/* Legends list */}
                  <div className="space-y-1.5 text-[9px] font-bold text-slate-655 w-full">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0"></span>
                        <span>Repeated Wording</span>
                      </div>
                      <span className="text-slate-900">128 <span className="text-slate-400 font-medium">(33.3%)</span></span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-red-500 shrink-0"></span>
                        <span>Rating Spike</span>
                      </div>
                      <span className="text-slate-900">41 <span className="text-slate-400 font-medium">(10.7%)</span></span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-yellow-500 shrink-0"></span>
                        <span>Sentiment Mismatch</span>
                      </div>
                      <span className="text-slate-900">73 <span className="text-slate-400 font-medium">(19.0%)</span></span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0"></span>
                        <span>Review Burst</span>
                      </div>
                      <span className="text-slate-900">82 <span className="text-slate-400 font-medium">(21.4%)</span></span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-purple-500 shrink-0"></span>
                        <span>Incentivized Signal</span>
                      </div>
                      <span className="text-slate-900">60 <span className="text-slate-400 font-medium">(15.6%)</span></span>
                    </div>
                  </div>
                </div>

                <button className="w-full text-center text-[10px] font-bold text-[#4F46E5] hover:text-[#4338CA] transition mt-4">
                  View full breakdown →
                </button>
              </div>

              {/* Checklist */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex flex-col justify-between select-none">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Detection Rules & Review Checklist</h3>
                
                <div className="space-y-3.5 mt-4 flex-1">
                  <div className="flex items-start gap-2.5 text-[11.5px] font-semibold text-slate-800">
                    <span className="h-4.5 w-4.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-3xs shrink-0 select-none">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                    <span>Verify purchase ratio below threshold</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[11.5px] font-semibold text-slate-800">
                    <span className="h-4.5 w-4.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-3xs shrink-0 select-none">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                    <span>Check review age clustering</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[11.5px] font-semibold text-slate-800">
                    <span className="h-4.5 w-4.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-3xs shrink-0 select-none">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                    <span>Compare rating trend vs sales trend</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[11.5px] font-semibold text-slate-800">
                    <span className="h-4.5 w-4.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-3xs shrink-0 select-none">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                    <span>Inspect duplicate phrasing</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[11.5px] font-semibold text-slate-800">
                    <span className="h-4.5 w-4.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-3xs shrink-0 select-none">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                    <span>Validate source reliability</span>
                  </div>
                </div>

                <button className="w-full text-center text-[10px] font-bold text-[#4F46E5] hover:text-[#4338CA] transition mt-4">
                  View all detection rules →
                </button>
              </div>

            </div>

          </div>

          {/* Right Column: Pattern Detail & Recent Decisions */}
          <div className="w-full lg:w-[460px] xl:w-[480px] space-y-4 sm:space-y-5 shrink-0 flex flex-col">
            
            {/* Pattern Detail Card */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-3xs flex flex-col h-[540px] overflow-hidden">
              {/* Card Header */}
              <div className="p-5 pb-3 flex justify-between items-start select-none shrink-0 border-b border-slate-100">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Pattern Detail</h3>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[8.5px] font-extrabold uppercase border shadow-3xs bg-red-50 text-red-655 border-red-100">
                  <AlertCircle className="h-3 w-3" /> High Risk
                </span>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {/* Product info header details */}
                <div className="flex items-start gap-3.5 border-b border-slate-100 pb-4">
                  {selectedItem.thumbnail}
                  <div className="leading-tight min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{selectedItem.productName}</h4>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-0.5 truncate">{selectedItem.brand} • Over-Ear Headphones</span>
                    
                    <div className="flex items-center gap-1.5 mt-2 text-[10px] font-semibold text-slate-500">
                      <span className="text-slate-400 font-medium">Sources:</span>
                      <span className="text-slate-800 font-bold flex items-center gap-1">
                        <span className="hover:underline cursor-pointer">{selectedItem.source}</span>
                        <span>• Best Buy</span>
                        <span className="text-slate-400 font-medium ml-1">+2 more</span>
                      </span>
                    </div>
                  </div>

                  {/* Score indicators */}
                  <div className="flex items-center gap-2 select-none shrink-0">
                    <div className="bg-red-50/50 border border-red-100 rounded-lg p-2 text-center w-[75px] shadow-3xs">
                      <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wide block">Trust Score</span>
                      <span className="text-sm font-black text-red-600 block mt-0.5">{selectedItem.trustScore} <span className="text-[8px] text-slate-400 font-medium">/100</span></span>
                    </div>
                    <div className="bg-slate-50/50 border border-slate-100 rounded-lg p-2 text-center w-[75px] shadow-3xs">
                      <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wide block">Trust Delta (7d)</span>
                      <span className="text-xs font-bold text-red-500 block mt-1 flex items-center justify-center gap-0.5">
                        <TrendingDown className="h-3 w-3" /> -18 pts
                      </span>
                    </div>
                  </div>
                </div>

                {/* Warning template description */}
                <div className="bg-red-50/40 border border-red-100 rounded-xl p-4 space-y-1 relative overflow-hidden leading-relaxed">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-red-655 uppercase tracking-wider">
                    <AlertCircle className="h-3.5 w-3.5 fill-red-50 text-red-655 shrink-0" />
                    Anomaly Summary
                  </div>
                  <p className="text-[11px] font-semibold text-slate-800 mt-1">
                    {selectedItem.description}
                  </p>
                </div>

                {/* Signals list & Timeline & Evidence Speech */}
                <div className="space-y-4 border-b border-slate-100 pb-4">
                  <div className="grid grid-cols-2 gap-4">
                    
                    {/* Primary Signals */}
                    <div className="space-y-1.5">
                      <h5 className="text-[9.5px] font-extrabold text-slate-800 uppercase tracking-wider">Primary Signals</h5>
                      <ul className="space-y-1 text-[9.5px] font-bold text-slate-600 list-disc pl-3.5 leading-normal">
                        {selectedItem.signals.map((sig, idx) => (
                          <li key={idx}>{sig}</li>
                        ))}
                      </ul>
                      <span className="text-[8.5px] font-bold text-[#4F46E5] hover:text-[#4338CA] block pt-1 select-none cursor-pointer">
                        View full signal breakdown →
                      </span>
                    </div>

                    {/* Timeline Snapshot (Custom SVG Bar Chart) */}
                    <div className="space-y-1.5 select-none">
                      <h5 className="text-[9.5px] font-extrabold text-slate-800 uppercase tracking-wider">Timeline Snapshot</h5>
                      <div className="h-16 w-full relative pt-1 bg-slate-50/50 rounded-lg p-2 border border-slate-100 flex flex-col justify-between">
                        {/* Grid bar displays */}
                        <div className="flex items-end justify-between h-9 px-1 gap-1">
                          {selectedItem.timeline.map((point, idx) => {
                            const isLast = idx === selectedItem.timeline.length - 1;
                            const heightPct = Math.max(10, Math.min(100, (point.count / 54) * 100));
                            return (
                              <div key={idx} className="relative flex-1 flex flex-col items-center group">
                                {/* Dotted target circle overlay on last element */}
                                {isLast && (
                                  <span className="absolute -top-1 h-3.5 w-3.5 rounded-full border-2 border-dashed border-red-500 animate-pulse z-20 bg-transparent"></span>
                                )}
                                <div
                                  className={cn(
                                    "w-full rounded-t",
                                    isLast ? "bg-red-500" : "bg-blue-500"
                                  )}
                                  style={{ height: `${heightPct}%` }}
                                ></div>
                              </div>
                            );
                          })}
                        </div>
                        
                        <div className="flex justify-between text-[7px] text-slate-400 font-bold">
                          <span>{selectedItem.timeline[0]?.date}</span>
                          <span>{selectedItem.timeline[2]?.date}</span>
                          <span>{selectedItem.timeline[4]?.date}</span>
                          <span>{selectedItem.timeline[5]?.date}</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Evidence Samples Bubble list */}
                  <div className="space-y-1.5 leading-normal">
                    <h5 className="text-[9.5px] font-extrabold text-slate-800 uppercase tracking-wider">Evidence Samples</h5>
                    <div className="space-y-2">
                      {selectedItem.evidenceSamples.map((sample, idx) => (
                        <div key={idx} className="bg-slate-50/60 border border-slate-100 rounded-lg p-2 relative text-[9.5px] font-medium text-slate-600 italic">
                          "{sample}"
                        </div>
                      ))}
                    </div>
                    <span className="text-[8.5px] font-bold text-[#4F46E5] hover:text-[#4338CA] block pt-1 select-none cursor-pointer">
                      View all {selectedItem.evidenceCount} samples →
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions footer row */}
              <div className="p-5 pt-3 border-t border-slate-100 flex flex-wrap gap-2 justify-between select-none shrink-0 bg-slate-50/50">
                <button className="flex-1 min-w-[120px] flex items-center justify-center gap-1 h-9 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition">
                  <Check className="h-4 w-4" /> Confirm Pattern
                </button>
                <button className="flex-1 min-w-[110px] flex items-center justify-center gap-1 h-9 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition shadow-3xs">
                  <XCircle className="h-3.5 w-3.5 text-slate-400" /> Dismiss Alert
                </button>
                <button className="flex-1 min-w-[125px] flex items-center justify-center gap-1 h-9 text-xs font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] border border-indigo-250 rounded-lg transition shadow-sm">
                  <Brain className="h-3.5 w-3.5" /> Send to AI Review
                </button>
              </div>
            </div>

            {/* Recent Decisions Card */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-3xs p-5 select-none">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Recent Decisions</h3>
                <span className="text-[10px] font-bold text-[#4F46E5] hover:text-[#4338CA] cursor-pointer">View all →</span>
              </div>

              <div className="divide-y divide-slate-100 text-[10.5px]">
                
                {/* Decision 1 */}
                <div className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <HeadphoneIcon />
                    <div className="leading-tight min-w-0">
                      <span className="text-slate-800 font-bold block truncate">Sony WH-1000XM5 Headphones</span>
                      <span className="text-[9px] text-slate-400 font-semibold block mt-0.5 truncate">Repeated wording • Amazon</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="px-1.5 py-0.5 rounded text-[8.5px] font-extrabold uppercase bg-emerald-50 text-emerald-600 border border-emerald-100">Confirmed</span>
                    <span className="text-slate-400 font-semibold text-[9px]">2h ago</span>
                  </div>
                </div>

                {/* Decision 2 */}
                <div className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <CreamIcon />
                    <div className="leading-tight min-w-0">
                      <span className="text-slate-800 font-bold block truncate">CeraVe Moisturizing Cream</span>
                      <span className="text-[9px] text-slate-400 font-semibold block mt-0.5 truncate">Sentiment mismatch • Walmart</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="px-1.5 py-0.5 rounded text-[8.5px] font-extrabold uppercase bg-slate-100 text-slate-550 border border-slate-200">Dismissed</span>
                    <span className="text-slate-400 font-semibold text-[9px]">5h ago</span>
                  </div>
                </div>

                {/* Decision 3 */}
                <div className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <FryerIcon />
                    <div className="leading-tight min-w-0">
                      <span className="text-slate-800 font-bold block truncate">Ninja Air Fryer AF101</span>
                      <span className="text-[9px] text-slate-400 font-semibold block mt-0.5 truncate">Sudden rating spike • Amazon</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="px-1.5 py-0.5 rounded text-[8.5px] font-extrabold uppercase bg-emerald-50 text-emerald-600 border border-emerald-100">Confirmed</span>
                    <span className="text-slate-400 font-semibold text-[9px]">1d ago</span>
                  </div>
                </div>

                {/* Decision 4 */}
                <div className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <MonitorIcon />
                    <div className="leading-tight min-w-0">
                      <span className="text-slate-800 font-bold block truncate">LG 27-inch Monitor</span>
                      <span className="text-[9px] text-slate-400 font-semibold block mt-0.5 truncate">5-star / 1-star imbalance • Newegg</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="px-1.5 py-0.5 rounded text-[8.5px] font-extrabold uppercase bg-amber-50 text-amber-600 border border-amber-100">Escalated</span>
                    <span className="text-slate-400 font-semibold text-[9px]">1d ago</span>
                  </div>
                </div>

                {/* Decision 5 */}
                <div className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <AirPodsIcon />
                    <div className="leading-tight min-w-0">
                      <span className="text-slate-800 font-bold block truncate">Apple AirPods Pro</span>
                      <span className="text-[9px] text-slate-400 font-semibold block mt-0.5 truncate">Review burst • Best Buy</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="px-1.5 py-0.5 rounded text-[8.5px] font-extrabold uppercase bg-slate-100 text-slate-550 border border-slate-200">Dismissed</span>
                    <span className="text-slate-400 font-semibold text-[9px]">2d ago</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
