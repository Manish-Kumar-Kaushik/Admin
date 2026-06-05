"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Trash2,
  AlertTriangle,
  User,
  Clock,
  ShieldCheck,
  HelpCircle,
  Download,
  Filter,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  MoreVertical,
  ExternalLink,
  Eye,
  Check,
  Copy,
  X,
  Shield,
  Video,
  MessageSquare,
  FileText,
  Image as ImageIcon
} from "lucide-react";

interface ContentItem {
  id: string;
  type: "ai" | "text" | "video" | "image";
  typeLabel: string;
  contentText: string;
  productName: string;
  productSku?: string;
  source: string;
  sourceLogo: React.ReactNode;
  removedBy: "AI Auto-Remove" | "Human Review";
  reason: string;
  reasonBadge?: string;
  severity: "High" | "Medium" | "Low";
  removedDate: string;
  removedTime: string;
  thumbnail: React.ReactNode;
  detectedBy: string;
  reasonDetail: string;
  actionsTaken: string[];
}

// Brand SVG Logos
const AmazonLogo = () => (
  <div className="flex flex-col items-center justify-center shrink-0 relative select-none scale-90">
    <span className="font-black text-slate-900 text-[10px] leading-none">a</span>
    <svg viewBox="0 0 16 4" fill="none" className="w-3 h-0.5 text-amber-500 -mt-[1px]">
      <path d="M1 1c2 2 8 2 14 0" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M13.5 0.5L15 1L14 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const BestBuyLogo = () => (
  <span className="inline-flex items-center justify-center bg-yellow-400 text-[8px] font-black text-slate-900 px-1 rounded-sm uppercase tracking-tighter scale-90">
    Best Buy
  </span>
);

const WalmartLogo = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-sky-500 fill-current shrink-0">
    <path d="M12 0l2.2 6.8h7.1l-5.7 4.2 2.2 6.8-5.8-4.2-5.8 4.2 2.2-6.8-5.7-4.2h7.1z" />
  </svg>
);

const EbayLogo = () => (
  <span className="text-[10px] font-extrabold tracking-tighter leading-none select-none">
    <span className="text-red-500">e</span>
    <span className="text-blue-500">b</span>
    <span className="text-yellow-500">a</span>
    <span className="text-green-500">y</span>
  </span>
);

// Thumbnail SVGs
const HeadphoneIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-slate-600 bg-slate-100 rounded-lg p-1.5 border border-slate-200 shrink-0">
    <rect x="6" y="14" width="4" height="10" rx="1.5" fill="currentColor" />
    <rect x="22" y="14" width="4" height="10" rx="1.5" fill="currentColor" />
    <path d="M8 14V12a8 8 0 0 1 16 0v2" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-slate-600 bg-slate-100 rounded-lg p-1.5 border border-slate-200 shrink-0">
    <rect x="9" y="4" width="14" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="16" cy="24" r="1.5" fill="currentColor" />
    <rect x="14" y="6" width="4" height="1" rx="0.5" fill="currentColor" />
  </svg>
);

const SpeakerIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-slate-600 bg-slate-100 rounded-lg p-1.5 border border-slate-200 shrink-0">
    <rect x="9" y="6" width="14" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="16" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="16" cy="20" r="2.5" fill="currentColor" />
  </svg>
);

const HairdryerIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-slate-600 bg-slate-100 rounded-lg p-1.5 border border-slate-200 shrink-0">
    <path d="M10 8h10c2.5 0 4.5 2 4.5 4.5S22.5 17 20 17H12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <rect x="10" y="16" width="4.5" height="11" rx="1.5" fill="currentColor" />
  </svg>
);

