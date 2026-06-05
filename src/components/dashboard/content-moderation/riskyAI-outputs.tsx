"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  RefreshCw,
  Sparkles,
  Download,
  Filter,
  Search,
  Calendar,
  ChevronDown,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Flag,
  ShieldAlert,
  User,
  Clock,
  Trash2,
  ArrowRight,
  Edit3,
  Sliders,
  Check,
  CircleDot,
  Play,
  AlertCircle
} from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  category: string;
  riskType: string;
  severity: "High" | "Medium" | "Low";
  confidence: number;
  source: string;
  status: "Needs Review" | "Pending" | "Needs Edit" | "Escalated" | "Approved";
  detectedDate: string;
  detectedTime: string;
  riskScore: number;
  flaggedCopy: string;
  riskAnalysis: string[];
  policyViolations: string[];
  evidenceSources: { name: string; type: "database" | "copy" | "expert" | "complaint" }[];
  safeRewrite: string;
  thumbnail: React.ReactNode;
}

// Inline SVG thumbnails for products
const DropperBottleIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-indigo-600 bg-indigo-50 rounded-lg p-1.5 border border-slate-100 shrink-0">
    <rect x="11" y="14" width="10" height="13" rx="2" fill="#818CF8" />
    <path d="M14 14v-6h4v6" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="13" y="4" width="6" height="4" rx="1" fill="#475569" />
    <line x1="16" y1="18" x2="16" y2="22" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const GummiesJarIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-amber-600 bg-amber-50 rounded-lg p-1.5 border border-slate-100 shrink-0">
    <rect x="10" y="12" width="12" height="15" rx="3" fill="#FBBF24" />
    <rect x="12" y="7" width="8" height="5" rx="1.5" fill="#D97706" />
    <circle cx="14" cy="17" r="1.5" fill="#fff" opacity="0.8" />
    <circle cx="18" cy="21" r="1.5" fill="#fff" opacity="0.8" />
  </svg>
);

const HeadphonesIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-slate-700 bg-slate-100 rounded-lg p-1.5 border border-slate-100 shrink-0">
    <path d="M9 14v6a2 2 0 0 0 2 2h2V12h-2a2 2 0 0 0-2 2zM21 12h-2v10h2a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2z" fill="#475569" />
    <path d="M11 12A5 5 0 0 1 21 12" stroke="#334155" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

const KidsGummiesIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-rose-600 bg-rose-50 rounded-lg p-1.5 border border-slate-100 shrink-0">
    <rect x="10" y="12" width="12" height="15" rx="3" fill="#F43F5E" />
    <rect x="12" y="7" width="8" height="5" rx="1.5" fill="#BE123C" />
    <path d="M14 18l4 4M18 18l-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CreamTubIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-sky-600 bg-sky-50 rounded-lg p-1.5 border border-slate-100 shrink-0">
    <path d="M8 14h16l-2 11H10L8 14z" fill="#38BDF8" />
    <rect x="7" y="9" width="18" height="5" rx="1" fill="#0284C7" />
    <rect x="11" y="16" width="10" height="4" rx="0.5" fill="#fff" opacity="0.9" />
  </svg>
);

