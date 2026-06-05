"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  Download,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Eye,
  Copy,
  Plus,
  Minus,
  RefreshCw,
  ExternalLink,
  Check,
  Grid,
  List,
  Smartphone,
  Headphones,
  ShoppingBag
} from "lucide-react";

interface DisclaimerItem {
  id: string;
  disclaimer: string;
  fullDisclaimer: string;
  productName: string;
  brand: string;
  category: string;
  source: string;
  status: "Pending Review" | "Needs Update" | "Approved" | "Rejected";
  priority: "Low" | "Medium" | "High";
  submittedOn: string;
  submittedTime: string;
  thumbnail: React.ReactNode;
  usedOn: string;
  language: string;
  region: string;
  notes: string;
  reviewer: string;
  reviewerAvatar: string;
  updatedOn: string;
  history: {
    submitted: string;
    underReview?: string;
    pendingUpdate?: string;
  };
}

// Icons for product thumbnails
const FishOilIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-amber-600 bg-amber-50 rounded-lg p-1.5 border border-slate-150 shrink-0">
    <rect x="10" y="8" width="12" height="18" rx="2" fill="#D97706" />
    <ellipse cx="16" cy="14" rx="4" ry="2" fill="#fff" opacity="0.9" />
  </svg>
);

const RiceIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-red-600 bg-red-50 rounded-lg p-1.5 border border-slate-150 shrink-0">
    <rect x="11" y="9" width="10" height="17" rx="3" fill="#EF4444" />
    <path d="M11 14h10" stroke="#fff" strokeWidth="1.5" />
  </svg>
);

const VitaminIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-orange-600 bg-orange-50 rounded-lg p-1.5 border border-slate-150 shrink-0">
    <rect x="11" y="9" width="10" height="17" rx="3" fill="#F97316" />
    <circle cx="16" cy="15" r="3" fill="#fff" opacity="0.8" />
  </svg>
);

const PotIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-slate-600 bg-slate-50 rounded-lg p-1.5 border border-slate-150 shrink-0">
    <rect x="8" y="12" width="16" height="13" rx="2" fill="#64748B" />
    <path d="M12 12V8h8v4" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const mockDisclaimers: DisclaimerItem[] = [
  {
    id: "1",
    disclaimer: "*These statements have not been evaluated by the Food and...",
    fullDisclaimer: "*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.",
    productName: "Omega-3 Fish Oil",
    brand: "Nature's Bounty",
    category: "Supplements",
    source: "Product Page",
    status: "Pending Review",
    priority: "Medium",
    submittedOn: "May 12, 2025",
    submittedTime: "10:24 AM",
    thumbnail: <FishOilIcon />,
    usedOn: "Product Page",
    language: "English",
    region: "United States",
    notes: "Standard FDA dietary supplement disclaimer. Substantive evidence has been submitted.",
    reviewer: "Jessica Martinez",
    reviewerAvatar: "JM",
    updatedOn: "May 12, 2025 10:24 AM",
    history: {
      submitted: "May 12, 2025 10:24 AM",
      underReview: "May 12, 2025 11:00 AM by Jessica Martinez"
    }
  },
  {
    id: "2",
    disclaimer: "†Results may vary. Not intended to diagnose, treat, cure or...",
    fullDisclaimer: "†Results may vary. Not intended to diagnose, treat, cure or prevent any health conditions. Consult your doctor before starting any supplement routine.",
    productName: "Red Yeast Rice",
    brand: "Solaray",
    category: "Supplements",
    source: "Product Page",
    status: "Needs Update",
    priority: "High",
    submittedOn: "May 12, 2025",
    submittedTime: "09:15 AM",
    thumbnail: <RiceIcon />,
    usedOn: "Product Page",
    language: "English",
    region: "United States",
    notes: "Requires standard clinical trial citation on the product description page.",
    reviewer: "Jessica Martinez",
    reviewerAvatar: "JM",
    updatedOn: "May 12, 2025 09:30 AM",
    history: {
      submitted: "May 12, 2025 09:15 AM",
      underReview: "May 12, 2025 09:30 AM by Jessica Martinez"
    }
  },
  {
    id: "3",
    disclaimer: "**Price and availability are subject to change without notice....",
    fullDisclaimer: "**Price and availability are subject to change without notice. Promotion valid for select dates and quantities only.",
    productName: "Sony WH-1000XM5",
    brand: "Sony",
    category: "Electronics",
    source: "Comparison Page",
    status: "Pending Review",
    priority: "Low",
    submittedOn: "May 12, 2025",
    submittedTime: "08:42 AM",
    thumbnail: <Headphones className="h-8 w-8 text-blue-600 bg-blue-50 rounded-lg p-1.5 border border-slate-150 shrink-0" />,
    usedOn: "Comparison Page",
    language: "English",
    region: "United States",
    notes: "Pricing update disclaimer. Simple checkout review required.",
    reviewer: "Admin User",
    reviewerAvatar: "AU",
    updatedOn: "May 12, 2025 08:45 AM",
    history: {
      submitted: "May 12, 2025 08:42 AM"
    }
  },
  {
    id: "4",
    disclaimer: "This product is not a substitute for professional medical advice....",
    fullDisclaimer: "This product is not a substitute for professional medical advice. Always consult a healthcare provider with any questions regarding health conditions.",
    productName: "Vitamin D3 5000 IU",
    brand: "NOW Foods",
    category: "Supplements",
    source: "Blog Article",
    status: "Approved",
    priority: "Medium",
    submittedOn: "May 11, 2025",
    submittedTime: "05:30 PM",
    thumbnail: <VitaminIcon />,
    usedOn: "Blog Article",
    language: "English",
    region: "United States",
    notes: "Approved standard medical disclaimer for general nutritional guidelines.",
    reviewer: "Jessica Martinez",
    reviewerAvatar: "JM",
    updatedOn: "May 11, 2025 05:45 PM",
    history: {
      submitted: "May 11, 2025 05:30 PM",
      underReview: "May 11, 2025 05:40 PM by Jessica Martinez"
    }
  },
  {
    id: "5",
    disclaimer: "Affiliate disclosure: We may earn a commission when you buy...",
    fullDisclaimer: "Affiliate disclosure: We may earn a commission when you buy through links on our site at no extra cost to you.",
    productName: "iPhone 15 Pro Max",
    brand: "Apple",
    category: "Electronics",
    source: "Product Page",
    status: "Approved",
    priority: "Low",
    submittedOn: "May 11, 2025",
    submittedTime: "03:12 PM",
    thumbnail: <Smartphone className="h-8 w-8 text-slate-655 bg-slate-50 rounded-lg p-1.5 border border-slate-150 shrink-0" />,
    usedOn: "Product Page",
    language: "English",
    region: "United States",
    notes: "FTC required affiliate link disclosure statement.",
    reviewer: "Jessica Martinez",
    reviewerAvatar: "JM",
    updatedOn: "May 11, 2025 03:20 PM",
    history: {
      submitted: "May 11, 2025 03:12 PM",
      underReview: "May 11, 2025 03:20 PM by Jessica Martinez"
    }
  },
  {
    id: "6",
    disclaimer: "Not recommended for children, pregnant or nursing women....",
    fullDisclaimer: "Not recommended for children, pregnant or nursing women. Keep out of reach of children. Consult a healthcare professional before use.",
    productName: "Ashwagandha 1000mg",
    brand: "Himalaya",
    category: "Supplements",
    source: "Product Page",
    status: "Needs Update",
    priority: "High",
    submittedOn: "May 11, 2025",
    submittedTime: "01:05 PM",
    thumbnail: <FishOilIcon />,
    usedOn: "Product Page",
    language: "English",
    region: "United States",
    notes: "Needs explicit warning for sensitive demographics.",
    reviewer: "Jessica Martinez",
    reviewerAvatar: "JM",
    updatedOn: "May 11, 2025 01:10 PM",
    history: {
      submitted: "May 11, 2025 01:05 PM",
      underReview: "May 11, 2025 01:10 PM by Jessica Martinez"
    }
  },
  {
    id: "7",
    disclaimer: "Always read labels, warnings, and instructions before use....",
    fullDisclaimer: "Always read labels, warnings, and instructions before use. Improper use can cause injury.",
    productName: "Instant Pot Duo 7-in-1",
    brand: "Instant Pot",
    category: "Home & Kitchen",
    source: "Product Page",
    status: "Pending Review",
    priority: "Medium",
    submittedOn: "May 11, 2025",
    submittedTime: "11:47 AM",
    thumbnail: <PotIcon />,
    usedOn: "Product Page",
    language: "English",
    region: "United States",
    notes: "General safety disclaimer. Consider adding link to official safety guide.",
    reviewer: "Jessica Martinez",
    reviewerAvatar: "JM",
    updatedOn: "May 11, 2025 11:47 AM",
    history: {
      submitted: "May 10, 2025 10:20 AM",
      underReview: "May 11, 2025 11:47 AM by Jessica Martinez",
      pendingUpdate: "-"
    }
  }
];

