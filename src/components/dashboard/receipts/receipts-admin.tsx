"use client";

import React, { useState, useMemo } from "react";
import {
  FileText,
  Clock,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Search,
  Calendar,
  ChevronDown,
  ChevronUp,
  Download,
  RefreshCw,
  SlidersHorizontal,
  RotateCcw,
  Info,
  Settings,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Types
interface ReceiptRow {
  id: string;
  subId: string;
  userEmail: string;
  userBadge: string;
  retailerName: string;
  retailerLogo: React.ReactNode;
  purchaseDate: string;
  total: string;
  ocrConfidence: number | null;
  matchedItems: number | null;
  unmatchedItems: number | null;
  status: "Completed" | "Needs Product Match" | "Needs OCR Review" | "Failed" | "Processing" | "Deleted";
  uploadedAt: string;
}

export default function ReceiptsAdmin() {
  // State for Filters
  const [showFilters, setShowFilters] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [retailerFilter, setRetailerFilter] = useState("All Retailers");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDatePurchase, setStartDatePurchase] = useState("");
  const [endDatePurchase, setEndDatePurchase] = useState("");
  const [startDateUpload, setStartDateUpload] = useState("");
  const [endDateUpload, setEndDateUpload] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Retailer logos mapping
  const retailerLogos: Record<string, React.ReactNode> = {
    Walmart: (
      <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs">
        <span className="text-[#FFC220] font-bold text-sm leading-none">✳</span>
        <span>Walmart</span>
      </div>
    ),
    Target: (
      <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs">
        <span className="w-3.5 h-3.5 rounded-full border-[3px] border-[#CC0000] flex items-center justify-center shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#CC0000]"></span>
        </span>
        <span>Target</span>
      </div>
    ),
    "Amazon Fresh": (
      <div className="flex items-center gap-1 font-bold text-slate-800 text-xs">
        <span className="text-[9px] text-[#00A8E8] font-black uppercase tracking-tighter mr-0.5">fresh</span>
        <span>Amazon Fresh</span>
      </div>
    ),
    Costco: (
      <div className="flex items-center gap-1.5 font-black text-[#E31837] text-[11px] uppercase tracking-wider italic">
        <span>Costco</span>
      </div>
    ),
    "Best Buy": (
      <div className="flex items-center gap-1 font-bold text-slate-900 text-xs">
        <span className="bg-[#FFF200] text-black px-1.5 py-0.5 rounded font-black text-[9px] tracking-tighter">BEST BUY</span>
      </div>
    ),
    Kroger: (
      <div className="flex items-center gap-1.5 font-extrabold text-[#002D62] text-xs italic">
        <span>Kroger</span>
      </div>
    ),
    Walgreens: (
      <div className="flex items-center gap-1.5 font-black text-[#E31837] text-xs font-serif italic">
        <span>Walgreens</span>
      </div>
    ),
    Instacart: (
      <div className="flex items-center gap-1.5 font-bold text-slate-850 text-xs">
        <span className="text-[#FF8200] text-xs">🥕</span>
        <span>Instacart</span>
      </div>
    ),
    "CVS Pharmacy": (
      <div className="flex items-center gap-1 font-bold text-slate-800 text-xs">
        <span className="text-[#CC0000] text-xs">♥</span>
        <span className="font-semibold text-[#CC0000]">CVS pharmacy</span>
      </div>
    ),
  };

  // Mock Receipts Data
  const initialReceipts: ReceiptRow[] = [
    {
      id: "RCP-2024-05126",
      subId: "#548721",
      userEmail: "jason.t@example.com",
      userBadge: "JS",
      retailerName: "Walmart",
      retailerLogo: retailerLogos.Walmart,
      purchaseDate: "May 20, 2024",
      total: "$128.64",
      ocrConfidence: 96,
      matchedItems: 18,
      unmatchedItems: 2,
      status: "Completed",
      uploadedAt: "May 20, 2024 10:15 AM",
    },
    {
      id: "RCP-2024-05125",
      subId: "#548720",
      userEmail: "sarah.w@example.com",
      userBadge: "SM",
      retailerName: "Target",
      retailerLogo: retailerLogos.Target,
      purchaseDate: "May 20, 2024",
      total: "$76.39",
      ocrConfidence: 72,
      matchedItems: 11,
      unmatchedItems: 4,
      status: "Needs Product Match",
      uploadedAt: "May 20, 2024 9:42 AM",
    },
    {
      id: "RCP-2024-05124",
      subId: "#548719",
      userEmail: "mike.lee@example.com",
      userBadge: "ML",
      retailerName: "Amazon Fresh",
      retailerLogo: retailerLogos["Amazon Fresh"],
      purchaseDate: "May 19, 2024",
      total: "$213.99",
      ocrConfidence: 81,
      matchedItems: 15,
      unmatchedItems: 5,
      status: "Needs OCR Review",
      uploadedAt: "May 19, 2024 8:31 PM",
    },
    {
      id: "RCP-2024-05123",
      subId: "#548718",
      userEmail: "emily.r@example.com",
      userBadge: "ER",
      retailerName: "Costco",
      retailerLogo: retailerLogos.Costco,
      purchaseDate: "May 19, 2024",
      total: "$342.51",
      ocrConfidence: 95,
      matchedItems: 22,
      unmatchedItems: 1,
      status: "Completed",
      uploadedAt: "May 19, 2024 6:23 PM",
    },
    {
      id: "RCP-2024-05122",
      subId: "#548717",
      userEmail: "david.k@example.com",
      userBadge: "DT",
      retailerName: "Best Buy",
      retailerLogo: retailerLogos["Best Buy"],
      purchaseDate: "May 18, 2024",
      total: "$599.99",
      ocrConfidence: 65,
      matchedItems: 7,
      unmatchedItems: 7,
      status: "Needs Product Match",
      uploadedAt: "May 18, 2024 11:05 AM",
    },
    {
      id: "RCP-2024-05121",
      subId: "#548716",
      userEmail: "linda.p@example.com",
      userBadge: "LP",
      retailerName: "Kroger",
      retailerLogo: retailerLogos.Kroger,
      purchaseDate: "May 18, 2024",
      total: "$89.73",
      ocrConfidence: 90,
      matchedItems: 16,
      unmatchedItems: 0,
      status: "Completed",
      uploadedAt: "May 18, 2024 9:17 AM",
    },
    {
      id: "RCP-2024-05120",
      subId: "#548715",
      userEmail: "robert.b@example.com",
      userBadge: "RB",
      retailerName: "Walgreens",
      retailerLogo: retailerLogos.Walgreens,
      purchaseDate: "May 17, 2024",
      total: "$32.18",
      ocrConfidence: 40,
      matchedItems: 3,
      unmatchedItems: 6,
      status: "Failed",
      uploadedAt: "May 17, 2024 4:12 PM",
    },
    {
      id: "RCP-2024-05119",
      subId: "#548714",
      userEmail: "amanda.c@example.com",
      userBadge: "AC",
      retailerName: "Instacart",
      retailerLogo: retailerLogos.Instacart,
      purchaseDate: "May 17, 2024",
      total: "$156.27",
      ocrConfidence: 88,
      matchedItems: 19,
      unmatchedItems: 2,
      status: "Processing",
      uploadedAt: "May 17, 2024 12:45 PM",
    },
    {
      id: "RCP-2024-05118",
      subId: "#548713",
      userEmail: "kevin.h@example.com",
      userBadge: "KW",
      retailerName: "Walmart",
      retailerLogo: retailerLogos.Walmart,
      purchaseDate: "May 16, 2024",
      total: "$64.12",
      ocrConfidence: null,
      matchedItems: null,
      unmatchedItems: null,
      status: "Deleted",
      uploadedAt: "May 16, 2024 9:02 AM",
    },
    {
      id: "RCP-2024-05117",
      subId: "#548712",
      userEmail: "nancy.d@example.com",
      userBadge: "NC",
      retailerName: "CVS Pharmacy",
      retailerLogo: retailerLogos["CVS Pharmacy"],
      purchaseDate: "May 16, 2024",
      total: "$45.88",
      ocrConfidence: 78,
      matchedItems: 6,
      unmatchedItems: 2,
      status: "Processing",
      uploadedAt: "May 16, 2024 8:11 AM",
    },
  ];

  // Colors for progress bar based on value
  const getProgressBarColor = (val: number) => {
    if (val >= 90) return "bg-emerald-500";
    if (val >= 70) return "bg-amber-500";
    return "bg-rose-500";
  };

  const getProgressTextColor = (val: number) => {
    if (val >= 90) return "text-emerald-600";
    if (val >= 70) return "text-amber-500";
    return "text-rose-500";
  };

  // Badge styles
  const getStatusBadge = (status: ReceiptRow["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border border-emerald-250";
      case "Needs Product Match":
        return "bg-orange-50 text-orange-700 border border-orange-250";
      case "Needs OCR Review":
        return "bg-amber-55/10 text-amber-700 border border-amber-250/60";
      case "Failed":
        return "bg-rose-50 text-rose-700 border border-rose-250";
      case "Processing":
        return "bg-blue-50 text-blue-700 border border-blue-250";
      case "Deleted":
        return "bg-slate-100 text-slate-500 border border-slate-200";
      default:
        return "bg-slate-50 text-slate-700";
    }
  };

  // Filtered and searched data
  const filteredReceipts = useMemo(() => {
    return initialReceipts.filter((item) => {
      const matchStatus =
        statusFilter === "All Statuses" || item.status === statusFilter;
      const matchRetailer =
        retailerFilter === "All Retailers" || item.retailerName === retailerFilter;
      const matchSearch =
        searchQuery === "" ||
        item.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subId.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchRetailer && matchSearch;
    });
  }, [statusFilter, retailerFilter, searchQuery]);

  const clearFilters = () => {
    setStatusFilter("All Statuses");
    setRetailerFilter("All Retailers");
    setSearchQuery("");
    setStartDatePurchase("");
    setEndDatePurchase("");
    setStartDateUpload("");
    setEndDateUpload("");
  };

  return (
    <div className="bg-slate-50 min-h-screen w-full overflow-x-hidden flex flex-col">
      <div className="w-full px-3 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-5 flex-1 min-w-0">
        
        {/* Header Block */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between w-full">
          <div>
            <h1 className="text-xl sm:text-[26px] font-bold text-slate-900 tracking-tight leading-tight">
              Receipts
            </h1>
            <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5 break-words">
              Review receipt uploads, OCR results, product matching, and savings suggestions.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 select-none">
            <button className="flex justify-center items-center gap-1.5 h-8 px-3 text-[11px] sm:text-[12px] font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-colors whitespace-nowrap">
              <Download className="h-3.5 w-3.5 text-slate-400" /> Export
            </button>
            <button className="flex justify-center items-center gap-1.5 h-8 px-3 text-[11px] sm:text-[12px] font-medium text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm transition-colors whitespace-nowrap">
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </button>
          </div>
        </div>

        {/* KPI Row (5 Cards) */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2.5 sm:gap-3">
          
          {/* Card 1: Total Receipts */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-2.5 sm:gap-4">
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-indigo-50 border border-indigo-100/60 text-[#4F46E5] shrink-0">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Total Receipts</span>
              <span className="text-lg sm:text-2xl font-black text-slate-900 leading-none mt-0.5 sm:mt-1 block">12,845</span>
              <span className="text-[9px] sm:text-[11px] text-slate-500 block mt-1 sm:mt-1.5 truncate">
                <span className="text-emerald-600 font-semibold">↑ 12%</span> vs last 30d
              </span>
            </div>
          </div>

          {/* Card 2: Processing */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-2.5 sm:gap-4">
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600 shrink-0">
              <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Processing</span>
              <span className="text-lg sm:text-2xl font-black text-slate-900 leading-none mt-0.5 sm:mt-1 block">152</span>
              <span className="text-[9px] sm:text-[11px] text-slate-550 block mt-1 sm:mt-1.5 truncate">
                <span className="text-blue-600 font-semibold">1.2%</span> of total
              </span>
            </div>
          </div>

          {/* Card 3: Needs Attention */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-2.5 sm:gap-4">
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-amber-50 border border-amber-100/60 text-[#D97706] shrink-0">
              <ShieldAlert className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Needs Attention</span>
              <span className="text-lg sm:text-2xl font-black text-slate-900 leading-none mt-0.5 sm:mt-1 block">321</span>
              <span className="text-[9px] sm:text-[11px] text-slate-550 block mt-1 sm:mt-1.5 truncate">
                <span className="text-amber-655 font-semibold">2.5%</span> of total
              </span>
            </div>
          </div>

          {/* Card 4: Completed */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-2.5 sm:gap-4">
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-emerald-50 border border-emerald-100/60 text-emerald-600 shrink-0">
              <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Completed</span>
              <span className="text-lg sm:text-2xl font-black text-slate-900 leading-none mt-0.5 sm:mt-1 block">11,924</span>
              <span className="text-[9px] sm:text-[11px] text-slate-550 block mt-1 sm:mt-1.5 truncate">
                <span className="text-emerald-655 font-semibold">92.8%</span> of total
              </span>
            </div>
          </div>

          {/* Card 5: Failed */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-2.5 sm:gap-4">
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-rose-50 border border-rose-100/60 text-rose-600 shrink-0">
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Failed</span>
              <span className="text-lg sm:text-2xl font-black text-slate-900 leading-none mt-0.5 sm:mt-1 block">118</span>
              <span className="text-[9px] sm:text-[11px] text-slate-550 block mt-1 sm:mt-1.5 truncate">
                <span className="text-rose-655 font-semibold">0.9%</span> of total
              </span>
            </div>
          </div>

        </div>

        {/* Filters Box */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 sm:px-5 py-3.5 border-b border-slate-100 flex items-center justify-between select-none">
            <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
              <SlidersHorizontal className="h-4 w-4 text-slate-400" />
              <span>Filters</span>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="text-xs font-bold text-[#4F46E5] hover:text-[#4338CA] inline-flex items-center gap-1 transition"
            >
              <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
              {showFilters ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </div>

          {showFilters && (
            <div className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                
                {/* Status Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 block">Status</label>
                  <div className="relative">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-xs font-semibold text-slate-700 outline-none cursor-pointer focus:border-[#4F46E5] transition"
                    >
                      <option>All Statuses</option>
                      <option>Completed</option>
                      <option>Needs Product Match</option>
                      <option>Needs OCR Review</option>
                      <option>Failed</option>
                      <option>Processing</option>
                      <option>Deleted</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Retailer Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 block">Retailer</label>
                  <div className="relative">
                    <select
                      value={retailerFilter}
                      onChange={(e) => setRetailerFilter(e.target.value)}
                      className="w-full appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-xs font-semibold text-slate-700 outline-none cursor-pointer focus:border-[#4F46E5] transition"
                    >
                      <option>All Retailers</option>
                      <option>Walmart</option>
                      <option>Target</option>
                      <option>Amazon Fresh</option>
                      <option>Costco</option>
                      <option>Best Buy</option>
                      <option>Kroger</option>
                      <option>Walgreens</option>
                      <option>Instacart</option>
                      <option>CVS Pharmacy</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* User Search */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 block">User</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search user by email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-[#4F46E5] transition placeholder:text-slate-350"
                    />
                    <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Date Range (Purchase Date) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 block">Date Range (Purchase Date)</label>
                  <div className="relative flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden focus-within:border-[#4F46E5]">
                    <span className="pl-3 pr-1 text-slate-400"><Calendar className="h-4 w-4" /></span>
                    <input
                      type="text"
                      placeholder="Start date  –  End date"
                      value={startDatePurchase}
                      onChange={(e) => setStartDatePurchase(e.target.value)}
                      className="w-full border-0 bg-transparent py-2 px-1 text-xs font-semibold text-slate-700 outline-none placeholder:text-slate-350"
                    />
                  </div>
                </div>

                {/* Uploaded At */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 block">Uploaded At</label>
                  <div className="relative flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden focus-within:border-[#4F46E5]">
                    <span className="pl-3 pr-1 text-slate-400"><Calendar className="h-4 w-4" /></span>
                    <input
                      type="text"
                      placeholder="Start date  –  End date"
                      value={startDateUpload}
                      onChange={(e) => setStartDateUpload(e.target.value)}
                      className="w-full border-0 bg-transparent py-2 px-1 text-xs font-semibold text-slate-700 outline-none placeholder:text-slate-350"
                    />
                  </div>
                </div>

              </div>

              {/* Filter Buttons */}
              <div className="flex items-center justify-end gap-3 pb-0.5 select-none shrink-0">
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-250 bg-white px-4 py-2 text-xs font-bold text-slate-750 hover:bg-slate-50 transition shadow-2xs"
                >
                  <RotateCcw className="h-3.5 w-3.5 text-slate-450" />
                  Clear Filters
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-2 text-xs font-bold transition shadow-sm">
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Data Table Block */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Table Toolbar */}
          <div className="px-5 py-4 border-b border-slate-100 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between select-none">
            <span className="text-xs font-bold text-slate-500">
              Total {filteredReceipts.length.toLocaleString()} receipts
            </span>
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm">
                <Settings className="h-3.5 w-3.5 text-slate-400" />
                Columns
              </button>
              <div className="relative">
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer shadow-sm hover:bg-slate-50 transition"
                >
                  <option value={10}>10 per page</option>
                  <option value={25}>25 per page</option>
                  <option value={50}>50 per page</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1250px] text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-55/30 border-b border-slate-200 text-slate-900 font-bold uppercase tracking-wider text-[10px] select-none whitespace-nowrap">
                  <th className="py-3.5 px-5 font-bold">Receipt ID</th>
                  <th className="py-3.5 px-4 font-bold">User</th>
                  <th className="py-3.5 px-4 font-bold">Retailer</th>
                  <th className="py-3.5 px-4 font-bold">Purchase Date</th>
                  <th className="py-3.5 px-4 font-bold">Total</th>
                  <th className="py-3.5 px-4 font-bold">
                    <span className="flex items-center gap-1">
                      OCR Confidence
                      <Info className="h-3.5 w-3.5 text-slate-400 cursor-help" />
                    </span>
                  </th>
                  <th className="py-3.5 px-4 font-bold text-slate-900 text-center">Matched Items</th>
                  <th className="py-3.5 px-4 font-bold text-slate-900 text-center">Unmatched Items</th>
                  <th className="py-3.5 px-4 font-bold text-center">Status</th>
                  <th className="py-3.5 px-4 font-bold">Uploaded At</th>
                  <th className="py-3.5 px-4 pr-5 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 whitespace-nowrap">
                {filteredReceipts.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                    
                    {/* Receipt ID */}
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0">
                          <FileText className="h-4.5 w-4.5 text-slate-400" />
                        </div>
                        <div className="leading-tight">
                          {row.status === "Needs OCR Review" ? (
                            <span className="font-bold text-slate-700 text-xs block">
                              {row.id}
                            </span>
                          ) : (
                            <Link href={`/dashboard/receipts/${row.id}`} className="font-bold text-[#4F46E5] text-xs hover:underline block">
                              {row.id}
                            </Link>
                          )}
                          <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                            {row.subId}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* User */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[10px] font-extrabold text-[#4F46E5] shrink-0 uppercase select-none">
                          {row.userBadge}
                        </div>
                        <span className="font-bold text-slate-700">{row.userEmail}</span>
                      </div>
                    </td>

                    {/* Retailer */}
                    <td className="py-3 px-4">
                      {row.retailerLogo}
                    </td>

                    {/* Purchase Date */}
                    <td className="py-3 px-4 font-semibold text-slate-655">
                      {row.purchaseDate}
                    </td>

                    {/* Total */}
                    <td className="py-3 px-4 font-bold text-slate-800 text-sm">
                      {row.total}
                    </td>

                    {/* OCR Confidence */}
                    <td className="py-3 px-4">
                      {row.ocrConfidence !== null ? (
                        <div className="w-[120px] space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-bold">
                            <span className={getProgressTextColor(row.ocrConfidence)}>
                              {row.ocrConfidence}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                            <div
                                className={cn("h-full rounded-full transition-all duration-500", getProgressBarColor(row.ocrConfidence))}
                                style={{ width: `${row.ocrConfidence}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-400 font-semibold">—</span>
                      )}
                    </td>

                    {/* Matched Items */}
                    <td className="py-3 px-4 text-center font-bold text-emerald-600 text-sm">
                      {row.matchedItems !== null ? row.matchedItems : <span className="text-slate-400 font-semibold">—</span>}
                    </td>

                    {/* Unmatched Items */}
                    <td className="py-3 px-4 text-center font-bold text-orange-500 text-sm">
                      {row.unmatchedItems !== null ? row.unmatchedItems : <span className="text-slate-400 font-semibold">—</span>}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-4 select-none text-center">
                      <span className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase", getStatusBadge(row.status))}>
                        {row.status}
                      </span>
                    </td>

                    {/* Uploaded At */}
                    <td className="py-3 px-4 text-slate-500 font-semibold leading-tight">
                      <div className="text-slate-700">{row.uploadedAt.split(" ")[0]} {row.uploadedAt.split(" ")[1]} {row.uploadedAt.split(" ")[2]}</div>
                      <div className="text-[10px] text-slate-400 font-semibold mt-0.5">{row.uploadedAt.split(" ")[3]} {row.uploadedAt.split(" ")[4]}</div>
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 pr-5 text-center select-none">
                      <div className="inline-flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
                        {row.status === "Needs OCR Review" ? (
                          <button disabled className="px-3.5 py-1.5 text-xs font-bold text-slate-450 bg-slate-50 border-r border-slate-150 cursor-not-allowed select-none">
                            View
                          </button>
                        ) : (
                          <Link href={`/dashboard/receipts/${row.id}`} className="px-3.5 py-1.5 text-xs font-bold text-[#4F46E5] hover:bg-slate-50 border-r border-slate-150 transition">
                            View
                          </Link>
                        )}
                        <button className="px-2 py-1.5 hover:bg-slate-50 transition text-slate-400 hover:text-slate-600">
                          <ChevronDown className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Footer */}
          <div className="px-5 py-4 border-t border-slate-100 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white text-slate-500 font-medium select-none">
            <span className="text-xs">
              Showing 1 to {Math.min(pageSize, filteredReceipts.length)} of {filteredReceipts.length.toLocaleString()} receipts
            </span>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1.5 self-end sm:self-auto">
              <button
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition disabled:opacity-50 disabled:pointer-events-none"
              >
                <ChevronDown className="h-4 w-4 rotate-90" />
              </button>

              <button className="w-8 h-8 rounded-lg bg-[#4F46E5] text-white flex items-center justify-center text-xs font-extrabold shadow-sm">
                1
              </button>
              
              <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-slate-50 transition">
                2
              </button>
              
              <button className="w-8 h-8 rounded-lg border border-slate-200 hidden sm:flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-slate-50 transition">
                3
              </button>

              <button className="w-8 h-8 rounded-lg border border-slate-200 hidden sm:flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-slate-50 transition">
                4
              </button>

              <button className="w-8 h-8 rounded-lg border border-slate-200 hidden md:flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-slate-50 transition">
                5
              </button>

              <span className="px-1 text-slate-350 text-xs hidden sm:inline">...</span>

              <button className="w-12 h-8 rounded-lg border border-slate-200 hidden sm:flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-slate-50 transition">
                1,285
              </button>

              <button
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition"
              >
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
