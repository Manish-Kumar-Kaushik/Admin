"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Wallet,
  Download,
  Filter,
  Upload,
  ChevronDown,
  Calendar,
  Eye,
  MoreVertical,
  X,
  Plus,
} from "lucide-react";

interface UploadedReceipt {
  id: string;
  subId: string;
  name: string;
  store: string;
  date: string;
  amount: string;
  status: "Processed" | "Pending" | "Action Required";
  itemsCount: number;
  uploadedBy: {
    name: string;
    email: string;
    avatar: string;
  };
  icon?: string;
}

const mockReceipts: UploadedReceipt[] = [
  {
    id: "RCPT-WM-5038291",
    subId: "#WM5038291",
    name: "Walmart Receipt",
    store: "Walmart",
    date: "May 26, 2025 10:24 AM",
    amount: "$128.47",
    status: "Processed",
    itemsCount: 5,
    uploadedBy: {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    },
  },
  {
    id: "RCPT-BB-6182739",
    subId: "#BBY6182739",
    name: "Best Buy Receipt",
    store: "Best Buy",
    date: "May 26, 2025 09:58 AM",
    amount: "$349.99",
    status: "Processed",
    itemsCount: 2,
    uploadedBy: {
      name: "Michael Chen",
      email: "michael.c@email.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    },
  },
  {
    id: "RCPT-AM-29291032",
    subId: "#AMZ29291032",
    name: "Amazon Receipt",
    store: "Amazon",
    date: "May 25, 2025 08:41 PM",
    amount: "$89.99",
    status: "Pending",
    itemsCount: 1,
    uploadedBy: {
      name: "Emily Davis",
      email: "emily.d@email.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
  },
  {
    id: "RCPT-TG-4029184",
    subId: "#TGT4029184",
    name: "Target Receipt",
    store: "Target",
    date: "May 25, 2025 04:22 PM",
    amount: "$67.34",
    status: "Action Required",
    itemsCount: 3,
    uploadedBy: {
      name: "David Wilson",
      email: "david.w@email.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    },
  },
  {
    id: "RCPT-CT-2801291",
    subId: "#CST8820191",
    name: "Costco Receipt",
    store: "Costco",
    date: "May 24, 2025 02:13 PM",
    amount: "$563.22",
    status: "Processed",
    itemsCount: 8,
    uploadedBy: {
      name: "Lisa Martinez",
      email: "lisa.m@email.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    },
  },
  {
    id: "RCPT-HD-2019837",
    subId: "#HD2091837",
    name: "Home Depot Receipt",
    store: "Home Depot",
    date: "May 24, 2025 11:07 AM",
    amount: "$214.16",
    status: "Processed",
    itemsCount: 4,
    uploadedBy: {
      name: "Robert Garcia",
      email: "robert.g@email.com",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80",
    },
  },
  {
    id: "RCPT-EB-77120182",
    subId: "#EBY7720182",
    name: "eBay Order Receipt",
    store: "eBay",
    date: "May 23, 2025 07:52 PM",
    amount: "$45.50",
    status: "Processed",
    itemsCount: 1,
    uploadedBy: {
      name: "Sophia Lee",
      email: "sophia.l@email.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    },
  },
];

const mockReceiptDetails: Record<string, {
  paymentMethod: string;
  categories: string[];
  itemsList: { name: string; price: string }[];
  tax: string;
  subtotal: string;
}> = {
  "RCPT-WM-5038291": {
    paymentMethod: "Visa **** 4242",
    categories: ["Groceries", "Household"],
    itemsList: [
      { name: "GREAT VALUE OATS", price: "2.98" },
      { name: "LAYS CLASSIC", price: "3.48" },
      { name: "MILK 2%", price: "2.84" },
      { name: "TIDE LIQUID", price: "17.99" },
      { name: "Bounty Paper Towels", price: "18.97" },
    ],
    subtotal: "46.26",
    tax: "3.15",
  },
  "RCPT-BB-6182739": {
    paymentMethod: "Mastercard **** 8821",
    categories: ["Electronics"],
    itemsList: [
      { name: "Sony WH-1000XM5 Black", price: "349.99" },
    ],
    subtotal: "349.99",
    tax: "28.50",
  },
  "RCPT-AM-29291032": {
    paymentMethod: "Visa **** 4242",
    categories: ["Electronics"],
    itemsList: [
      { name: "Sony WH-CH720N Wireless", price: "89.99" },
    ],
    subtotal: "89.99",
    tax: "7.20",
  },
  "RCPT-TG-4029184": {
    paymentMethod: "RedCard **** 9012",
    categories: ["Home", "Apparel"],
    itemsList: [
      { name: "Bose QuietComfort 45", price: "59.99" },
      { name: "Men's Crew Socks 6pk", price: "7.35" },
    ],
    subtotal: "67.34",
    tax: "5.38",
  },
};

// Retailer logo generator helper
function RetailerLogo({ name }: { name: string }) {
  if (name === "Walmart") {
    return (
      <div className="flex items-center gap-1.5 font-bold text-slate-800">
        <span className="text-amber-500 text-sm font-black select-none">☀</span>
        <span>Walmart</span>
      </div>
    );
  }
  if (name === "Best Buy") {
    return (
      <div className="flex items-center gap-1.5">
        <span className="bg-yellow-400 text-[8px] font-black px-1.5 py-0.5 rounded text-black leading-none shadow-3xs uppercase tracking-tight select-none">
          Best Buy
        </span>
      </div>
    );
  }
  if (name === "Amazon") {
    return (
      <div className="flex items-center gap-1 font-bold text-slate-800">
        <span className="text-amber-600 text-sm font-black select-none">a</span>
        <span>Amazon</span>
      </div>
    );
  }
  if (name === "Target") {
    return (
      <div className="flex items-center gap-1 text-red-600 font-bold">
        <span className="h-4.5 w-4.5 rounded-full border-4 border-red-600 flex items-center justify-center shrink-0">
          <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
        </span>
        <span className="text-slate-800">Target</span>
      </div>
    );
  }
  if (name === "Costco") {
    return (
      <div className="flex items-center font-black italic text-red-600 tracking-tight text-xs">
        COSTCO
      </div>
    );
  }
  if (name === "Home Depot") {
    return (
      <div className="bg-orange-500 text-white font-extrabold text-[8px] px-1 py-0.5 rounded leading-none shrink-0 uppercase tracking-tighter shadow-3xs">
        HD
      </div>
    );
  }
  return <span className="font-bold text-slate-700">{name}</span>;
}

export default function ReceiptUploads() {
  const [selectedId, setSelectedId] = useState<string>("RCPT-WM-5038291");
  const [activeTab, setActiveTab] = useState<"All" | "Processed" | "Pending" | "Action">("All");
  const [showRightPane, setShowRightPane] = useState<boolean>(true);

  const selectedReceipt = mockReceipts.find((r) => r.id === selectedId) || mockReceipts[0];
  const selectedDetails = mockReceiptDetails[selectedReceipt.id] || {
    paymentMethod: "Visa **** 4242",
    categories: ["Groceries"],
    itemsList: [{ name: "Mock Item", price: "0.00" }],
    subtotal: "0.00",
    tax: "0.00",
  };

  const getStatusBadgeClass = (status: UploadedReceipt["status"]) => {
    if (status === "Processed") {
      return "text-emerald-700 bg-emerald-50 border border-emerald-200/50";
    }
    if (status === "Pending") {
      return "text-amber-700 bg-amber-50 border border-amber-200/50";
    }
    return "text-rose-700 bg-rose-50 border border-rose-200/50";
  };

  const filteredReceipts = mockReceipts.filter((r) => {
    if (activeTab === "All") return true;
    if (activeTab === "Processed") return r.status === "Processed";
    if (activeTab === "Pending") return r.status === "Pending";
    return r.status === "Action Required";
  });

  return (
    <div className="bg-slate-50 min-h-full w-full font-sans pb-4">
      <div className="w-full max-w-full px-2 sm:px-4 md:px-5 py-5 space-y-5">
        
        {/* Title Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Receipt Uploads
              </h1>
              <span className="h-4.5 w-4.5 rounded-full border border-slate-350 flex items-center justify-center text-[10px] font-bold text-slate-450 cursor-help" title="View all user uploaded receipts">i</span>
            </div>
            <p className="text-xs sm:text-[13px] text-slate-550 mt-1 select-none">
              View and manage all receipts uploaded by users. Extracted data helps power price tracking, warranty alerts, and spending insights.
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 select-none">
            <button className="flex justify-center items-center gap-1.5 h-8.5 px-3.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-colors whitespace-nowrap">
              <Download className="h-3.5 w-3.5 text-slate-400" /> Export
            </button>
            <button className="flex justify-center items-center gap-1.5 h-8.5 px-3.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-colors whitespace-nowrap">
              <Filter className="h-3.5 w-3.5 text-slate-400" /> Filters
            </button>
            <button className="flex justify-center items-center gap-1.5 h-8.5 px-3.5 text-xs font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm transition-colors whitespace-nowrap">
              <Upload className="h-3.5 w-3.5" /> Upload Receipt
            </button>
          </div>
        </div>

        {/* KPI Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full">
          {/* Card 1: Total Receipts */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:py-5 sm:px-4.5 shadow-xs flex items-center gap-2 sm:gap-3.5 w-full">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-indigo-50/60 text-indigo-650 flex items-center justify-center shrink-0">
              <FileText className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[8.5px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Receipts</span>
              <span className="text-base sm:text-2xl font-extrabold text-slate-900 leading-tight mt-0.5 block">1,248</span>
              <span className="text-[8.5px] sm:text-[10px] text-slate-500 block mt-0.5 truncate" title="↗ 14.6% vs last 30 days">
                <span className="text-emerald-600 font-bold">↗ 14.6%</span> vs last 30d
              </span>
            </div>
          </div>

          {/* Card 2: Successfully Processed */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:py-5 sm:px-4.5 shadow-xs flex items-center gap-2 sm:gap-3.5 w-full">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-emerald-50/60 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[8.5px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Processed</span>
              <span className="text-base sm:text-2xl font-extrabold text-slate-900 leading-tight mt-0.5 block">1,032</span>
              <span className="text-[8.5px] sm:text-[10px] text-slate-500 font-bold block mt-0.5 truncate">
                82.7% of total
              </span>
            </div>
          </div>

          {/* Card 3: Pending Processing */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:py-5 sm:px-4.5 shadow-xs flex items-center gap-2 sm:gap-3.5 w-full">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-amber-50/60 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[8.5px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pending</span>
              <span className="text-base sm:text-2xl font-extrabold text-slate-900 leading-tight mt-0.5 block">124</span>
              <span className="text-[8.5px] sm:text-[10px] text-slate-500 font-bold block mt-0.5 truncate">
                9.9% of total
              </span>
            </div>
          </div>

          {/* Card 4: Action Required */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:py-5 sm:px-4.5 shadow-xs flex items-center gap-2 sm:gap-3.5 w-full">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-rose-50/60 text-rose-600 flex items-center justify-center shrink-0">
              <AlertCircle className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[8.5px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Action Req.</span>
              <span className="text-base sm:text-2xl font-extrabold text-slate-900 leading-tight mt-0.5 block">64</span>
              <span className="text-[8.5px] sm:text-[10px] text-slate-500 font-bold block mt-0.5 truncate">
                5.1% of total
              </span>
            </div>
          </div>

          {/* Card 5: Total Spent */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:py-5 sm:px-4.5 shadow-xs flex items-center gap-2 sm:gap-3.5 w-full">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-blue-50/60 text-blue-600 flex items-center justify-center shrink-0">
              <Wallet className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[8.5px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Spent</span>
              <span className="text-base sm:text-2xl font-extrabold text-slate-900 leading-tight mt-0.5 block">$48,293.68</span>
              <span className="text-[8.5px] sm:text-[10px] text-slate-500 block mt-0.5 truncate" title="↗ 12.3% vs last 30 days">
                <span className="text-emerald-600 font-bold">↗ 12.3%</span> vs last 30d
              </span>
            </div>
          </div>
        </div>

        {/* Filters Box */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-4 select-none">
          <div className="flex flex-wrap items-center gap-3">
            {/* Date Range */}
            <div className="flex flex-col gap-1 w-full sm:w-[170px]">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Date Range</span>
              <div className="relative flex items-center border border-slate-200 rounded-lg bg-slate-50/50 hover:bg-slate-55 transition overflow-hidden">
                <span className="pl-3 text-slate-400"><Calendar className="h-3.5 w-3.5" /></span>
                <input
                  type="text"
                  defaultValue="May 20 – May 26, 2025"
                  className="w-full border-0 bg-transparent py-1.5 pl-2 pr-3 text-xs font-bold text-slate-700 outline-none"
                />
              </div>
            </div>

            {/* Status */}
            <div className="flex flex-col gap-1 w-full sm:w-[130px]">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Status</span>
              <div className="relative">
                <select className="w-full appearance-none bg-slate-50/50 hover:bg-slate-55 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer transition">
                  <option>All Statuses</option>
                  <option>Processed</option>
                  <option>Pending</option>
                  <option>Action Required</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Store */}
            <div className="flex flex-col gap-1 w-full sm:w-[130px]">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Store</span>
              <div className="relative">
                <select className="w-full appearance-none bg-slate-50/50 hover:bg-slate-55 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer transition">
                  <option>All Stores</option>
                  <option>Walmart</option>
                  <option>Best Buy</option>
                  <option>Amazon</option>
                  <option>Target</option>
                  <option>Costco</option>
                  <option>Home Depot</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1 w-full sm:w-[130px]">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Category</span>
              <div className="relative">
                <select className="w-full appearance-none bg-slate-50/50 hover:bg-slate-55 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer transition">
                  <option>All Categories</option>
                  <option>Groceries</option>
                  <option>Electronics</option>
                  <option>Household</option>
                  <option>Home</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* User */}
            <div className="flex flex-col gap-1 w-full sm:w-[130px]">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">User</span>
              <div className="relative">
                <select className="w-full appearance-none bg-slate-50/50 hover:bg-slate-55 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer transition">
                  <option>All Users</option>
                  <option>Sarah Johnson</option>
                  <option>Michael Chen</option>
                  <option>Emily Davis</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* More Filters button */}
            <button className="flex items-center gap-1.5 h-8.5 px-3.5 text-xs font-bold text-slate-750 bg-slate-50/70 border border-slate-200 rounded-lg hover:bg-slate-50 shadow-3xs transition mt-4 sm:mt-0 sm:self-end">
              <Filter className="h-3.5 w-3.5 text-slate-400" /> More Filters
            </button>

            {/* Clear All link */}
            <button className="text-xs font-bold text-[#4F46E5] hover:text-[#4338CA] transition mt-4 sm:mt-0 sm:self-end sm:mb-1.5 ml-auto">
              Clear All
            </button>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Left Table Section */}
          <div className={cn("min-w-0 space-y-4", showRightPane ? "lg:col-span-9" : "lg:col-span-12")}>
            <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
              
              {/* Table Toolbar */}
              <div className="px-4 py-3.5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 select-none">
                <div className="flex items-center gap-5 text-xs font-bold overflow-x-auto whitespace-nowrap pb-1 scrollbar-none w-full sm:w-auto">
                  <button
                    onClick={() => setActiveTab("All")}
                    className={cn("pb-1 border-b-2 transition-colors", activeTab === "All" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
                  >
                    All Receipts (1,248)
                  </button>
                  <button
                    onClick={() => setActiveTab("Processed")}
                    className={cn("pb-1 border-b-2 transition-colors", activeTab === "Processed" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
                  >
                    Processed (1,032)
                  </button>
                  <button
                    onClick={() => setActiveTab("Pending")}
                    className={cn("pb-1 border-b-2 transition-colors", activeTab === "Pending" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
                  >
                    Pending (124)
                  </button>
                  <button
                    onClick={() => setActiveTab("Action")}
                    className={cn("pb-1 border-b-2 transition-colors", activeTab === "Action" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
                  >
                    Action Required (64)
                  </button>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                  <div className="relative">
                    <select className="appearance-none bg-transparent pl-1 pr-6 py-1 text-xs font-bold text-slate-800 outline-none cursor-pointer">
                      <option>Sort: Newest First</option>
                      <option>Sort: Oldest First</option>
                      <option>Sort: Highest Amount</option>
                    </select>
                    <ChevronDown className="absolute right-0.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Table Wrapper */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/60 border-b border-slate-150 text-slate-450 font-bold uppercase tracking-wider text-[10px] select-none">
                      <th className="py-3 px-4 w-[5%] text-center">
                        <input type="checkbox" className="rounded border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5 cursor-pointer" />
                      </th>
                      <th className="py-3 px-4 w-[20%] font-bold">Receipt</th>
                      <th className="py-3 px-4 w-[15%] font-bold">Store</th>
                      <th className="py-3 px-4 w-[16%] font-bold">Date</th>
                      <th className="py-3 px-4 w-[12%] font-bold">Amount</th>
                      <th className="py-3 px-4 w-[12%] font-bold">Status</th>
                      <th className="py-3 px-4 w-[8%] font-bold">Items</th>
                      <th className="py-3 px-4 w-[18%] font-bold">Uploaded By</th>
                      <th className="py-3 px-4 w-[8%] text-center font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {filteredReceipts.map((row) => {
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
                          <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => setSelectedId(row.id)}
                              className="rounded border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5 cursor-pointer"
                            />
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              {/* Mini receipt thumbnail icon */}
                              <div className="h-9 w-7 bg-slate-50 border border-slate-200 rounded flex flex-col justify-between p-0.5 shrink-0 shadow-3xs leading-none text-[3px] font-mono text-slate-400 select-none">
                                <div className="h-px bg-slate-300 w-3/4 mx-auto my-0.5" />
                                <div className="h-[2px] bg-slate-200 w-5/6 mx-auto" />
                                <div className="h-[2px] bg-slate-200 w-2/3 mx-auto" />
                                <div className="h-1 w-full bg-slate-450 mt-1 scale-y-[0.5]" />
                              </div>
                              <div className="leading-tight min-w-0">
                                <span className="font-bold text-slate-900 block truncate">{row.name}</span>
                                <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{row.subId}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <RetailerLogo name={row.store} />
                          </td>
                          <td className="py-4 px-4">
                            <div className="leading-tight">
                              <span className="font-bold text-slate-900 block">{row.date.split(" ").slice(0, 3).join(" ")}</span>
                              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{row.date.split(" ").slice(3).join(" ")}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-slate-900 font-bold">
                            {row.amount}
                          </td>
                          <td className="py-4 px-4 select-none">
                            <span className={cn("inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-extrabold tracking-wide uppercase leading-none", getStatusBadgeClass(row.status))}>
                              {row.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-slate-600">
                            {row.itemsCount}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2 min-w-0">
                              <img src={row.uploadedBy.avatar} className="h-6.5 w-6.5 rounded-full object-cover shadow-3xs border border-slate-200" alt={row.uploadedBy.name} />
                              <div className="leading-none min-w-0">
                                <span className="text-xs font-bold text-slate-800 block truncate">{row.uploadedBy.name}</span>
                                <span className="text-[9px] text-slate-400 block mt-0.5 truncate">{row.uploadedBy.email}</span>
                              </div>
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
                  Showing 1 to 7 of 1,248 results
                </span>
                
                <div className="flex items-center gap-3">
                  {/* Page Size Select */}
                  <div className="relative">
                    <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-650 outline-none cursor-pointer shadow-2xs hover:bg-slate-50 transition">
                      <option>10 / page</option>
                      <option>25 / page</option>
                      <option>50 / page</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>

                  {/* Page index selectors */}
                  <div className="flex items-center gap-1">
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-400">&lt;</button>
                    <button className="h-8 w-8 rounded-lg bg-[#4F46E5] text-white flex items-center justify-center text-xs font-black shadow-sm">1</button>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-50 transition text-slate-600">2</button>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-50 transition text-slate-600">3</button>
                    <span className="px-1 text-slate-350 text-xs">...</span>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-50 transition text-slate-600">125</button>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-400">&gt;</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Details Panel */}
          {showRightPane && (
            <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4 relative min-w-0">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 select-none">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-slate-800">{selectedReceipt.name}</h2>
                  <span className={cn("inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-extrabold tracking-wide uppercase leading-none", getStatusBadgeClass(selectedReceipt.status))}>
                    {selectedReceipt.status}
                  </span>
                </div>
                <button 
                  onClick={() => setShowRightPane(false)}
                  className="h-6 w-6 rounded-md hover:bg-slate-100 flex items-center justify-center text-slate-455 hover:text-slate-700 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Detail fields info */}
              <div className="space-y-3.5 text-xs font-semibold text-slate-700">
                <div className="grid grid-cols-[100px_1fr] gap-y-2">
                  <span className="text-slate-450 font-bold">Receipt ID</span>
                  <span className="text-slate-900 font-bold">{selectedReceipt.id}</span>
                  
                  <span className="text-slate-450 font-bold self-start mt-0.5">Uploaded By</span>
                  <div className="flex items-center gap-2 min-w-0">
                    <img src={selectedReceipt.uploadedBy.avatar} className="h-6.5 w-6.5 rounded-full object-cover shadow-3xs border border-slate-200" alt="" />
                    <div className="leading-none">
                      <span className="text-slate-900 font-bold block">{selectedReceipt.uploadedBy.name}</span>
                      <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{selectedReceipt.uploadedBy.email}</span>
                    </div>
                  </div>

                  <span className="text-slate-450 font-bold">Upload Date</span>
                  <span className="text-slate-800">{selectedReceipt.date}</span>

                  <span className="text-slate-450 font-bold">Store</span>
                  <div className="flex items-center gap-1.5">
                    <RetailerLogo name={selectedReceipt.store} />
                  </div>

                  <span className="text-slate-450 font-bold">Total Amount</span>
                  <span className="text-slate-900 font-bold">{selectedReceipt.amount}</span>

                  <span className="text-slate-450 font-bold">Items</span>
                  <span className="text-slate-805">{selectedReceipt.itemsCount} items</span>

                  <span className="text-slate-450 font-bold">Payment Method</span>
                  <span className="text-slate-800">{selectedDetails.paymentMethod}</span>

                  <span className="text-slate-450 font-bold self-start mt-0.5">Categories</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedDetails.categories.map((c) => (
                      <span key={c} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">
                        {c}
                      </span>
                    ))}
                    <span className="px-1.5 py-0.5 bg-indigo-50 border border-indigo-150 text-[#4F46E5] rounded text-[10px] font-bold">
                      +1
                    </span>
                  </div>
                </div>
              </div>

              {/* Receipt Preview box */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider select-none">Receipt Preview</span>
                
                <div className="border border-slate-200 rounded-xl p-3 bg-white shadow-3xs font-mono text-[10px] leading-relaxed text-slate-700 space-y-2 max-h-60 overflow-y-auto">
                  <div className="text-center font-bold text-xs tracking-wide">{selectedReceipt.store.toUpperCase()}</div>
                  <div className="border-b border-dashed border-slate-300 pb-1 text-[8px] text-slate-400 text-center font-semibold">
                    DATE: {selectedReceipt.date}
                  </div>
                  
                  <div className="space-y-1">
                    {selectedDetails.itemsList.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{item.name}</span>
                        <span className="font-bold">${item.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-dashed border-slate-300 pt-1.5 space-y-0.5 text-[9px]">
                    <div className="flex justify-between text-slate-500 font-medium">
                      <span>SUBTOTAL</span>
                      <span>${selectedDetails.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 font-medium">
                      <span>TAX</span>
                      <span>${selectedDetails.tax}</span>
                    </div>
                    <div className="flex justify-between text-slate-950 font-bold text-xs pt-1 border-t border-slate-150">
                      <span>TOTAL</span>
                      <span>{selectedReceipt.amount}</span>
                    </div>
                  </div>

                  {/* Barcode Mock */}
                  <div className="pt-2 text-center select-none">
                    <div className="h-6 bg-slate-900 w-full flex items-center scale-y-[0.7]">
                      <div className="w-full h-full bg-[linear-gradient(90deg,#000_2px,transparent_2px,#000_3px,#000_5px,transparent_5px,#000_7px,transparent_8px,#000_10px)]"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-slate-100 flex gap-2 select-none">
                <button className="flex-1 py-2 border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 rounded-lg transition shadow-2xs">
                  View Details
                </button>
                <button className="flex-1 py-2 bg-indigo-50 hover:bg-indigo-100/70 border border-indigo-200 text-xs font-bold text-[#4F46E5] rounded-lg transition flex items-center justify-center gap-1.5 shadow-2xs">
                  <Download className="h-3.5 w-3.5" /> Download
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