export default function DisclaimerReview() {
  const [selectedItem, setSelectedItem] = useState<DisclaimerItem>(mockDisclaimers[6]);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredDisclaimers = mockDisclaimers.filter((item) => {
    if (activeTab === "All") return true;
    return item.status === activeTab;
  });

  return (
    <div className="bg-[#FAFBFD] min-h-full w-full font-sans pb-6">
      <div className="w-full max-w-full px-3 sm:px-4 md:px-5 py-4 md:py-6 space-y-4 md:space-y-6">
        
        {/* Title & Action Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full select-none">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
              Disclaimer Review
            </h1>
            <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
              Review and manage product disclaimers for accuracy, clarity and compliance.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <input
                type="text"
                placeholder="Search disclaimers, products..."
                className="w-full bg-white border border-slate-200 rounded-lg pl-3 pr-10 py-1.5 text-xs text-slate-700 font-medium outline-none focus:border-slate-350 transition-colors shadow-3xs"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-extrabold text-slate-400 border border-slate-200 rounded px-1.5 py-0.5 pointer-events-none select-none bg-slate-50">
                ⌘ K
              </span>
            </div>
            {/* Export button */}
            <button className="flex justify-center items-center gap-1.5 h-9 px-3.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-3xs transition whitespace-nowrap">
              <Download className="h-3.5 w-3.5 text-slate-400" /> Export
            </button>
            {/* Filters button */}
            <button className="flex justify-center items-center gap-1.5 h-9 px-3.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-3xs transition whitespace-nowrap">
              <Filter className="h-3.5 w-3.5 text-slate-400" /> Filters
            </button>
          </div>
        </div>

        {/* 5 Stats KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-3xs flex items-center justify-between w-full min-w-0">
            <div className="min-w-0 leading-tight space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Disclaimers</span>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">1,248</span>
              <span className="text-[9px] text-emerald-600 font-bold block">
                ↑ 18.6% <span className="text-slate-400 font-medium">vs last 30 days</span>
              </span>
            </div>
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-650 flex items-center justify-center shrink-0">
              <FileText className="h-5 w-5" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-3xs flex items-center justify-between w-full min-w-0">
            <div className="min-w-0 leading-tight space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Pending Review</span>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">96</span>
              <span className="text-[9px] text-emerald-600 font-bold block">
                ↑ 12.3% <span className="text-slate-400 font-medium">vs last 30 days</span>
              </span>
            </div>
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="h-5 w-5" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-3xs flex items-center justify-between w-full min-w-0">
            <div className="min-w-0 leading-tight space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Needs Update</span>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">38</span>
              <span className="text-[9px] text-emerald-600 font-bold block">
                ↑ 5.4% <span className="text-slate-400 font-medium">vs last 30 days</span>
              </span>
            </div>
            <div className="h-10 w-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-3xs flex items-center justify-between w-full min-w-0">
            <div className="min-w-0 leading-tight space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Approved</span>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">1,082</span>
              <span className="text-[9px] text-emerald-600 font-bold block">
                ↑ 20.1% <span className="text-slate-400 font-medium">vs last 30 days</span>
              </span>
            </div>
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-3xs flex items-center justify-between w-full min-w-0">
            <div className="min-w-0 leading-tight space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Rejected</span>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">32</span>
              <span className="text-[9px] text-red-500 font-bold block">
                ↓ -8.1% <span className="text-slate-400 font-medium">vs last 30 days</span>
              </span>
            </div>
            <div className="h-10 w-10 rounded-xl bg-red-50 text-red-650 flex items-center justify-center shrink-0">
              <XCircle className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Filters Tabs and Table Section */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-3xs overflow-hidden">
          {/* Tabs header toolbar */}
          <div className="px-4 py-3.5 border-b border-slate-100 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between select-none">
            <div className="flex flex-wrap gap-1.5">
              {["All", "Pending Review", "Needs Update", "Approved", "Rejected"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-bold rounded-lg transition",
                    activeTab === tab
                      ? "bg-indigo-50 text-indigo-650 border border-indigo-100/60"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <div className="flex items-center border border-slate-200 rounded-lg p-0.5">
                <button className="p-1 text-slate-400 hover:text-slate-600 rounded bg-slate-50">
                  <List className="h-3.5 w-3.5" />
                </button>
                <button className="p-1 text-slate-400 hover:text-slate-600 rounded">
                  <Grid className="h-3.5 w-3.5" />
                </button>
              </div>

              <span className="text-[11px] font-bold text-slate-400">
                Showing 1–10 of 1,248
              </span>

              <div className="flex items-center gap-1">
                <button className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-455">
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-455">
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[950px] text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/60 border-b border-slate-150 text-slate-400 font-bold uppercase tracking-wider text-[10px] select-none">
                  <th className="py-3 px-3 w-[4%] text-center"></th>
                  <th className="py-3 px-3 w-[30%]">Disclaimer</th>
                  <th className="py-3 px-3 w-[18%]">Product</th>
                  <th className="py-3 px-3 w-[10%]">Category</th>
                  <th className="py-3 px-3 w-[10%]">Source</th>
                  <th className="py-3 px-3 w-[10%]">Status</th>
                  <th className="py-3 px-3 w-[8%]">Priority</th>
                  <th className="py-3 px-3 w-[12%]">Submitted On</th>
                  <th className="py-3 px-3 w-[8%] text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {filteredDisclaimers.map((item) => {
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
                      <td className="py-3 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="h-5 w-5 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 bg-white shadow-3xs"
                        >
                          {isSelected ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                        </button>
                      </td>

                      <td className="py-3 px-3">
                        <span className="text-slate-800 font-bold block max-w-[280px] truncate leading-normal">
                          {item.disclaimer}
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2 min-w-0">
                          {item.thumbnail}
                          <div className="leading-tight min-w-0">
                            <span className="text-xs font-bold text-slate-900 block truncate max-w-[130px]">{item.productName}</span>
                            <span className="text-[9px] text-slate-400 font-medium block mt-0.5 truncate">{item.brand}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9.5px] font-bold bg-slate-50 border border-slate-200 text-slate-655">
                          {item.category}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-slate-550 font-medium">
                        {item.source}
                      </td>

                      <td className="py-3 px-3 select-none">
                        <span className={cn(
                          "inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[9px] font-extrabold tracking-wide uppercase border",
                          item.status === "Pending Review" && "bg-amber-50 text-amber-600 border-amber-100",
                          item.status === "Needs Update" && "bg-red-50 text-red-600 border-red-100",
                          item.status === "Approved" && "bg-emerald-50 text-emerald-600 border-emerald-100",
                          item.status === "Rejected" && "bg-slate-100 text-slate-500 border-slate-200"
                        )}>
                          <span className={cn(
                            "h-1.5 w-1.5 rounded-full shrink-0",
                            item.status === "Pending Review" && "bg-amber-500",
                            item.status === "Needs Update" && "bg-red-500",
                            item.status === "Approved" && "bg-emerald-500",
                            item.status === "Rejected" && "bg-slate-400"
                          )}></span>
                          {item.status}
                        </span>
                      </td>

                      <td className="py-3 px-3 select-none">
                        <span className="inline-flex items-center gap-1 text-[9.5px] font-bold text-slate-700">
                          <span className={cn(
                            "h-1.5 w-1.5 rounded-full shrink-0",
                            item.priority === "Low" && "bg-emerald-500",
                            item.priority === "Medium" && "bg-amber-500",
                            item.priority === "High" && "bg-red-500"
                          )}></span>
                          {item.priority}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-slate-550 font-medium">
                        <div>{item.submittedOn}</div>
                        <div className="text-[9px] text-slate-400 mt-0.5">{item.submittedTime}</div>
                      </td>

                      <td className="py-3 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1">
                          <button className="h-7 w-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button className="h-7 w-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition">
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
        </div>

        {/* Bottom Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-5 w-full items-stretch">
          
          {/* Column 1: Disclaimer Details */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Disclaimer Details</h3>
              
              <div className="space-y-1">
                <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">Full Disclaimer</span>
                <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-4.5 relative group">
                  <p className="text-[11px] font-semibold text-slate-700 leading-relaxed pr-6 italic">
                    "{selectedItem.fullDisclaimer}"
                  </p>
                  <button
                    onClick={() => copyToClipboard(selectedItem.fullDisclaimer)}
                    className="absolute top-3.5 right-3.5 h-6 w-6 rounded border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-slate-600 transition shadow-3xs"
                    title="Copy full text"
                  >
                    {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-3 pt-1 text-[10.5px]">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Used On</span>
                  <span className="font-bold text-slate-700 block mt-0.5">{selectedItem.usedOn}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Language</span>
                  <span className="font-bold text-slate-700 block mt-0.5">{selectedItem.language}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Region</span>
                  <span className="font-bold text-slate-700 block mt-0.5">{selectedItem.region}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Review Notes */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex flex-col justify-between">
            <div className="space-y-4 flex-1">
              <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Review Notes</h3>
              
              <div className="space-y-1.5">
                <p className="text-[11.5px] font-medium text-slate-600 leading-normal bg-slate-50/30 border border-slate-100 rounded-xl p-4 italic">
                  "{selectedItem.notes}"
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Reviewer</span>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                      {selectedItem.reviewerAvatar}
                    </div>
                    <span className="text-xs font-bold text-slate-800">{selectedItem.reviewer}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Updated</span>
                  <span className="text-[10px] font-bold text-slate-600 block mt-1.5 leading-tight">{selectedItem.updatedOn}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: History */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex flex-col justify-between">
            <div className="space-y-4 flex-1">
              <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">History</h3>
              
              <div className="relative pl-6 space-y-5 mt-2 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-150">
                {/* Submit step */}
                <div className="relative">
                  <span className="absolute -left-[20px] top-1 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50/60"></span>
                  <div className="leading-tight">
                    <span className="text-xs font-bold text-slate-800">Submitted</span>
                    <span className="text-[9.5px] text-slate-400 font-medium block mt-0.5">{selectedItem.history.submitted}</span>
                  </div>
                </div>

                {/* Under review step */}
                <div className="relative">
                  <span className={cn(
                    "absolute -left-[20px] top-1 h-2.5 w-2.5 rounded-full ring-4",
                    selectedItem.history.underReview ? "bg-amber-500 ring-amber-50/60" : "bg-slate-200 ring-slate-50/60"
                  )}></span>
                  <div className="leading-tight">
                    <span className="text-xs font-bold text-slate-800">Under Review</span>
                    <span className="text-[9.5px] text-slate-400 font-medium block mt-0.5">
                      {selectedItem.history.underReview ? selectedItem.history.underReview : "Not started"}
                    </span>
                  </div>
                </div>

                {/* Update step */}
                <div className="relative">
                  <span className={cn(
                    "absolute -left-[20px] top-1 h-2.5 w-2.5 rounded-full ring-4",
                    selectedItem.status === "Approved" ? "bg-emerald-500 ring-emerald-50/60" :
                    selectedItem.status === "Needs Update" ? "bg-red-500 ring-red-50/60" : "bg-slate-200 ring-slate-50/60"
                  )}></span>
                  <div className="leading-tight">
                    <span className="text-xs font-bold text-slate-800">Pending Update</span>
                    <span className="text-[9.5px] text-slate-400 font-medium block mt-0.5">
                      {selectedItem.history.pendingUpdate ? selectedItem.history.pendingUpdate : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Quick Actions */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex flex-col justify-between select-none">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-3">Quick Actions</h3>
            
            <div className="space-y-2.5 flex-1 flex flex-col justify-end">
              {/* Approve button */}
              <button className="w-full flex items-center justify-center gap-1.5 h-9 text-xs font-bold text-emerald-600 bg-emerald-50/60 hover:bg-emerald-100/60 border border-emerald-100 rounded-lg transition shadow-3xs">
                <CheckCircle2 className="h-4 w-4" /> Approve
              </button>
              {/* Request Update button */}
              <button className="w-full flex items-center justify-center gap-1.5 h-9 text-xs font-bold text-amber-600 bg-amber-50/60 hover:bg-amber-100/60 border border-amber-100 rounded-lg transition shadow-3xs">
                <RefreshCw className="h-3.5 w-3.5" /> Request Update
              </button>
              {/* Reject button */}
              <button className="w-full flex items-center justify-center gap-1.5 h-9 text-xs font-bold text-red-600 bg-red-50/60 hover:bg-red-100/60 border border-red-100 rounded-lg transition shadow-3xs">
                <XCircle className="h-4 w-4" /> Reject
              </button>
              {/* View in Context button */}
              <button className="w-full flex items-center justify-center gap-1.5 h-9 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition shadow-3xs">
                <ExternalLink className="h-3.5 w-3.5" /> View in Context
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
