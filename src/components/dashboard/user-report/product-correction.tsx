"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Search,
  Bell,
  Download,
  Filter,
  Calendar,
  Eye,
  MoreVertical,
  X,
  ExternalLink,
  ChevronDown,
  Trash2,
  ArrowRight,
} from "lucide-react";

interface CorrectionReport {
  id: string;
  product: {
    name: string;
    asin: string;
    image: string;
  };
  issueType: {
    label: string;
    colorClass: string;
  };
  reportedBy: {
    name: string;
    email: string;
  };
  status: "Pending Review" | "In Review" | "Approved" | "Rejected";
  priority: "High" | "Medium" | "Low";
  reportedOn: string;
}

const mockReports: CorrectionReport[] = [
  {
    id: "PR-78231",
    product: {
      name: "Sony WH-1000XM5",
      asin: "B09XS7JWHH",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80",
    },
    issueType: {
      label: "Wrong Specification",
      colorClass: "bg-rose-50 text-rose-700 border border-rose-150",
    },
    reportedBy: {
      name: "Michael T.",
      email: "michael.t@example.com",
    },
    status: "Pending Review",
    priority: "High",
    reportedOn: "May 20, 2025 10:24 AM",
  },
  {
    id: "PR-78230",
    product: {
      name: "iPhone 15 Pro Max",
      asin: "B0CHX1MY9K",
      image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=100&q=80",
    },
    issueType: {
      label: "Incorrect Price",
      colorClass: "bg-amber-50 text-amber-700 border border-amber-150",
    },
    reportedBy: {
      name: "Sarah J.",
      email: "sarah.j@example.com",
    },
    status: "In Review",
    priority: "Medium",
    reportedOn: "May 20, 2025 09:48 AM",
  },
  {
    id: "PR-78229",
    product: {
      name: "LG UltraGear 27\"",
      asin: "B09WN6N5B2",
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=100&q=80",
    },
    issueType: {
      label: "Wrong Image",
      colorClass: "bg-violet-50 text-violet-700 border border-violet-150",
    },
    reportedBy: {
      name: "Daniel K.",
      email: "daniel.k@example.com",
    },
    status: "Approved",
    priority: "Low",
    reportedOn: "May 20, 2025 08:15 AM",
  },
  {
    id: "PR-78228",
    product: {
      name: "Dyson V15 Detect",
      asin: "B09B7XKJWH",
      image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=100&q=80",
    },
    issueType: {
      label: "Missing Feature",
      colorClass: "bg-blue-50 text-blue-700 border border-blue-150",
    },
    reportedBy: {
      name: "Emily R.",
      email: "emily.r@example.com",
    },
    status: "Pending Review",
    priority: "High",
    reportedOn: "May 19, 2025 11:32 PM",
  },
  {
    id: "PR-78227",
    product: {
      name: "MacBook Air M2",
      asin: "B0B3C5HNXJ",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&q=80",
    },
    issueType: {
      label: "Wrong Specification",
      colorClass: "bg-rose-50 text-rose-700 border border-rose-150",
    },
    reportedBy: {
      name: "James L.",
      email: "james.l@example.com",
    },
    status: "Rejected",
    priority: "Medium",
    reportedOn: "May 19, 2025 07:21 PM",
  },
  {
    id: "PR-78226",
    product: {
      name: "Apple Watch Series 9",
      asin: "B0BDKD232Q",
      image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=100&q=80",
    },
    issueType: {
      label: "Incorrect Category",
      colorClass: "bg-emerald-50 text-emerald-700 border border-emerald-150",
    },
    reportedBy: {
      name: "Olivia P.",
      email: "olivia.p@example.com",
    },
    status: "Approved",
    priority: "Low",
    reportedOn: "May 19, 2025 06:05 PM",
  },
  {
    id: "PR-78225",
    product: {
      name: "Canon EOS R8",
      asin: "B0B4N1D9ZB",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&q=80",
    },
    issueType: {
      label: "Wrong Data",
      colorClass: "bg-orange-50 text-orange-700 border border-orange-150",
    },
    reportedBy: {
      name: "William H.",
      email: "william.h@example.com",
    },
    status: "In Review",
    priority: "High",
    reportedOn: "May 19, 2025 05:12 PM",
  },
  {
    id: "PR-78224",
    product: {
      name: "Levoit Core 400S",
      asin: "B08P2J7Y8F",
      image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=100&q=80",
    },
    issueType: {
      label: "Incorrect Price",
      colorClass: "bg-amber-50 text-amber-700 border border-amber-150",
    },
    reportedBy: {
      name: "Ava G.",
      email: "ava.g@example.com",
    },
    status: "Pending Review",
    priority: "Medium",
    reportedOn: "May 18, 2025 10:14 PM",
  },
];