const mockContent: ContentItem[] = [
  {
    id: "CR-871239",
    type: "ai",
    typeLabel: "AI Generated Review",
    contentText: "This product is 100% best...",
    productName: "Sony WH-1000XM5",
    productSku: "Amazon",
    source: "Amazon",
    sourceLogo: <AmazonLogo />,
    removedBy: "AI Auto-Remove",
    reason: "Misleading Claim",
    reasonBadge: "Prohibited",
    severity: "High",
    removedDate: "May 26, 2025",
    removedTime: "10:24 AM",
    thumbnail: <HeadphoneIcon />,
    detectedBy: "AI Policy Engine v2.4",
    reasonDetail: "The content contained exaggerated claims that violate our misleading information policy.",
    actionsTaken: ["Content removed", "User notified", "Account monitored"]
  },
  {
    id: "CC-992311",
    type: "video",
    typeLabel: "YouTube Comment",
    contentText: "Worst ever, fake brand...",
    productName: "iPhone 15 Pro Max",
    productSku: "Best Buy",
    source: "Best Buy",
    sourceLogo: <BestBuyLogo />,
    removedBy: "AI Auto-Remove",
    reason: "Harassment / Abusive",
    severity: "High",
    removedDate: "May 26, 2025",
    removedTime: "09:58 AM",
    thumbnail: <PhoneIcon />,
    detectedBy: "AI Policy Engine v2.4",
    reasonDetail: "The content contained direct personal attacks and target harassment toward a user segment.",
    actionsTaken: ["Content removed", "User warning issued"]
  },
  {
    id: "RV-332112",
    type: "text",
    typeLabel: "User Review",
    contentText: "Scam product, don't buy...",
    productName: "JBL Charge 5",
    productSku: "Walmart",
    source: "Walmart",
    sourceLogo: <WalmartLogo />,
    removedBy: "Human Review",
    reason: "False Information",
    severity: "Medium",
    removedDate: "May 25, 2025",
    removedTime: "08:11 PM",
    thumbnail: <SpeakerIcon />,
    detectedBy: "Moderator Admin Team",
    reasonDetail: "The claim of 'scam product' was investigated and proven false, intending to damage seller reputation.",
    actionsTaken: ["Content removed", "Seller notified"]
  },
  {
    id: "IM-554761",
    type: "image",
    typeLabel: "Uploaded Image",
    contentText: "(Contains sensitive text)",
    productName: "Dyson Airwrap",
    productSku: "Amazon",
    source: "Amazon",
    sourceLogo: <AmazonLogo />,
    removedBy: "AI Auto-Remove",
    reason: "Sensitive / PII Detected",
    severity: "Medium",
    removedDate: "May 25, 2025",
    removedTime: "06:35 PM",
    thumbnail: <HairdryerIcon />,
    detectedBy: "PII Scan Engine v1.2",
    reasonDetail: "Image contains visible social security numbers or billing credentials.",
    actionsTaken: ["Content removed", "Account locked for verification"]
  },
  {
    id: "YT-778233",
    type: "video",
    typeLabel: "YouTube Title",
    contentText: "Buy this or you'll regret!",
    productName: "Samsung S24 Ultra",
    productSku: "eBay",
    source: "eBay",
    sourceLogo: <EbayLogo />,
    removedBy: "Human Review",
    reason: "Clickbait / Misleading",
    severity: "Low",
    removedDate: "May 25, 2025",
    removedTime: "04:12 PM",
    thumbnail: <PhoneIcon />,
    detectedBy: "Moderator Support Desk",
    reasonDetail: "The title violates the clickbait policy by generating unnecessary panic or urgency.",
    actionsTaken: ["Title force-updated", "Content flagged for shadow ban"]
  }
];

