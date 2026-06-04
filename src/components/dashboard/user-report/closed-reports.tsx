"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  FileText,
  CheckCircle,
  AlertCircle,
  Copy,
  Download,
  Filter,
  Calendar,
  Eye,
  MoreVertical,
  ChevronDown,
  Inbox,
  ShieldAlert,
  HelpCircle,
} from "lucide-react";

interface ClosedReport {
  id: string;
  product: {
    name: string;
    asin: string;
    image: string;
  };
  reportType: {
    label: string;
    colorClass: string;
  };
  resolution: "Action Taken" | "No Action Needed" | "Duplicate" | "Out of Scope";
  closedBy: {
    name: string;
    role: string;
    avatar: string;
  };
  closedOn: string;
  notes: string;
}

const mockClosedReports: ClosedReport[] = [
  {
    id: "PR-75621",
    product: {
      name: "Sony WH-1000XM5",
      asin: "B09XS7JWHH",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80",
    },
    reportType: {
      label: "Wrong Specification",
      colorClass: "bg-rose-50 text-rose-700 border border-rose-150",
    },
    resolution: "Action Taken",
    closedBy: {
      name: "Sophia W.",
      role: "Reviewer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    },
    closedOn: "May 26, 2025 10:24 AM",
    notes: "Updated product specifications.",
  },
  {
    id: "PR-75598",
    product: {
      name: "Canon EOS R8",
      asin: "B0B4N1D9ZB",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&q=80",
    },
    reportType: {
      label: "Wrong Data",
      colorClass: "bg-amber-50 text-amber-700 border border-amber-150",
    },
    resolution: "Action Taken",
    closedBy: {
      name: "James L.",
      role: "Reviewer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    },
    closedOn: "May 26, 2025 09:48 AM",
    notes: "Corrected price information.",
  },
  {
    id: "PR-75573",
    product: {
      name: "Nike Air Max 270",
      asin: "B07SHG7B6L",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80",
    },
    reportType: {
      label: "Missing Product",
      colorClass: "bg-blue-50 text-blue-700 border border-blue-150",
    },
    resolution: "No Action Needed",
    closedBy: {
      name: "Daniel K.",
      role: "Reviewer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    },
    closedOn: "May 25, 2025 08:15 AM",
    notes: "Product already exists in our system.",
  },
  {
    id: "PR-75542",
    product: {
      name: "iPhone 15 Pro Max",
      asin: "B0CHX1MY9K",
      image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=100&q=80",
    },
    reportType: {
      label: "Incorrect Price",
      colorClass: "bg-amber-50 text-amber-700 border border-amber-150",
    },
    resolution: "Action Taken",
    closedBy: {
      name: "Olivia P.",
      role: "Reviewer",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    },
    closedOn: "May 25, 2025 06:03 PM",
    notes: "Price updated from retailer feed.",
  },
  {
    id: "PR-75518",
    product: {
      name: "Optimum Whey Protein",
      asin: "B000GAYQKY",
      image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=100&q=80",
    },
    reportType: {
      label: "Wrong Specification",
      colorClass: "bg-rose-50 text-rose-700 border border-rose-150",
    },
    resolution: "Action Taken",
    closedBy: {
      name: "Robert M.",
      role: "Reviewer",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80",
    },
    closedOn: "May 25, 2025 04:21 PM",
    notes: "Corrected serving size and details.",
  },
  {
    id: "PR-75490",
    product: {
      name: "Vitamix 5200 Blender",
      asin: "B00004SPEU",
      image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=100&q=80",
    },
    reportType: {
      label: "Other Issue",
      colorClass: "bg-slate-105 text-slate-700 border border-slate-200",
    },
    resolution: "Out of Scope",
    closedBy: {
      name: "Emily R.",
      role: "Reviewer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
    closedOn: "May 24, 2025 02:11 PM",
    notes: "Request not related to our platform.",
  },
  {
    id: "PR-75461",
    product: {
      name: "Apple Watch Series 9",
      asin: "B0BDKD232Q",
      image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=100&q=80",
    },
    reportType: {
      label: "Wrong Data",
      colorClass: "bg-amber-50 text-amber-700 border border-amber-150",
    },
    resolution: "Duplicate",
    closedBy: {
      name: "Michael T.",
      role: "Reviewer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    },
    closedOn: "May 24, 2025 11:37 AM",
    notes: "Duplicate of PR-75459.",
  },
  {
    id: "PR-75420",
    product: {
      name: "MacBook Air M2",
      asin: "B0B3C5HNXJ",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&q=80",
    },
    reportType: {
      label: "Missing Product",
      colorClass: "bg-blue-50 text-blue-700 border border-blue-150",
    },
    resolution: "Action Taken",
    closedBy: {
      name: "Sarah J.",
      role: "Reviewer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    },
    closedOn: "May 24, 2025 10:02 AM",
    notes: "Product added to our database.",
  },
];

export default function ClosedReports() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const getResolutionClass = (res: ClosedReport["resolution"]) => {
    if (res === "Action Taken") return "text-emerald-700 bg-emerald-50 border border-emerald-250";
    if (res === "No Action Needed") return "text-blue-700 bg-blue-50 border border-blue-250";
    if (res === "Duplicate") return "text-amber-700 bg-amber-50 border border-amber-250";
    return "text-slate-650 bg-slate-50 border border-slate-250";
  };

  const filteredReports = mockClosedReports.filter((r) => {
    if (activeTab === "All") return true;
    return r.resolution === activeTab;
  });

  return (
    <div className="bg-slate-50 min-h-full w-full font-sans pb-4">
      <div className="w-full max-w-full px-2 sm:px-4 md:px-5 py-5 space-y-5">
        
        {/* Title Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Closed Reports
              </h1>
              <span className="h-4.5 w-4.5 rounded-full border border-slate-350 flex items-center justify-center text-[10px] font-bold text-slate-455 cursor-help" title="View all closed user reports">i</span>
            </div>
            <p className="text-xs sm:text-[13px] text-slate-550 mt-1 select-none">
              View all resolved user reports. These reports have been reviewed and closed by our team.
            </p>
          </div>
          
          <div className="flex items-center shrink-0 select-none">
            <button className="flex justify-center items-center gap-1.5 h-8.5 px-3.5 text-xs font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm transition whitespace-nowrap">
              <Download className="h-3.5 w-3.5" /> Export
            </button>
          </div>
        </div>

        {/* KPI Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full">
          {/* Card 1: Total Closed */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:py-5 sm:px-4.5 shadow-xs flex items-center gap-2 sm:gap-3.5 w-full">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-indigo-50/60 text-indigo-650 flex items-center justify-center shrink-0">
              <CheckCircle className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[8.5px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Closed</span>
              <span className="text-base sm:text-2xl font-extrabold text-slate-900 leading-tight mt-0.5 block">1,842</span>
              <span className="text-[8.5px] sm:text-[10px] text-slate-500 block mt-0.5 whitespace-nowrap">
                Total reports closed
              </span>
            </div>
          </div>

          {/* Card 2: Action Taken */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:py-5 sm:px-4.5 shadow-xs flex items-center gap-2 sm:gap-3.5 w-full">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-emerald-50/60 text-emerald-650 flex items-center justify-center shrink-0">
              <Inbox className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[8.5px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Action Taken</span>
              <span className="text-base sm:text-2xl font-extrabold text-slate-900 leading-tight mt-0.5 block">1,426</span>
              <span className="text-[8.5px] sm:text-[10px] text-slate-500 block mt-0.5 whitespace-nowrap">
                77.4% of closed
              </span>
            </div>
          </div>

          {/* Card 3: No Action Needed */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:py-5 sm:px-4.5 shadow-xs flex items-center gap-2 sm:gap-3.5 w-full">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-blue-50/60 text-blue-650 flex items-center justify-center shrink-0">
              <FileText className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[8.5px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">No Action Needed</span>
              <span className="text-base sm:text-2xl font-extrabold text-slate-900 leading-tight mt-0.5 block">316</span>
              <span className="text-[8.5px] sm:text-[10px] text-slate-500 block mt-0.5 whitespace-nowrap">
                17.1% of closed
              </span>
            </div>
          </div>

          {/* Card 4: Duplicate */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:py-5 sm:px-4.5 shadow-xs flex items-center gap-2 sm:gap-3.5 w-full">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-amber-50/60 text-amber-650 flex items-center justify-center shrink-0">
              <Copy className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[8.5px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Duplicate</span>
              <span className="text-base sm:text-2xl font-extrabold text-slate-900 leading-tight mt-0.5 block">68</span>
              <span className="text-[8.5px] sm:text-[10px] text-slate-500 block mt-0.5 whitespace-nowrap">
                3.7% of closed
              </span>
            </div>
          </div>

          {/* Card 5: Out of Scope */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:py-5 sm:px-4.5 shadow-xs flex items-center gap-2 sm:gap-3.5 w-full">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-slate-50/70 text-slate-600 flex items-center justify-center shrink-0">
              <CheckCircle className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[8.5px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Out of Scope</span>
              <span className="text-base sm:text-2xl font-extrabold text-slate-900 leading-tight mt-0.5 block">32</span>
              <span className="text-[8.5px] sm:text-[10px] text-slate-500 block mt-0.5 whitespace-nowrap">
                1.7% of closed
              </span>
            </div>
          </div>
        </div>

        {/* Filters Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-4 select-none">
          <div className="flex flex-wrap items-center gap-3">
            {/* Report Type */}
            <div className="flex flex-col gap-1 w-full sm:w-[130px]">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Report Type</span>
              <div className="relative">
                <select className="w-full appearance-none bg-slate-50/50 hover:bg-slate-55 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer transition">
                  <option>All</option>
                  <option>Specification</option>
                  <option>Price</option>
                  <option>Image</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Resolution */}
            <div className="flex flex-col gap-1 w-full sm:w-[130px]">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Resolution</span>
              <div className="relative">
                <select className="w-full appearance-none bg-slate-50/50 hover:bg-slate-55 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer transition">
                  <option>All</option>
                  <option>Action Taken</option>
                  <option>No Action Needed</option>
                  <option>Duplicate</option>
                  <option>Out of Scope</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Closure Reason */}
            <div className="flex flex-col gap-1 w-full sm:w-[140px]">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Closure Reason</span>
              <div className="relative">
                <select className="w-full appearance-none bg-slate-50/50 hover:bg-slate-55 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer transition">
                  <option>All</option>
                  <option>Resolved</option>
                  <option>Invalid</option>
                  <option>Duplicate</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Closed By */}
            <div className="flex flex-col gap-1 w-full sm:w-[130px]">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Closed By</span>
              <div className="relative">
                <select className="w-full appearance-none bg-slate-50/50 hover:bg-slate-55 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer transition">
                  <option>All</option>
                  <option>Sophia W.</option>
                  <option>James L.</option>
                  <option>Daniel K.</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Date Range */}
            <div className="flex flex-col gap-1 w-full sm:w-[185px]">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Date Range</span>
              <div className="relative flex items-center border border-slate-200 rounded-lg bg-slate-50/50 hover:bg-slate-55 transition overflow-hidden">
                <span className="pl-3 text-slate-400"><Calendar className="h-3.5 w-3.5" /></span>
                <input
                  type="text"
                  defaultValue="May 13 – May 26, 2025"
                  className="w-full border-0 bg-transparent py-1.5 pl-2 pr-3 text-xs font-bold text-slate-700 outline-none"
                />
              </div>
            </div>

            {/* Action buttons right side */}
            <div className="flex items-center gap-3 mt-4 sm:mt-0 sm:self-end ml-auto">
              <button className="flex items-center gap-1.5 h-8.5 px-3.5 text-xs font-bold text-slate-750 bg-slate-50/70 border border-slate-200 rounded-lg hover:bg-slate-50 shadow-3xs transition">
                <Filter className="h-3.5 w-3.5 text-slate-400" /> Filters
              </button>
              <button className="text-xs font-bold text-[#4F46E5] hover:text-[#4338CA] transition">
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Table Card (Full Width) */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          
          {/* Table Toolbar */}
          <div className="px-4 py-3.5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 select-none">
            <div className="flex items-center gap-5 text-xs font-bold overflow-x-auto whitespace-nowrap pb-1 scrollbar-none w-full sm:w-auto">
              <button
                onClick={() => setActiveTab("All")}
                className={cn("pb-1 border-b-2 transition-colors", activeTab === "All" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
              >
                All (1,842)
              </button>
              <button
                onClick={() => setActiveTab("Action Taken")}
                className={cn("pb-1 border-b-2 transition-colors", activeTab === "Action Taken" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
              >
                Action Taken (1,426)
              </button>
              <button
                onClick={() => setActiveTab("No Action Needed")}
                className={cn("pb-1 border-b-2 transition-colors", activeTab === "No Action Needed" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
              >
                No Action Needed (316)
              </button>
              <button
                onClick={() => setActiveTab("Duplicate")}
                className={cn("pb-1 border-b-2 transition-colors", activeTab === "Duplicate" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
              >
                Duplicate (68)
              </button>
              <button
                onClick={() => setActiveTab("Out of Scope")}
                className={cn("pb-1 border-b-2 transition-colors", activeTab === "Out of Scope" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
              >
                Out of Scope (32)
              </button>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto text-slate-400 text-xs">
              <span>Showing 1-10 of 1,842</span>
              <div className="flex items-center gap-1 ml-2">
                <button className="h-6 w-6 border border-slate-200 rounded flex items-center justify-center hover:bg-slate-50 transition text-slate-450">&lt;</button>
                <button className="h-6 w-6 border border-slate-200 rounded flex items-center justify-center hover:bg-slate-50 transition text-slate-450">&gt;</button>
              </div>
            </div>
          </div>

          {/* Table Wrapper */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/60 border-b border-slate-150 text-slate-450 font-bold uppercase tracking-wider text-[10px] select-none">
                  <th className="py-3 px-4 w-[5%] text-center">
                    <input type="checkbox" className="rounded border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5 cursor-pointer" />
                  </th>
                  <th className="py-3 px-4 w-[10%] font-bold">Report ID</th>
                  <th className="py-3 px-4 w-[22%] font-bold">Product</th>
                  <th className="py-3 px-4 w-[16%] font-bold">Report Type</th>
                  <th className="py-3 px-4 w-[12%] font-bold">Resolution</th>
                  <th className="py-3 px-4 w-[15%] font-bold">Closed By</th>
                  <th className="py-3 px-4 w-[12%] font-bold">Closed On</th>
                  <th className="py-3 px-4 w-[20%] font-bold">Reason / Notes</th>
                  <th className="py-3 px-4 w-[8%] text-center font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {filteredReports.map((row) => {
                  return (
                    <tr
                      key={row.id}
                      className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                    >
                      <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" className="rounded border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5 cursor-pointer" />
                      </td>
                      <td className="py-4 px-4 text-slate-900 font-bold">
                        {row.id}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img src={row.product.image} className="h-9 w-9 rounded-lg object-cover shadow-3xs border border-slate-200 shrink-0 bg-white" alt="" />
                          <div className="leading-tight min-w-0">
                            <span className="text-xs font-bold text-slate-900 block truncate" title={row.product.name}>{row.product.name}</span>
                            <span className="text-[10px] text-slate-400 font-medium block mt-0.5 truncate">ASIN: {row.product.asin}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 select-none">
                        <span className={cn("inline-flex items-center rounded-md px-1.5 py-0.5 text-[9px] font-extrabold leading-none", row.reportType.colorClass)}>
                          {row.reportType.label}
                        </span>
                      </td>
                      <td className="py-4 px-4 select-none">
                        <span className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-[9px] font-extrabold leading-none uppercase tracking-wide", getResolutionClass(row.resolution))}>
                          {row.resolution}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 min-w-0">
                          <img src={row.closedBy.avatar} className="h-7 w-7 rounded-full object-cover shadow-3xs border border-slate-200 shrink-0" alt="" />
                          <div className="leading-none min-w-0">
                            <span className="text-xs font-bold text-slate-805 block truncate">{row.closedBy.name}</span>
                            <span className="text-[10px] text-slate-400 block mt-0.5 truncate">{row.closedBy.role}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="leading-tight">
                          <span className="font-bold text-slate-800 block">{row.closedOn.split(" ").slice(0, 3).join(" ")}</span>
                          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{row.closedOn.split(" ").slice(3).join(" ")}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-600 font-medium">
                        {row.notes}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button className="h-7 w-7 rounded-lg border border-slate-200 hover:bg-white flex items-center justify-center text-slate-400 hover:text-slate-700 bg-slate-50/50 shadow-2xs transition">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button className="h-7 w-7 rounded-lg border border-slate-200 hover:bg-white flex items-center justify-center text-slate-400 hover:text-slate-700 bg-slate-50/50 shadow-2xs transition">
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
          <div className="px-5 py-4 border-t border-slate-100 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white text-slate-455 font-bold select-none">
            <span className="text-[11px] font-bold">
              Showing 1 to 8 of 1,842 results
            </span>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-400">&lt;</button>
                <button className="h-8 w-8 rounded-lg bg-[#4F46E5] text-white flex items-center justify-center text-xs font-black shadow-sm">1</button>
                <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-50 transition text-slate-600">2</button>
                <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-50 transition text-slate-600">3</button>
                <span className="px-1 text-slate-350 text-xs">...</span>
                <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-50 transition text-slate-600">185</button>
                <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-400">&gt;</button>
              </div>

              <div className="relative">
                <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-650 outline-none cursor-pointer shadow-2xs hover:bg-slate-50 transition">
                  <option>10 / page</option>
                  <option>25 / page</option>
                  <option>50 / page</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