const mockProducts: ProductItem[] = [
  {
    id: "1",
    name: "ProGlow Acne Serum",
    category: "Skincare",
    riskType: "Medical claim",
    severity: "High",
    confidence: 48,
    source: "User complaints",
    status: "Needs Review",
    detectedDate: "May 17, 2025",
    detectedTime: "9:14 AM",
    riskScore: 82,
    flaggedCopy: "Helps treat acne and visibly reduce inflammation in 7 days.",
    riskAnalysis: [
      "Medical / therapeutic implication",
      "Time-based claim (7 days)",
      "Insufficient evidence to support efficacy"
    ],
    policyViolations: [
      "Disease-treatment language",
      "Unsupported promise",
      "Compliance concern (FTC / FDA)"
    ],
    evidenceSources: [
      { name: "Ingredient Database", type: "database" },
      { name: "Retailer Copy", type: "copy" },
      { name: "Expert Review", type: "expert" },
      { name: "User Complaints", type: "complaint" }
    ],
    safeRewrite: "Formulated to support the appearance of clearer, healthier-looking skin. Results may vary. Use consistently as part of your skincare routine.",
    thumbnail: <DropperBottleIcon />
  },
  {
    id: "2",
    name: "SleepWell Gummies",
    category: "Supplements",
    riskType: "Unsupported claim",
    severity: "Medium",
    confidence: 61,
    source: "Policy scan",
    status: "Pending",
    detectedDate: "May 17, 2025",
    detectedTime: "8:30 AM",
    riskScore: 65,
    flaggedCopy: "Guarantees a full 8 hours of deep sleep without morning grogginess.",
    riskAnalysis: [
      "Unsupported promise of result ('guarantees')",
      "Specific duration assertion (8 hours)",
      "Absence of safety disclaimer text"
    ],
    policyViolations: [
      "Misleading efficacy claims",
      "Missing regulatory disclosure"
    ],
    evidenceSources: [
      { name: "Ingredient Database", type: "database" },
      { name: "Expert Review", type: "expert" }
    ],
    safeRewrite: "Designed to support normal, restful sleep cycles. Individual results may vary.",
    thumbnail: <GummiesJarIcon />
  },
  {
    id: "3",
    name: "Sony WH-1000XM5",
    category: "Electronics",
    riskType: "Affiliate disclosure missing",
    severity: "Medium",
    confidence: 78,
    source: "Rule engine",
    status: "Needs Edit",
    detectedDate: "May 16, 2025",
    detectedTime: "4:22 PM",
    riskScore: 58,
    flaggedCopy: "Buy the absolute best noise-canceling headphones using our secret links.",
    riskAnalysis: [
      "Promotional text without required affiliate disclaimer",
      "Superlative claims ('absolute best') without context"
    ],
    policyViolations: [
      "FTC Affiliate endorsement disclosure rule violation",
      "Promotional copywriting standards"
    ],
    evidenceSources: [
      { name: "Retailer Copy", type: "copy" }
    ],
    safeRewrite: "Check out these top-rated noise-canceling headphones. As an affiliate partner, we may earn commissions on qualifying purchases.",
    thumbnail: <HeadphonesIcon />
  },
  {
    id: "4",
    name: "Kids Immunity Gummies",
    category: "Supplements",
    riskType: "Unsafe recommendation",
    severity: "High",
    confidence: 43,
    source: "Health/safety scan",
    status: "Escalated",
    detectedDate: "May 16, 2025",
    detectedTime: "11:05 AM",
    riskScore: 91,
    flaggedCopy: "Provides full protection against seasonal flu and viruses for infants.",
    riskAnalysis: [
      "Direct disease prevention claim ('Seasonal flu and viruses')",
      "Targeting sensitive demographics ('infants') without age limits",
      "High clinical severity indicator"
    ],
    policyViolations: [
      "FDA disease prevention restrictions",
      "Age-inappropriate recommendations"
    ],
    evidenceSources: [
      { name: "Ingredient Database", type: "database" },
      { name: "User Complaints", type: "complaint" }
    ],
    safeRewrite: "Supports seasonal wellness and immune health in kids aged 4 and older under parental supervision.",
    thumbnail: <KidsGummiesIcon />
  },
  {
    id: "5",
    name: "CeraVe Moisturizing Cream",
    category: "Skincare",
    riskType: "Legal risk",
    severity: "Low",
    confidence: 84,
    source: "Manual flag",
    status: "Approved",
    detectedDate: "May 15, 2025",
    detectedTime: "2:45 PM",
    riskScore: 32,
    flaggedCopy: "Dermatologist recommended formula, ideal for skin prone to eczema.",
    riskAnalysis: [
      "Indirect treatment association ('eczema')",
      "Valid third-party testing references cited"
    ],
    policyViolations: [
      "Cosmetic claim limits vs OTC drug designation"
    ],
    evidenceSources: [
      { name: "Ingredient Database", type: "database" },
      { name: "Expert Review", type: "expert" }
    ],
    safeRewrite: "Dermatologist-developed formula suitable for sensitive, dry skin.",
    thumbnail: <CreamTubIcon />
  }
];