export default function RemovedContent() {
  const [selectedItem, setSelectedItem] = useState<ContentItem>(mockContent[0]);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [copied, setCopied] = useState<boolean>(false);
  const [panelOpen, setPanelOpen] = useState<boolean>(true);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#FAFBFD] min-h-full w-full font-sans pb-6">
      {/* Container - using padding-x to adjust to edge on all screens */}
      <div className="w-full max-w-full px-3 sm:px-4 md:px-5 py-4 md:py-6 space-y-4 md:space-y-6">
        
        {/* Title / Action Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full select-none">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl border border-[#EEF2FF] bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5] shadow-3xs shrink-0">
              <Shield className="h-5 w-5 fill-[#4F46E5] text-[#4F46E5]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
                Removed Content
              </h1>
              <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
                Content removed by AI, automation, or human review for policy violations.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button className="flex justify-center items-center gap-1.5 h-9 px-3.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-3xs transition whitespace-nowrap">
              <HelpCircle className="h-4 w-4 text-slate-400" /> Help Guide
            </button>
            <button className="flex justify-center items-center gap-1.5 h-9 px-3.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-3xs transition whitespace-nowrap">
              <Download className="h-4 w-4 text-slate-400" /> Export
            </button>
            <button className="flex justify-center items-center gap-1.5 h-9 px-3.5 text-xs font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm transition whitespace-nowrap">
              <Filter className="h-4 w-4" /> Filters <span className="bg-white/20 text-white rounded-full px-1.5 py-0.5 text-[10px] font-bold">2</span>
            </button>
          </div>
        </div>

        {/* Master Flex Layout - Stack vertically on screens below lg (mobile, tablets), side-by-side on lg and larger */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 w-full items-stretch lg:items-start">
          
          {/* Left Column Area (KPIs, Filters, Table) */}
          <div className="flex-1 w-full min-w-0 space-y-4 md:space-y-6">
            
            {/* KPI Cards Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2.5 sm:gap-3 w-full">
              {/* Total Removed */}
              <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-3xs flex items-center gap-3 w-full min-w-0">
                <div className="h-9 w-9 rounded-xl bg-red-50 text-red-550 flex items-center justify-center shrink-0">
                  <Trash2 className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 leading-tight">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Total Removed</span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-base sm:text-lg font-extrabold text-slate-900 block">1,248</span>
                    <span className="text-[9px] text-red-600 font-bold">↑ 14%</span>
                  </div>
                  <span className="text-[8px] text-slate-400 font-medium block">vs last 7 days</span>
                </div>
              </div>

              {/* AI Removed */}
              <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-3xs flex items-center gap-3 w-full min-w-0">
                <div className="h-9 w-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <AlertTriangle className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 leading-tight">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">AI Removed</span>
                  <span className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5 block">842</span>
                  <span className="text-[9px] text-slate-500 font-bold block mt-0.5">67.6%</span>
                </div>
              </div>

              {/* Human Removed */}
              <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-3xs flex items-center gap-3 w-full min-w-0">
                <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <User className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 leading-tight">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Human Removed</span>
                  <span className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5 block">306</span>
                  <span className="text-[9px] text-slate-500 font-bold block mt-0.5">24.5%</span>
                </div>
              </div>

              {/* Pending Appeal */}
              <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-3xs flex items-center gap-3 w-full min-w-0">
                <div className="h-9 w-9 rounded-xl bg-purple-50 text-purple-650 flex items-center justify-center shrink-0">
                  <Clock className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 leading-tight">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Pending Appeal</span>
                  <span className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5 block">58</span>
                  <span className="text-[9px] text-slate-500 font-bold block mt-0.5">4.7%</span>
                </div>
              </div>

              {/* Policy Categories */}
              <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-3xs flex items-center gap-3 w-full min-w-0 col-span-2 sm:col-span-1">
                <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 leading-tight">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Policy Categories</span>
                  <span className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5 block">12</span>
                  <span className="text-[8px] text-slate-400 font-medium block">Active policies</span>
                </div>
              </div>
            </div>

            {/* Filter bar */}
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex flex-wrap items-center gap-3.5 select-none shadow-3xs">
              {/* Date range picker */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Date Range</span>
                <div className="relative flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
                  <input
                    type="text"
                    value="May 20 - May 26"
                    readOnly
                    className="border-0 bg-transparent py-1.5 pl-3 pr-8 text-xs font-bold text-slate-700 outline-none w-[140px]"
                  />
                  <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Removal Source */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Removal Source</span>
                <div className="relative">
                  <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer w-[125px]">
                    <option>All Sources</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Reason */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Reason</span>
                <div className="relative">
                  <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer w-[125px]">
                    <option>All Reasons</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Content Type */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Content Type</span>
                <div className="relative">
                  <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer w-[125px]">
                    <option>All Types</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Severity */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Severity</span>
                <div className="relative">
                  <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer w-[125px]">
                    <option>All Severity</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <button className="flex items-center gap-1.5 text-xs font-bold text-[#4F46E5] hover:text-[#4338CA] transition md:mt-4 ml-auto">
                <RotateCcw className="h-3.5 w-3.5" /> Clear All
              </button>
            </div>

            {/* Main content table card */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-3xs overflow-hidden min-w-0">
              {/* Table Navigation Header */}
              <div className="px-4 py-3 border-b border-slate-100 flex flex-wrap gap-3 items-center justify-between select-none">
                <div className="flex flex-wrap gap-1 text-xs font-bold text-slate-500">
                  <button
                    onClick={() => setActiveTab("All")}
                    className={cn(
                      "px-3 py-2 border-b-2 transition-all",
                      activeTab === "All" ? "border-[#4F46E5] text-[#4F46E5] font-extrabold" : "border-transparent hover:text-slate-800"
                    )}
                  >
                    Removed Content (1,248)
                  </button>
                  <button
                    onClick={() => setActiveTab("AI")}
                    className={cn(
                      "px-3 py-2 border-b-2 transition-all",
                      activeTab === "AI" ? "border-[#4F46E5] text-[#4F46E5] font-extrabold" : "border-transparent hover:text-slate-800"
                    )}
                  >
                    AI Removed (842)
                  </button>
                  <button
                    onClick={() => setActiveTab("Human")}
                    className={cn(
                      "px-3 py-2 border-b-2 transition-all",
                      activeTab === "Human" ? "border-[#4F46E5] text-[#4F46E5] font-extrabold" : "border-transparent hover:text-slate-800"
                    )}
                  >
                    Human Removed (306)
                  </button>
                  <button
                    onClick={() => setActiveTab("Appeals")}
                    className={cn(
                      "px-3 py-2 border-b-2 transition-all",
                      activeTab === "Appeals" ? "border-[#4F46E5] text-[#4F46E5] font-extrabold" : "border-transparent hover:text-slate-800"
                    )}
                  >
                    Appeals (58)
                  </button>
                </div>
              </div>

              {/* Table wrapper */}
              <div className="overflow-x-auto w-full">
                <table className="w-full min-w-[780px] text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/60 border-b border-slate-150 text-slate-400 font-bold uppercase tracking-wider text-[10px] select-none">
                      <th className="py-3 px-3 w-[5%] text-center">
                        <input type="checkbox" className="rounded border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5 cursor-pointer" />
                      </th>
                      <th className="py-3 px-3 w-[35%]">Content</th>
                      <th className="py-3 px-3 w-[20%]">Product / Source</th>
                      <th className="py-3 px-3 w-[14%]">Removed By</th>
                      <th className="py-3 px-3 w-[12%]">Reason</th>
                      <th className="py-3 px-3 w-[8%]">Severity</th>
                      <th className="py-3 px-3 w-[14%]">Removed On</th>
                      <th className="py-3 px-3 w-[4%] text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {mockContent.map((item) => {
                      const isSelected = item.id === selectedItem?.id;
                      return (
                        <tr
                          key={item.id}
                          className={cn(
                            "hover:bg-slate-50/40 transition-colors cursor-pointer",
                            isSelected ? "bg-red-50/30" : ""
                          )}
                          onClick={() => {
                            setSelectedItem(item);
                            setPanelOpen(true);
                          }}
                        >
                          <td className="py-3.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {
                                setSelectedItem(item);
                                setPanelOpen(true);
                              }}
                              className="rounded border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5 cursor-pointer"
                            />
                          </td>
                          
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-[10px] text-white shadow-3xs",
                                item.type === "ai" && "bg-indigo-500",
                                item.type === "text" && "bg-slate-700",
                                item.type === "video" && "bg-red-500",
                                item.type === "image" && "bg-slate-400"
                              )}>
                                {item.type === "ai" && "AI"}
                                {item.type === "text" && "TEXT"}
                                {item.type === "video" && <Video className="h-4 w-4 text-white" />}
                                {item.type === "image" && "IMG"}
                              </div>
                              <div className="leading-tight min-w-0">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">{item.typeLabel}</span>
                                <span className="text-xs font-bold text-slate-900 block truncate mt-0.5 max-w-[200px]">
                                  "{item.contentText}"
                                </span>
                                <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Content ID: {item.id}</span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-2.5 min-w-0">
                              {item.thumbnail}
                              <div className="leading-tight min-w-0">
                                <span className="text-xs font-bold text-slate-900 block truncate">{item.productName}</span>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className="text-[10px] text-slate-400 font-semibold block truncate">{item.source}</span>
                                  {item.sourceLogo}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-3">
                            <span className={cn(
                              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border shadow-3xs",
                              item.removedBy === "AI Auto-Remove" 
                                ? "bg-purple-50 text-purple-650 border-purple-100" 
                                : "bg-amber-50 text-amber-600 border-amber-100"
                            )}>
                              {item.removedBy === "AI Auto-Remove" ? (
                                <>
                                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                                  AI Auto-Remove
                                </>
                              ) : (
                                <>
                                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                                  Human Review
                                </>
                              )}
                            </span>
                          </td>

                          <td className="py-3.5 px-3 text-slate-655 font-semibold">
                            <div className="leading-tight">
                              <span className="text-slate-900 block">{item.reason}</span>
                              {item.reasonBadge && (
                                <span className="inline-block mt-0.5 px-1.5 py-0.2 bg-red-50 text-red-650 text-[9px] font-bold rounded uppercase tracking-wider">
                                  {item.reasonBadge}
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="py-3.5 px-3 select-none">
                            <span className={cn(
                              "inline-flex items-center gap-1 text-[10px] font-bold",
                              item.severity === "High" && "text-red-600",
                              item.severity === "Medium" && "text-amber-600",
                              item.severity === "Low" && "text-emerald-600"
                            )}>
                              <span className={cn(
                                "h-1.5 w-1.5 rounded-full",
                                item.severity === "High" && "bg-red-600",
                                item.severity === "Medium" && "bg-amber-500",
                                item.severity === "Low" && "bg-emerald-500"
                              )}></span>
                              {item.severity}
                            </span>
                          </td>

                          <td className="py-3.5 px-3 text-[11px] leading-tight font-medium text-slate-500">
                            <span className="text-slate-800 font-semibold block">{item.removedDate}</span>
                            <span className="text-slate-400 block mt-0.5">{item.removedTime}</span>
                          </td>

                          <td className="py-3.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
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

              {/* Pagination Footer */}
              <div className="px-4 py-3 border-t border-slate-100 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white text-slate-400 font-bold select-none">
                <span className="text-[11px] font-bold text-slate-400">
                  Showing 1-10 of 1,248 results
                </span>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-400 font-medium">Rows per page</span>
                    <div className="relative">
                      <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-650 outline-none cursor-pointer hover:bg-slate-50 transition shadow-3xs">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
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
                    <span className="px-1 text-slate-300 text-xs">...</span>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-semibold hover:bg-slate-50 transition text-slate-600">125</button>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-455">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Details Panel - Dynamic width for stacking on smaller screens */}
          {panelOpen && selectedItem && (
            <div className="w-full lg:w-[340px] xl:w-[360px] bg-white border border-slate-200 rounded-xl shadow-3xs overflow-hidden shrink-0 flex flex-col">
              {/* Sidebar Header */}
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">Content Details</h3>
                <button
                  onClick={() => setPanelOpen(false)}
                  className="h-6 w-6 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Sidebar Body */}
              <div className="p-5 flex-1 overflow-y-auto space-y-4">
                
                {/* Header Tag Info */}
                <div className="flex items-center gap-2.5">
                  <span className="h-6 px-2 rounded bg-indigo-500 text-white font-extrabold text-[10px] flex items-center justify-center">
                    AI
                  </span>
                  <span className="h-6 px-2.5 rounded-full bg-purple-50 text-purple-650 border border-purple-100 font-bold text-[10px] flex items-center justify-center">
                    {selectedItem.removedBy}
                  </span>
                </div>

                {/* Info Fields */}
                <div className="space-y-3.5 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Content ID</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900">{selectedItem.id}</span>
                      <button 
                        onClick={() => handleCopyId(selectedItem.id)}
                        className="p-1 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded transition"
                      >
                        {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Removed On</span>
                    <span className="text-xs font-bold text-slate-800">{selectedItem.removedDate} • {selectedItem.removedTime}</span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Product / Source</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-800">{selectedItem.productName}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                        {selectedItem.source}
                        {selectedItem.sourceLogo}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Content Type</span>
                    <span className="text-xs font-bold text-slate-800">{selectedItem.typeLabel}</span>
                  </div>
                </div>

                {/* Reason description box */}
                <div className="pt-2">
                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reason</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 text-red-650 text-[9px] font-extrabold border border-red-100 uppercase tracking-wider">
                        <span className="h-1 w-1 rounded-full bg-red-600"></span>
                        {selectedItem.reason}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                      {selectedItem.reasonDetail}
                    </p>
                  </div>
                </div>

                {/* Severity Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Severity</span>
                  <span className={cn(
                    "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border",
                    selectedItem.severity === "High" && "bg-red-50 text-red-600 border-red-100",
                    selectedItem.severity === "Medium" && "bg-amber-50 text-amber-600 border-amber-100",
                    selectedItem.severity === "Low" && "bg-emerald-50 text-emerald-600 border-emerald-100"
                  )}>
                    <span className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      selectedItem.severity === "High" && "bg-red-600",
                      selectedItem.severity === "Medium" && "bg-amber-500",
                      selectedItem.severity === "Low" && "bg-emerald-500"
                    )}></span>
                    {selectedItem.severity} Risk
                  </span>
                </div>

                {/* Detected By */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Detected By</span>
                  <span className="text-xs font-bold text-slate-800">{selectedItem.detectedBy}</span>
                </div>

                {/* Actions Taken Checklist */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Actions Taken</span>
                  <div className="space-y-1.5">
                    {selectedItem.actionsTaken.map((action, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                        <span className="h-4.5 w-4.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-3xs shrink-0 select-none">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </span>
                        {action}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Sidebar Footer Buttons */}
              <div className="p-5 border-t border-slate-100 bg-[#FAFBFD] space-y-2.5 select-none font-bold">
                <button className="w-full flex items-center justify-center gap-2 h-9 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-3xs transition">
                  <Eye className="h-4 w-4 text-slate-400" /> View Full Content
                </button>
                <button className="w-full flex items-center justify-center gap-2 h-9 text-xs font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm transition">
                  View in Context <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