const mockReportDetails: Record<string, {
  category: string;
  source: string;
  userDescription: string;
  suggestedCorrection: string;
  attachments: string[];
}> = {
  "PR-78231": {
    category: "Electronics > Headphones",
    source: "Web App",
    userDescription: "The product description says 'Noise Cancellation: No' but this model has industry leading noise cancellation. Please update.",
    suggestedCorrection: "Noise Cancellation: Yes (Industry Leading)",
    attachments: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&q=80",
    ],
  },
  "PR-78230": {
    category: "Electronics > Mobile Phones",
    source: "iOS App",
    userDescription: "Price listed as $1199 but the official price has dropped to $1099. Evidence attached.",
    suggestedCorrection: "Price: $1099",
    attachments: [
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=200&q=80",
    ],
  },
};

export default function ProductCorrection() {
  const [selectedId, setSelectedId] = useState<string>("PR-78231");
  const [activeTab, setActiveTab] = useState<"All" | "Pending Review" | "In Review" | "Approved" | "Rejected">("All");
  const [showRightPane, setShowRightPane] = useState<boolean>(true);

  const selectedReport = mockReports.find((r) => r.id === selectedId) || mockReports[0];
  const selectedDetails = mockReportDetails[selectedReport.id] || {
    category: "Electronics",
    source: "Web App",
    userDescription: "No description provided.",
    suggestedCorrection: "No suggestion provided.",
    attachments: [],
  };

  const getStatusColor = (status: CorrectionReport["status"]) => {
    if (status === "Pending Review") return "text-amber-700 bg-amber-50 border border-amber-200/50";
    if (status === "In Review") return "text-blue-700 bg-blue-50 border border-blue-200/50";
    if (status === "Approved") return "text-emerald-700 bg-emerald-50 border border-emerald-200/50";
    return "text-rose-700 bg-rose-50 border border-rose-200/50";
  };

  const getPriorityColor = (priority: CorrectionReport["priority"]) => {
    if (priority === "High") return "text-rose-600 bg-rose-500";
    if (priority === "Medium") return "text-amber-500 bg-amber-400";
    return "text-emerald-500 bg-emerald-400";
  };

  const filteredReports = mockReports.filter((r) => {
    if (activeTab === "All") return true;
    return r.status === activeTab;
  });

  return (
    <div className="bg-slate-50 min-h-full w-full font-sans pb-4">
      <div className="w-full max-w-full px-2 sm:px-4 md:px-5 py-5 space-y-5">
        
        {/* Title Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Product Correction
              </h1>
              <span className="h-4.5 w-4.5 rounded-full border border-slate-350 flex items-center justify-center text-[10px] font-bold text-slate-450 cursor-help" title="User reports and suggestions">i</span>
            </div>
            <p className="text-xs sm:text-[13px] text-slate-550 mt-1 select-none">
              Review and manage user-submitted corrections for inaccurate or outdated product information.
            </p>
          </div>
          
          <div className="flex items-center gap-2.5 shrink-0 select-none">
            <button className="flex justify-center items-center gap-1.5 h-8.5 px-3.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-colors whitespace-nowrap">
              <Download className="h-3.5 w-3.5 text-slate-400" /> Export
            </button>
            <button className="flex justify-center items-center gap-1.5 h-8.5 px-3.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-colors whitespace-nowrap">
              <Filter className="h-3.5 w-3.5 text-slate-400" /> Filters
            </button>
          </div>
        </div>

        {/* KPI Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full">
          {/* Card 1: Total Reports */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:py-5 sm:px-4.5 shadow-xs flex items-center gap-2 sm:gap-3.5 w-full">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-indigo-50/60 text-indigo-650 flex items-center justify-center shrink-0">
              <FileText className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[8.5px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Reports</span>
              <span className="text-base sm:text-2xl font-extrabold text-slate-900 leading-tight mt-0.5 block">1,248</span>
              <span className="text-[8.5px] sm:text-[10px] text-slate-500 block mt-0.5 whitespace-nowrap">
                <span className="text-emerald-600 font-bold">↗ 14.6%</span> vs last 30 days
              </span>
            </div>
          </div>

          {/* Card 2: Pending Review */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:py-5 sm:px-4.5 shadow-xs flex items-center gap-2 sm:gap-3.5 w-full">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-amber-50/60 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[8.5px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pending Review</span>
              <span className="text-base sm:text-2xl font-extrabold text-slate-900 leading-tight mt-0.5 block">236</span>
              <span className="text-[8.5px] sm:text-[10px] text-slate-500 block mt-0.5 whitespace-nowrap">
                <span className="text-emerald-600 font-bold">↗ 11.2%</span> vs last 30 days
              </span>
            </div>
          </div>

          {/* Card 3: In Review */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:py-5 sm:px-4.5 shadow-xs flex items-center gap-2 sm:gap-3.5 w-full">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-blue-50/60 text-blue-600 flex items-center justify-center shrink-0">
              <Clock className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[8.5px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">In Review</span>
              <span className="text-base sm:text-2xl font-extrabold text-slate-900 leading-tight mt-0.5 block">98</span>
              <span className="text-[8.5px] sm:text-[10px] text-slate-500 block mt-0.5 whitespace-nowrap">
                <span className="text-emerald-600 font-bold">↗ 5.3%</span> vs last 30 days
              </span>
            </div>
          </div>

          {/* Card 4: Approved */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:py-5 sm:px-4.5 shadow-xs flex items-center gap-2 sm:gap-3.5 w-full">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-emerald-50/60 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[8.5px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Approved</span>
              <span className="text-base sm:text-2xl font-extrabold text-slate-900 leading-tight mt-0.5 block">842</span>
              <span className="text-[8.5px] sm:text-[10px] text-slate-500 block mt-0.5 whitespace-nowrap">
                <span className="text-emerald-600 font-bold">↗ 18.7%</span> vs last 30 days
              </span>
            </div>
          </div>

          {/* Card 5: Rejected */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:py-5 sm:px-4.5 shadow-xs flex items-center gap-2 sm:gap-3.5 w-full">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-rose-50/60 text-rose-600 flex items-center justify-center shrink-0">
              <AlertCircle className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[8.5px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Rejected</span>
              <span className="text-base sm:text-2xl font-extrabold text-slate-900 leading-tight mt-0.5 block">72</span>
              <span className="text-[8.5px] sm:text-[10px] text-slate-500 block mt-0.5 whitespace-nowrap">
                <span className="text-rose-605 font-bold">↘ 8.4%</span> vs last 30 days
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

            {/* Status */}
            <div className="flex flex-col gap-1 w-full sm:w-[135px]">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Status</span>
              <div className="relative">
                <select className="w-full appearance-none bg-slate-50/50 hover:bg-slate-55 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer transition">
                  <option>All Statuses</option>
                  <option>Pending Review</option>
                  <option>In Review</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Priority */}
            <div className="flex flex-col gap-1 w-full sm:w-[125px]">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Priority</span>
              <div className="relative">
                <select className="w-full appearance-none bg-slate-50/50 hover:bg-slate-55 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer transition">
                  <option>All</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Source */}
            <div className="flex flex-col gap-1 w-full sm:w-[125px]">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Source</span>
              <div className="relative">
                <select className="w-full appearance-none bg-slate-50/50 hover:bg-slate-55 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer transition">
                  <option>All</option>
                  <option>Web App</option>
                  <option>iOS App</option>
                  <option>Android App</option>
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
                  defaultValue="May 13 – May 20, 2025"
                  className="w-full border-0 bg-transparent py-1.5 pl-2 pr-3 text-xs font-bold text-slate-700 outline-none"
                />
              </div>
            </div>

            {/* Action buttons right side */}
            <button className="text-xs font-bold text-[#4F46E5] hover:text-[#4338CA] transition mt-4 sm:mt-0 sm:self-end sm:mb-1.5 ml-auto">
              Clear All
            </button>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Left Table Panel */}
          <div className={cn("min-w-0 space-y-4", showRightPane ? "lg:col-span-9" : "lg:col-span-12")}>
            <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
              
              {/* Table Header Toolbar */}
              <div className="px-4 py-3.5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 select-none">
                <div className="flex items-center gap-5 text-xs font-bold overflow-x-auto whitespace-nowrap pb-1 scrollbar-none w-full sm:w-auto">
                  <button
                    onClick={() => setActiveTab("All")}
                    className={cn("pb-1 border-b-2 transition-colors", activeTab === "All" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
                  >
                    All (1,248)
                  </button>
                  <button
                    onClick={() => setActiveTab("Pending Review")}
                    className={cn("pb-1 border-b-2 transition-colors", activeTab === "Pending Review" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
                  >
                    Pending Review (236)
                  </button>
                  <button
                    onClick={() => setActiveTab("In Review")}
                    className={cn("pb-1 border-b-2 transition-colors", activeTab === "In Review" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
                  >
                    In Review (98)
                  </button>
                  <button
                    onClick={() => setActiveTab("Approved")}
                    className={cn("pb-1 border-b-2 transition-colors", activeTab === "Approved" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
                  >
                    Approved (842)
                  </button>
                  <button
                    onClick={() => setActiveTab("Rejected")}
                    className={cn("pb-1 border-b-2 transition-colors", activeTab === "Rejected" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
                  >
                    Rejected (72)
                  </button>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto text-slate-400 text-xs">
                  <span>Showing 1-10 of 1,248</span>
                  <div className="flex items-center gap-1 ml-2">
                    <button className="h-6 w-6 border border-slate-200 rounded flex items-center justify-center hover:bg-slate-50 transition text-slate-450">&lt;</button>
                    <button className="h-6 w-6 border border-slate-200 rounded flex items-center justify-center hover:bg-slate-50 transition text-slate-450">&gt;</button>
                  </div>
                </div>
              </div>

              {/* Table body */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/60 border-b border-slate-150 text-slate-450 font-bold uppercase tracking-wider text-[10px] select-none">
                      <th className="py-3 px-4 w-[12%] font-bold">Report ID</th>
                      <th className="py-3 px-4 w-[24%] font-bold">Product</th>
                      <th className="py-3 px-4 w-[16%] font-bold">Issue Type</th>
                      <th className="py-3 px-4 w-[18%] font-bold">Reported By</th>
                      <th className="py-3 px-4 w-[14%] font-bold">Status</th>
                      <th className="py-3 px-4 w-[8%] font-bold">Priority</th>
                      <th className="py-3 px-4 w-[14%] font-bold">Reported On</th>
                      <th className="py-3 px-4 w-[8%] text-center font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {filteredReports.map((row) => {
                      const isSelected = selectedId === row.id;
                      return (
                        <tr
                          key={row.id}
                          onClick={() => setSelectedId(row.id)}
                          className={cn(
                            "hover:bg-slate-50/50 transition-colors cursor-pointer",
                            isSelected ? "bg-indigo-50/40 hover:bg-indigo-50/60" : ""
                          )}
                        >
                          <td className="py-4 px-4 text-slate-900 font-bold">
                            {row.id}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <img src={row.product.image} className="h-9 w-9 rounded-lg object-cover shadow-3xs border border-slate-200 shrink-0" alt="" />
                              <div className="leading-tight min-w-0">
                                <span className="text-xs font-bold text-slate-905 block truncate" title={row.product.name}>{row.product.name}</span>
                                <span className="text-[10px] text-slate-400 font-medium block mt-0.5 truncate">ASIN: {row.product.asin}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 select-none">
                            <span className={cn("inline-flex items-center rounded-md px-1.5 py-0.5 text-[9px] font-extrabold leading-none", row.issueType.colorClass)}>
                              {row.issueType.label}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="leading-tight">
                              <span className="text-slate-800 font-bold block">{row.reportedBy.name}</span>
                              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{row.reportedBy.email}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 select-none">
                            <span className="flex items-center gap-1.5 font-bold">
                              <span className={cn(
                                "h-1.5 w-1.5 rounded-full shrink-0",
                                row.status === "Pending Review" && "bg-amber-500",
                                row.status === "In Review" && "bg-blue-500",
                                row.status === "Approved" && "bg-emerald-500",
                                row.status === "Rejected" && "bg-rose-500"
                              )}></span>
                              <span className={cn(
                                row.status === "Pending Review" && "text-amber-700",
                                row.status === "In Review" && "text-blue-750",
                                row.status === "Approved" && "text-emerald-700",
                                row.status === "Rejected" && "text-rose-700"
                              )}>{row.status}</span>
                            </span>
                          </td>
                          <td className="py-4 px-4 select-none">
                            <span className="flex items-center gap-1.5 font-bold">
                              <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", getPriorityColor(row.priority))}></span>
                              <span className="text-slate-700">{row.priority}</span>
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="leading-tight">
                              <span className="font-bold text-slate-800 block">{row.reportedOn.split(" ").slice(0, 3).join(" ")}</span>
                              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{row.reportedOn.split(" ").slice(3).join(" ")}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => { setSelectedId(row.id); setShowRightPane(true); }}
                                className="h-7 w-7 rounded-lg border border-slate-200 hover:bg-white flex items-center justify-center text-slate-400 hover:text-slate-700 bg-slate-50/50 shadow-2xs transition"
                                title="View details"
                              >
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
                  Showing 1-10 of 1,248 results
                </span>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-400">&lt;</button>
                    <button className="h-8 w-8 rounded-lg bg-[#4F46E5] text-white flex items-center justify-center text-xs font-black shadow-sm">1</button>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-50 transition text-slate-600">2</button>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-50 transition text-slate-600">3</button>
                    <span className="px-1 text-slate-350 text-xs">...</span>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-50 transition text-slate-600">125</button>
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

          {/* Right Details Panel */}
          {showRightPane && (
            <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-4.5 shadow-sm space-y-4 relative min-w-0">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 select-none">
                <span className={cn("inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-extrabold tracking-wide uppercase leading-none", getStatusColor(selectedReport.status))}>
                  {selectedReport.status}
                </span>
                <button 
                  onClick={() => setShowRightPane(false)}
                  className="h-6 w-6 rounded-md hover:bg-slate-100 flex items-center justify-center text-slate-455 hover:text-slate-700 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Product Info Block */}
              <div className="flex gap-3 bg-slate-50/50 p-2.5 border border-slate-200 rounded-xl items-start">
                <img src={selectedReport.product.image} className="h-12 w-12 rounded-lg object-cover shadow-3xs border border-slate-150 shrink-0 bg-white" alt="" />
                <div className="leading-tight min-w-0 font-semibold text-xs text-slate-700">
                  <span className="font-extrabold text-slate-950 block text-[13px] tracking-tight">{selectedReport.product.name}</span>
                  <span className="text-slate-450 font-medium block mt-0.5">ASIN: {selectedReport.product.asin}</span>
                  
                  <button className="text-[10px] font-bold text-[#4F46E5] hover:text-[#4338CA] transition inline-flex items-center gap-0.5 mt-2 select-none">
                    <span>View Product</span>
                    <ExternalLink className="h-2.5 w-2.5 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Report Info Grid */}
              <div className="space-y-2 pt-2 text-xs font-semibold text-slate-700">
                <div className="grid grid-cols-[100px_1fr] gap-x-2 gap-y-2">
                  <span className="text-slate-450 font-bold">Report ID</span>
                  <span className="text-slate-900 font-bold">{selectedReport.id}</span>

                  <span className="text-slate-450 font-bold">Issue Type</span>
                  <span className="text-rose-600 font-bold">{selectedReport.issueType.label}</span>

                  <span className="text-slate-450 font-bold">Category</span>
                  <span>{selectedDetails.category}</span>

                  <span className="text-slate-450 font-bold">Reported By</span>
                  <div>
                    <span className="text-slate-900 block font-bold">{selectedReport.reportedBy.name}</span>
                    <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{selectedReport.reportedBy.email}</span>
                  </div>

                  <span className="text-slate-450 font-bold">Reported On</span>
                  <span>{selectedReport.reportedOn}</span>

                  <span className="text-slate-450 font-bold">Source</span>
                  <span>{selectedDetails.source}</span>

                  <span className="text-slate-450 font-bold">Priority</span>
                  <span className="flex items-center gap-1.5 font-bold">
                    <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", getPriorityColor(selectedReport.priority))}></span>
                    <span className="text-slate-805">{selectedReport.priority}</span>
                  </span>
                </div>
              </div>

              {/* User Description block */}
              <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs font-semibold">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider select-none">User Description</span>
                <p className="text-slate-650 leading-relaxed bg-slate-50/50 p-2.5 border border-slate-150 rounded-xl font-medium">
                  {selectedDetails.userDescription}
                </p>
              </div>

              {/* Suggested Correction */}
              <div className="space-y-1.5 pt-1 text-xs font-semibold">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider select-none">Suggested Correction</span>
                <p className="text-slate-850 leading-relaxed bg-indigo-50/20 p-2.5 border border-indigo-150 rounded-xl font-bold text-indigo-950">
                  {selectedDetails.suggestedCorrection}
                </p>
              </div>

              {/* Attachments */}
              {selectedDetails.attachments && selectedDetails.attachments.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider select-none">
                    Attachments ({selectedDetails.attachments.length})
                  </span>
                  <div className="flex gap-2">
                    {selectedDetails.attachments.map((img, index) => (
                      <img 
                        key={index} 
                        src={img} 
                        className="h-14 w-14 rounded-lg border border-slate-200 object-cover shadow-3xs hover:border-slate-350 cursor-pointer transition shrink-0" 
                        alt="Attachment" 
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5 select-none">
                <button className="w-full py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold rounded-lg shadow-sm transition flex items-center justify-center gap-1.5">
                  <span>Review Correction</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button className="w-full py-2 bg-rose-50 hover:bg-rose-100/70 border border-rose-200 text-rose-700 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 shadow-3xs">
                  <Trash2 className="h-3.5 w-3.5" /> Reject Report
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