export default function RiskyAIOutputs() {
  const [selectedProductId, setSelectedProductId] = useState<string>("1");
  const [moderatorNotes, setModeratorNotes] = useState<string>("");

  const selectedProduct = mockProducts.find(p => p.id === selectedProductId) || mockProducts[0];

  return (
    <div className="bg-slate-50 min-h-full w-full font-sans pb-6">
      <div className="w-full max-w-full px-2.5 sm:px-4 md:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        
        {/* Title Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full select-none">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Risky AI Outputs
            </h1>
            <p className="text-xs sm:text-[13px] text-slate-550 mt-1">
              Review potentially unsafe, non-compliant, or misleading AI-generated product messaging before publishing.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button className="flex justify-center items-center gap-1.5 h-8.5 px-3.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-3xs transition">
              <RefreshCw className="h-3.5 w-3.5 text-slate-500" /> Refresh Queue
            </button>
            <button className="flex justify-center items-center gap-1.5 h-8.5 px-3.5 text-xs font-bold text-[#4F46E5] bg-white border border-[#E0E7FF] rounded-lg hover:bg-slate-50 shadow-3xs transition">
              <Sparkles className="h-3.5 w-3.5 text-[#4F46E5]" /> Run Re-analysis
            </button>
            <button className="flex justify-center items-center gap-1.5 h-8.5 px-4 text-xs font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm transition">
              <Download className="h-3.5 w-3.5" /> Export Findings
            </button>
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4 w-full">
          {/* Card 1: Flagged Outputs */}
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 sm:p-3.5 shadow-3xs flex items-center gap-2.5 sm:gap-3 w-full min-w-0">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-red-50 text-red-550 flex items-center justify-center shrink-0">
              <Flag className="h-4 w-4 sm:h-4.5 sm:w-4.5 fill-current" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Flagged Outputs</span>
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5 block">186</span>
              <span className="text-[9px] sm:text-[10px] text-red-650 font-bold block mt-0.5 leading-tight">
                ↑ 18% <span className="block sm:inline text-slate-400 font-medium text-[8px] sm:text-[10px]">vs May 5 – 11</span>
              </span>
            </div>
          </div>

          {/* Card 2: High Risk */}
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 sm:p-3.5 shadow-3xs flex items-center gap-2.5 sm:gap-3 w-full min-w-0">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-red-50 text-red-650 flex items-center justify-center shrink-0">
              <ShieldAlert className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">High Risk</span>
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5 block">34</span>
              <span className="text-[9px] sm:text-[10px] text-red-650 font-bold block mt-0.5 leading-tight">
                ↑ 21% <span className="block sm:inline text-slate-400 font-medium text-[8px] sm:text-[10px]">vs May 5 – 11</span>
              </span>
            </div>
          </div>

          {/* Card 3: Needs Human Review */}
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 sm:p-3.5 shadow-3xs flex items-center gap-2.5 sm:gap-3 w-full min-w-0">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <User className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Needs Human</span>
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5 block">58</span>
              <span className="text-[9px] sm:text-[10px] text-amber-600 font-bold block mt-0.5 leading-tight">
                ↑ 9% <span className="block sm:inline text-slate-400 font-medium text-[8px] sm:text-[10px]">vs May 5 – 11</span>
              </span>
            </div>
          </div>

          {/* Card 4: Approved Safe */}
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 sm:p-3.5 shadow-3xs flex items-center gap-2.5 sm:gap-3 w-full min-w-0">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-emerald-50/60 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Approved Safe</span>
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5 block">41</span>
              <span className="text-[9px] sm:text-[10px] text-emerald-600 font-bold block mt-0.5 leading-tight">
                ↑ 15% <span className="block sm:inline text-slate-400 font-medium text-[8px] sm:text-[10px]">vs May 5 – 11</span>
              </span>
            </div>
          </div>

          {/* Card 5: Removed Today */}
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 sm:p-3.5 shadow-3xs flex items-center gap-2.5 sm:gap-3 w-full min-w-0">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-purple-50 text-purple-650 flex items-center justify-center shrink-0">
              <Trash2 className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Removed Today</span>
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5 block">12</span>
              <span className="text-[9px] sm:text-[10px] text-emerald-600 font-bold block mt-0.5 leading-tight">
                ↓ 8% <span className="block sm:inline text-slate-400 font-medium text-[8px] sm:text-[10px]">vs May 5 – 11</span>
              </span>
            </div>
          </div>

          {/* Card 6: Avg. Review Time */}
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 sm:p-3.5 shadow-3xs flex items-center gap-2.5 sm:gap-3 w-full min-w-0">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Clock className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avg. Review Time</span>
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5 block">21m 42s</span>
              <span className="text-[9px] sm:text-[10px] text-emerald-600 font-bold block mt-0.5 leading-tight">
                ↓ 6% <span className="block sm:inline text-slate-400 font-medium text-[8px] sm:text-[10px]">vs May 5 – 11</span>
              </span>
            </div>
          </div>
        </div>

        {/* Two Column Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
          
          {/* Left Column (col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Output Queue Table Card */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-3xs overflow-hidden">
              
              {/* Header Toolbar */}
              <div className="px-5 py-4 border-b border-slate-100 select-none">
                <h2 className="text-sm font-bold text-slate-800">Risky Output Queue</h2>
                
                {/* Filters Row */}
                <div className="flex flex-wrap items-center gap-3 mt-4 w-full">
                  <div className="relative">
                    <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Risk Level</label>
                    <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer w-[95px]">
                      <option>All</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 bottom-2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Category</label>
                    <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer w-[95px]">
                      <option>All</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 bottom-2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Trigger Type</label>
                    <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer w-[95px]">
                      <option>All</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 bottom-2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Confidence</label>
                    <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer w-[95px]">
                      <option>All</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 bottom-2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>

                  {/* Search box right-aligned */}
                  <div className="ml-auto w-full sm:w-auto relative">
                    <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1 opacity-0 pointer-events-none">Search</label>
                    <div className="relative flex items-center">
                      <Search className="absolute left-2.5 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search in queue..."
                        className="bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-700 font-medium outline-none w-full sm:w-[155px] focus:bg-white focus:border-slate-350 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Table Wrapper */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[750px] text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/60 border-b border-slate-150 text-slate-455 font-bold uppercase tracking-wider text-[10px] select-none">
                      <th className="py-3 px-4 w-[6%] text-center"></th>
                      <th className="py-3 px-4 w-[25%]">Product</th>
                      <th className="py-3 px-3 w-[15%]">Category</th>
                      <th className="py-3 px-3 w-[18%]">Risk Type</th>
                      <th className="py-3 px-3 w-[10%] text-center">Severity</th>
                      <th className="py-3 px-3 w-[12%]">Confidence</th>
                      <th className="py-3 px-3 w-[16%]">Source / Trigger</th>
                      <th className="py-3 px-3 w-[14%] text-center">Status</th>
                      <th className="py-3 px-4 w-[6%] text-center font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {mockProducts.map((p) => {
                      const isSelected = p.id === selectedProductId;
                      return (
                        <tr
                          key={p.id}
                          className={cn(
                            "hover:bg-slate-50/50 transition-colors cursor-pointer",
                            isSelected && "bg-[#F8FAFC]"
                          )}
                          onClick={() => setSelectedProductId(p.id)}
                        >
                          <td className="py-3.5 px-4 text-center">
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
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2.5 min-w-0">
                              {p.thumbnail}
                              <span className="text-xs font-bold text-slate-900 truncate block">{p.name}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-3 text-slate-600 font-medium">
                            {p.category}
                          </td>
                          <td className="py-3.5 px-3 text-slate-800 font-semibold truncate max-w-[150px]">
                            {p.riskType}
                          </td>
                          <td className="py-3.5 px-3 text-center">
                            <span className={cn(
                              "inline-flex justify-center px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide select-none border",
                              p.severity === "High" && "bg-red-50 text-red-600 border-red-150",
                              p.severity === "Medium" && "bg-amber-50 text-amber-600 border-amber-150",
                              p.severity === "Low" && "bg-emerald-50 text-emerald-600 border-emerald-150"
                            )}>
                              {p.severity}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 select-none">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-bold text-slate-800 min-w-[24px] text-right">{p.confidence}%</span>
                              <div className="w-12 h-1.5 rounded-full bg-slate-100 overflow-hidden shrink-0">
                                <div 
                                  className={cn(
                                    "h-full rounded-full",
                                    p.severity === "High" && "bg-red-500",
                                    p.severity === "Medium" && "bg-amber-500",
                                    p.severity === "Low" && "bg-emerald-500"
                                  )}
                                  style={{ width: `${p.confidence}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-3 text-slate-500 text-[11px] font-medium">
                            {p.source}
                          </td>
                          <td className="py-3.5 px-3 text-center select-none">
                            <span className={cn(
                              "inline-flex justify-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide",
                              p.status === "Needs Review" && "bg-amber-50 text-amber-600",
                              p.status === "Pending" && "bg-blue-50 text-blue-600",
                              p.status === "Needs Edit" && "bg-purple-50 text-purple-650",
                              p.status === "Escalated" && "bg-red-50 text-red-650",
                              p.status === "Approved" && "bg-emerald-50 text-emerald-600"
                            )}>
                              {p.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button className="h-7 w-7 rounded-lg border border-slate-200 hover:bg-white flex items-center justify-center text-slate-400 hover:text-slate-700 bg-slate-50/50 shadow-3xs transition">
                              <MoreVertical className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Footer Pagination */}
              <div className="px-5 py-4 border-t border-slate-100 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white text-slate-455 font-bold select-none">
                <span className="text-[11px] font-bold text-slate-400">
                  Showing 1 to 5 of 186 results
                </span>
                
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-650 outline-none cursor-pointer shadow-3xs hover:bg-slate-50 transition">
                      <option>5 per page</option>
                      <option>10 / page</option>
                      <option>25 / page</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>

                  <div className="flex items-center gap-1">
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-400">&lt;</button>
                    <button className="h-8 w-8 rounded-lg bg-[#4F46E5] text-white flex items-center justify-center text-xs font-bold shadow-sm">1</button>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-semibold hover:bg-slate-50 transition text-slate-600">2</button>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-semibold hover:bg-slate-50 transition text-slate-600">3</button>
                    <span className="px-1 text-slate-300 text-xs">...</span>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-semibold hover:bg-slate-50 transition text-slate-600">38</button>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-400">&gt;</button>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Row inside Col-7: Donut + Moderation Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              
              {/* Donut Chart Widget */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex flex-col justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Risk Type Breakdown</h3>
                  <span className="h-4 w-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-400 cursor-help" title="Proportion of moderation issues flagged by type">i</span>
                </div>

                <div className="flex items-center justify-between gap-4 py-4 flex-1">
                  {/* SVG Donut Chart with drawing animation */}
                  <div className="relative w-24 h-24 shrink-0 select-none">
                    <style>{`
                      @keyframes drawUnsupported {
                        from { stroke-dashoffset: 219.9; }
                        to { stroke-dashoffset: 0; }
                      }
                      @keyframes drawMedical {
                        from { stroke-dashoffset: 219.9; }
                        to { stroke-dashoffset: -66.2; }
                      }
                      @keyframes drawUnsafe {
                        from { stroke-dashoffset: 219.9; }
                        to { stroke-dashoffset: -118.3; }
                      }
                      @keyframes drawLegal {
                        from { stroke-dashoffset: 219.9; }
                        to { stroke-dashoffset: -156.1; }
                      }
                      @keyframes drawMissing {
                        from { stroke-dashoffset: 219.9; }
                        to { stroke-dashoffset: -189.3; }
                      }
                    `}</style>
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* Circle 1: Unsupported Claim (30.1% -> blue) */}
                      <circle cx="50" cy="50" r="35" fill="transparent" stroke="#3B82F6" strokeWidth="12" strokeDasharray="66.2 153.7" strokeDashoffset="0" style={{ animation: "drawUnsupported 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards" }} />
                      {/* Circle 2: Medical Claim (23.7% -> red) */}
                      <circle cx="50" cy="50" r="35" fill="transparent" stroke="#EF4444" strokeWidth="12" strokeDasharray="52.1 167.8" strokeDashoffset="-66.2" style={{ animation: "drawMedical 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards" }} />
                      {/* Circle 3: Unsafe Recommendation (17.2% -> orange) */}
                      <circle cx="50" cy="50" r="35" fill="transparent" stroke="#F59E0B" strokeWidth="12" strokeDasharray="37.8 182.1" strokeDashoffset="-118.3" style={{ animation: "drawUnsafe 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards" }} />
                      {/* Circle 4: Legal Risk (15.1% -> green) */}
                      <circle cx="50" cy="50" r="35" fill="transparent" stroke="#10B981" strokeWidth="12" strokeDasharray="33.2 186.7" strokeDashoffset="-156.1" style={{ animation: "drawLegal 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards" }} />
                      {/* Circle 5: Missing Disclosure (14.0% -> purple) */}
                      <circle cx="50" cy="50" r="35" fill="transparent" stroke="#8B5CF6" strokeWidth="12" strokeDasharray="30.8 189.1" strokeDashoffset="-189.3" style={{ animation: "drawMissing 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards" }} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center leading-none text-center">
                      <span className="text-[10px] font-bold text-slate-400">Total</span>
                      <span className="text-base font-extrabold text-slate-900 mt-0.5">186</span>
                    </div>
                  </div>

                  {/* Legend list */}
                  <div className="flex-1 space-y-2 text-[10px] font-bold text-slate-700 pl-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#3B82F6]" />
                        <span className="text-slate-500 font-medium truncate max-w-[85px]">Unsupported Claim</span>
                      </div>
                      <span className="text-slate-900">56 <span className="text-slate-400 font-normal">(30.1%)</span></span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#EF4444]" />
                        <span className="text-slate-500 font-medium truncate max-w-[85px]">Medical Claim</span>
                      </div>
                      <span className="text-slate-900">44 <span className="text-slate-400 font-normal">(23.7%)</span></span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                        <span className="text-slate-500 font-medium truncate max-w-[85px]">Unsafe Rec.</span>
                      </div>
                      <span className="text-slate-900">32 <span className="text-slate-400 font-normal">(17.2%)</span></span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                        <span className="text-slate-500 font-medium truncate max-w-[85px]">Legal Risk</span>
                      </div>
                      <span className="text-slate-900">28 <span className="text-slate-400 font-normal">(15.1%)</span></span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#8B5CF6]" />
                        <span className="text-slate-500 font-medium truncate max-w-[85px]">Missing Disclosure</span>
                      </div>
                      <span className="text-slate-900">26 <span className="text-slate-400 font-normal">(14.0%)</span></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Moderation Checklist Widget */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex flex-col justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Moderation Checklist</h3>
                  <span className="h-4 w-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-400 cursor-help" title="Rules checklist and validation checks status">i</span>
                </div>

                <div className="divide-y divide-slate-100 font-semibold text-[11px] text-slate-700 mt-3 flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-655 font-medium">Verify claim has sufficient evidence</span>
                    <span className="text-slate-500 w-12 text-center">Yes</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 font-bold text-[9px]">Pass</span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-655 font-medium">Remove disease-treatment language</span>
                    <span className="text-slate-500 w-12 text-center">Yes</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 font-bold text-[9px]">Pass</span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-655 font-medium">Confirm required disclosures are present</span>
                    <span className="text-slate-500 w-12 text-center">Yes</span>
                    <span className="px-2 py-0.5 rounded bg-red-50 text-red-650 font-bold text-[9px]">Fail</span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-655 font-medium">Validate safer alternative wording</span>
                    <span className="text-slate-500 w-12 text-center">Yes</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 font-bold text-[9px]">Pass</span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-655 font-medium">Confirm compliance with platform policies</span>
                    <span className="text-slate-500 w-12 text-center">Yes</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 font-bold text-[9px]">Pass</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column (col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Output Review Detail Container */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs space-y-4">
              <h2 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Output Review Detail</h2>

              {/* Product Info Row */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-start gap-3 min-w-0">
                  {selectedProduct.thumbnail}
                  <div className="leading-tight min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 truncate">{selectedProduct.name}</h3>
                    <span className="text-[10px] text-slate-400 font-medium block mt-1">
                      Category: <span className="text-[#4F46E5] font-bold">{selectedProduct.category}</span>
                    </span>
                    <span className="text-[10px] text-slate-455 font-medium block mt-1">
                      Source / Trigger: <span className="text-slate-850 font-semibold">{selectedProduct.source}</span>
                    </span>
                    <span className="text-[10px] text-slate-455 font-medium block mt-1">
                      Detected: <span className="text-slate-800 font-medium">{selectedProduct.detectedDate} at {selectedProduct.detectedTime}</span>
                    </span>
                  </div>
                </div>

                {/* Score indicators */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="bg-slate-50/50 border border-slate-100 rounded-lg p-2 text-center w-[72px] shadow-3xs">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Risk Score</span>
                    <span className="text-base font-extrabold text-red-650 block mt-1">
                      {selectedProduct.riskScore}%
                    </span>
                  </div>
                  <div className="bg-slate-50/50 border border-slate-100 rounded-lg p-2 text-center w-[72px] shadow-3xs">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Confidence</span>
                    <span className="text-base font-extrabold text-amber-600 block mt-1">
                      {selectedProduct.confidence}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Flagged generated copy box */}
              <div className="bg-red-50/40 border border-red-100 rounded-xl p-4 space-y-2 relative overflow-hidden">
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-red-650 uppercase tracking-wider">
                  <AlertTriangle className="h-3.5 w-3.5 fill-red-50 text-red-650 shrink-0" />
                  Flagged Generated Copy (Risky)
                </div>
                <p className="text-[12px] font-bold text-red-600 italic leading-relaxed">
                  "{selectedProduct.flaggedCopy}"
                </p>
              </div>

              {/* Diagnosis Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-slate-100 pb-4 select-none">
                
                {/* Risk Analysis list */}
                <div className="space-y-2.5">
                  <h4 className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="h-4 w-4 rounded-full bg-red-100 text-red-650 flex items-center justify-center text-[9px] font-black shrink-0">1</span>
                    Risk Analysis
                  </h4>
                  <ul className="space-y-1.5 text-[10px] font-bold text-slate-655 list-disc pl-5">
                    {selectedProduct.riskAnalysis.map((item, idx) => (
                      <li key={idx} className="leading-tight">{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Policy Violations list */}
                <div className="space-y-2.5">
                  <h4 className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="h-4 w-4 rounded-full bg-red-100 text-red-650 flex items-center justify-center text-[9px] font-black shrink-0">2</span>
                    Policy Violations
                  </h4>
                  <ul className="space-y-1.5 text-[10px] font-bold text-slate-655 list-disc pl-5">
                    {selectedProduct.policyViolations.map((item, idx) => (
                      <li key={idx} className="leading-tight">{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Evidence Sources */}
                <div className="space-y-2.5 mt-2">
                  <h4 className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="h-4 w-4 rounded-full bg-[#E0E7FF] text-[#4F46E5] flex items-center justify-center text-[9px] font-black shrink-0">3</span>
                    Evidence Sources
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProduct.evidenceSources.map((source, idx) => (
                      <span
                        key={idx}
                        className={cn(
                          "px-2.5 py-0.5 rounded text-[9px] font-bold border",
                          source.type === "database" && "bg-indigo-50/50 text-[#4F46E5] border-indigo-150",
                          source.type === "copy" && "bg-indigo-50/50 text-[#4F46E5] border-indigo-150",
                          source.type === "expert" && "bg-purple-50/50 text-purple-650 border-purple-150",
                          source.type === "complaint" && "bg-red-50/50 text-red-650 border-red-150"
                        )}
                      >
                        {source.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Suggested safe rewrite */}
                <div className="space-y-2 mt-2">
                  <h4 className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[9px] font-black shrink-0">4</span>
                    Suggested Safe Rewrite
                  </h4>
                  <p className="text-[10.5px] font-medium text-slate-600 leading-relaxed bg-slate-50/50 border border-slate-100 rounded-lg p-2.5">
                    {selectedProduct.safeRewrite}
                  </p>
                </div>

              </div>

              {/* Notes block */}
              <div className="space-y-2.5">
                <label className="text-[10px] font-bold text-slate-550 block">Moderator Notes</label>
                <div className="relative">
                  <textarea
                    rows={3}
                    value={moderatorNotes}
                    onChange={(e) => setModeratorNotes(e.target.value.slice(0, 1000))}
                    placeholder="Add notes, rationale, or references for this decision..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-700 outline-none focus:bg-white focus:border-slate-350 transition-colors resize-none placeholder:text-slate-400 font-medium"
                  />
                  <span className="absolute bottom-2.5 right-3 text-[9px] font-semibold text-slate-400">
                    {moderatorNotes.length} / 1000
                  </span>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="grid grid-cols-2 gap-2 pt-2 select-none text-xs font-bold text-white">
                <button className="flex items-center justify-center gap-1.5 h-9 bg-[#10B981] hover:bg-[#059669] rounded-lg shadow-2xs transition">
                  <Edit3 className="h-3.5 w-3.5" /> Approve with Edits
                </button>
                <button className="flex items-center justify-center gap-1.5 h-9 bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-2xs transition">
                  <Sparkles className="h-3.5 w-3.5" /> Send to AI Review
                </button>
                <button className="flex items-center justify-center gap-1.5 h-9 bg-[#EF4444] hover:bg-[#DC2626] rounded-lg shadow-2xs transition">
                  <Trash2 className="h-3.5 w-3.5" /> Remove Output
                </button>
                <button className="flex items-center justify-center gap-1.5 h-9 bg-[#F59E0B] hover:bg-[#D97706] rounded-lg shadow-2xs transition">
                  <Flag className="h-3.5 w-3.5" /> Escalate
                </button>
              </div>

            </div>

            {/* Recent Decisions Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs space-y-4 select-none">
              <h2 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Recent Decisions</h2>

              <div className="divide-y divide-slate-100 font-semibold text-xs text-slate-700">
                {/* Decision 1 */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                    <div className="leading-tight min-w-0">
                      <span className="text-slate-900 block truncate">Approved with edits</span>
                      <span className="text-[10px] text-slate-450 font-medium block mt-0.5 truncate">
                        CeraVe Moisturizing Cream – Legal risk
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-[10px] shrink-0 pl-2">
                    <span className="text-slate-400 font-medium block">by Priya S.</span>
                    <span className="text-slate-400 font-medium block mt-0.5">10m ago</span>
                  </div>
                </div>

                {/* Decision 2 */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <AlertCircle className="h-4.5 w-4.5 text-amber-500 shrink-0" />
                    <div className="leading-tight min-w-0">
                      <span className="text-slate-900 block truncate">Sent to AI review</span>
                      <span className="text-[10px] text-slate-450 font-medium block mt-0.5 truncate">
                        Sony WH-1000XM5 – Missing disclosure
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-[10px] shrink-0 pl-2">
                    <span className="text-slate-400 font-medium block">by Arjun R.</span>
                    <span className="text-slate-400 font-medium block mt-0.5">27m ago</span>
                  </div>
                </div>

                {/* Decision 3 */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <XCircle className="h-4.5 w-4.5 text-red-500 shrink-0" />
                    <div className="leading-tight min-w-0">
                      <span className="text-slate-900 block truncate">Removed output</span>
                      <span className="text-[10px] text-slate-450 font-medium block mt-0.5 truncate">
                        HerbSlim Detox Tea – Unsupported claim
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-[10px] shrink-0 pl-2">
                    <span className="text-slate-400 font-medium block">by Neha K.</span>
                    <span className="text-slate-400 font-medium block mt-0.5">1h ago</span>
                  </div>
                </div>

                {/* Decision 4 */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Flag className="h-4.5 w-4.5 text-amber-600 shrink-0" />
                    <div className="leading-tight min-w-0">
                      <span className="text-slate-900 block truncate">Escalated to policy team</span>
                      <span className="text-[10px] text-slate-450 font-medium block mt-0.5 truncate">
                        Kids Immunity Gummies – Unsafe recommendation
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-[10px] shrink-0 pl-2">
                    <span className="text-slate-400 font-medium block">by Michael T.</span>
                    <span className="text-slate-400 font-medium block mt-0.5">2h ago</span>
                  </div>
                </div>
              </div>

              <button className="w-full text-left text-[11px] font-bold text-[#4F46E5] hover:text-[#4338CA] transition pt-2 flex items-center gap-1 border-t border-slate-100">
                View all decisions <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
