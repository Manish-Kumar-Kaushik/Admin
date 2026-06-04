"use client";

import React, { useState } from "react";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Calendar,
  ChevronDown,
  ChevronUp,
  
  Download,
  Filter,
  Eye,
  MoreVertical,
  X,
  Plus,
  ArrowUpRight,
  Lock,
  Settings,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Check,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Retailer Logo component matching receipts-admin.tsx
const RetailerLogo = ({ name }: { name: string }) => {
  switch (name) {
    case "Walmart":
      return (
        <div className="flex items-center gap-1.5 font-bold text-slate-805 text-xs">
          <span className="text-[#FFC220] font-bold text-sm leading-none">✳</span>
          <span>Walmart</span>
        </div>
      );
    case "Target":
      return (
        <div className="flex items-center gap-1.5 font-bold text-slate-805 text-xs">
          <span className="w-3.5 h-3.5 rounded-full border-[3px] border-[#CC0000] flex items-center justify-center shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CC0000]"></span>
          </span>
          <span>Target</span>
        </div>
      );
    case "Best Buy":
      return (
        <div className="flex items-center gap-1.5 font-bold text-slate-855 text-xs">
          <span className="bg-[#FFF200] text-black px-1.5 py-0.5 rounded font-black text-[9px] tracking-tighter mr-0.5">BEST BUY</span>
        </div>
      );
    case "Amazon":
      return (
        <div className="flex items-center gap-1.5 font-bold text-slate-805 text-xs">
          <span className="text-[#FF9900] text-xs font-black">a</span>
          <span>Amazon</span>
        </div>
      );
    case "Costco":
      return (
        <div className="flex items-center gap-1.5 font-black text-[#E31837] text-[11px] uppercase tracking-wider italic">
          <span>Costco</span>
        </div>
      );
    case "Home Depot":
      return (
        <div className="flex items-center gap-1.5 font-bold text-slate-805 text-xs">
          <span className="bg-[#F96302] text-white font-extrabold text-[8px] h-4 w-4 flex items-center justify-center rounded shrink-0">HD</span>
          <span>Home Depot</span>
        </div>
      );
    case "eBay":
      return (
        <div className="flex items-center gap-0.5 font-bold text-xs italic tracking-tight">
          <span className="text-[#E53238]">e</span>
          <span className="text-[#0064D2]">b</span>
          <span className="text-[#F5B100]">a</span>
          <span className="text-[#86B817]">y</span>
        </div>
      );
    default:
      return <span className="font-bold text-slate-805 text-xs">{name}</span>;
  }
};

// Component dictionary of products for matching details
interface ProductDetail {
  id: string;
  store: string;
  date: string;
  total: string;
  paymentMethod: string;
  ocrDesc: string;
  ocrSku: string;
  ocrUpc: string;
  ocrQty: number;
  ocrPrice: string;
  aiName: string;
  aiCategory: string;
  aiAsin: string;
  aiConfidence: number;
  aiIcon: string;
}

const mockProductDetails: Record<string, ProductDetail> = {
  "RCPT-WM-5038291": {
    id: "RCPT-WM-5038291",
    store: "Walmart",
    date: "May 26, 2025 10:24 AM",
    total: "$128.47",
    paymentMethod: "Visa **** 4242",
    ocrDesc: "Sony Wireless Over-Ear Headphones",
    ocrSku: "WH-1000XM5/B",
    ocrUpc: "027242922733",
    ocrQty: 1,
    ocrPrice: "$128.47",
    aiName: "Sony WH-1000XM5",
    aiCategory: "Wireless Headphones",
    aiAsin: "B09XS7JWHH",
    aiConfidence: 96,
    aiIcon: "🎧"
  },
  "RCPT-BB-6182739": {
    id: "RCPT-BB-6182739",
    store: "Best Buy",
    date: "May 26, 2025 09:58 AM",
    total: "$349.99",
    paymentMethod: "Mastercard **** 8821",
    ocrDesc: "Sony Wireless Headset Black",
    ocrSku: "WH-1000XM5/B",
    ocrUpc: "027242922733",
    ocrQty: 1,
    ocrPrice: "$349.99",
    aiName: "Sony WH-1000XM5",
    aiCategory: "Wireless Headphones",
    aiAsin: "B09XS7JWHH",
    aiConfidence: 88,
    aiIcon: "🎧"
  },
  "RCPT-AM-29291032": {
    id: "RCPT-AM-29291032",
    store: "Amazon",
    date: "May 25, 2025 08:41 PM",
    total: "$89.99",
    paymentMethod: "Visa **** 4242",
    ocrDesc: "Sony Wireless Headphones",
    ocrSku: "WH-CH720N",
    ocrUpc: "027242926816",
    ocrQty: 1,
    ocrPrice: "$89.99",
    aiName: "Sony WH-CH720N",
    aiCategory: "Wireless Headphones Black",
    aiAsin: "B0BZX4NQ7F",
    aiConfidence: 62,
    aiIcon: "🎧"
  },
  "RCPT-TG-4029184": {
    id: "RCPT-TG-4029184",
    store: "Target",
    date: "May 25, 2025 04:22 PM",
    total: "$67.34",
    paymentMethod: "RedCard **** 9012",
    ocrDesc: "Bose Wireless Headphones",
    ocrSku: "QC45-WHT",
    ocrUpc: "017817825405",
    ocrQty: 1,
    ocrPrice: "$67.34",
    aiName: "Bose QuietComfort 45",
    aiCategory: "Wireless Headphones",
    aiAsin: "B098FH5P3C",
    aiConfidence: 34,
    aiIcon: "🎧"
  },
  "RCPT-CT-2801291": {
    id: "RCPT-CT-2801291",
    store: "Costco",
    date: "May 24, 2025 02:13 PM",
    total: "$563.22",
    paymentMethod: "Visa **** 5431",
    ocrDesc: "Apple AirPods Max Space Gray",
    ocrSku: "MGYH3AM/A",
    ocrUpc: "190199312906",
    ocrQty: 1,
    ocrPrice: "$563.22",
    aiName: "Apple AirPods Max",
    aiCategory: "Over-Ear Headphones",
    aiAsin: "B08P5GK39Q",
    aiConfidence: 91,
    aiIcon: "🎧"
  },
  "RCPT-HD-2019837": {
    id: "RCPT-HD-2019837",
    store: "Home Depot",
    date: "May 24, 2025 11:07 AM",
    total: "$214.16",
    paymentMethod: "Amex **** 3009",
    ocrDesc: "DEWALT Cordless Drill Kit",
    ocrSku: "DCD771C2",
    ocrUpc: "885911333333",
    ocrQty: 1,
    ocrPrice: "$214.16",
    aiName: "DEWALT 20V MAX Drill",
    aiCategory: "Cordless Power Drill",
    aiAsin: "B00GDGDW22",
    aiConfidence: 48,
    aiIcon: "🔨"
  },
  "RCPT-EB-77120182": {
    id: "RCPT-EB-77120182",
    store: "eBay",
    date: "May 23, 2025 07:52 PM",
    total: "$28.00",
    paymentMethod: "PayPal **** 5022",
    ocrDesc: "Anker Q30 Wireless Headset",
    ocrSku: "A3028011",
    ocrUpc: "194644022440",
    ocrQty: 1,
    ocrPrice: "$28.00",
    aiName: "Anker Soundcore Life Q30",
    aiCategory: "Wireless Headphones",
    aiAsin: "B08HMWZBXC",
    aiConfidence: 28,
    aiIcon: "🎧"
  }
};

export default function ProductMatchReview() {
  const [selectedId, setSelectedId] = useState<string>("RCPT-AM-29291032"); // default to Needs Review item in screenshot
  const [activeTab, setActiveTab] = useState<"All" | "High" | "Needs" | "Low" | "Manual">("Needs");
  const [showRightPane, setShowRightPane] = useState<boolean>(true);
  const [actionOption, setActionOption] = useState<"confirm" | "select" | "nomatch">("confirm");
  const [noteText, setNoteText] = useState("");

  const details = mockProductDetails[selectedId] || mockProductDetails["RCPT-AM-29291032"];

  const initialRows = [
    { id: "RCPT-WM-5038291", subId: "#84930291", store: "Walmart", date: "May 26, 2025 10:24 AM", aiProduct: "Sony WH-1000XM5", aiSub: "Wireless Headphones", total: "$128.47", status: "High Confidence", confidence: 96, icon: "🎧" },
    { id: "RCPT-BB-6182739", subId: "#73519281", store: "Best Buy", date: "May 26, 2025 09:58 AM", aiProduct: "Sony WH-1000XM5", aiSub: "Wireless Headphones", total: "$349.99", status: "High Confidence", confidence: 88, icon: "🎧" },
    { id: "RCPT-AM-29291032", subId: "#82930122", store: "Amazon", date: "May 25, 2025 08:41 PM", aiProduct: "Sony WH-CH720N", aiSub: "Wireless Headphones", total: "$89.99", status: "Needs Review", confidence: 62, icon: "🎧" },
    { id: "RCPT-TG-4029184", subId: "#19283746", store: "Target", date: "May 25, 2025 04:22 PM", aiProduct: "Bose QuietComfort 45", aiSub: "Wireless Headphones", total: "$67.34", status: "Low Confidence", confidence: 34, icon: "🎧" },
    { id: "RCPT-CT-2801291", subId: "#39102847", store: "Costco", date: "May 24, 2025 02:13 PM", aiProduct: "Apple AirPods Max", aiSub: "Over-Ear Headphones", total: "$563.22", status: "High Confidence", confidence: 91, icon: "🎧" },
    { id: "RCPT-HD-2019837", subId: "#82746591", store: "Home Depot", date: "May 24, 2025 11:07 AM", aiProduct: "DEWALT 20V MAX Drill", aiSub: "Cordless Power Drill", total: "$214.16", status: "Needs Review", confidence: 48, icon: "🔨" },
    { id: "RCPT-EB-77120182", subId: "#88726511", store: "eBay", date: "May 23, 2025 07:52 PM", aiProduct: "Anker Soundcore Life Q30", aiSub: "Wireless Headphones", total: "$28.00", status: "Low Confidence", confidence: 28, icon: "🎧" }
  ];

  const getConfidenceBadgeColor = (conf: number) => {
    if (conf >= 90) return "text-emerald-700 bg-emerald-50 border border-emerald-200/50";
    if (conf >= 60) return "text-amber-700 bg-amber-50 border border-amber-200/50";
    return "text-rose-700 bg-rose-50 border border-rose-200/50";
  };

  const getStatusBadgeColor = (status: string) => {
    if (status === "Low Confidence") return "text-rose-700 bg-rose-50 border border-rose-250";
    if (status === "Needs Review") return "text-amber-700 bg-amber-50 border border-amber-250";
    return "text-emerald-700 bg-emerald-50 border border-emerald-250";
  };

  return (
    <div className="bg-slate-50 min-h-full w-full font-sans pb-4">
      <div className="w-full max-w-full px-2 sm:px-4 md:px-5 py-5 space-y-5">
        

        {/* Title Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Product Match Review
              </h1>
              <span className="h-4.5 w-4.5 rounded-full border border-slate-350 flex items-center justify-center text-[10px] font-bold text-slate-450 cursor-help" title="Product Match Review Help">i</span>
            </div>
            <p className="text-xs sm:text-[13px] text-slate-550 mt-1 select-none">
              Review AI matched products and confirm or correct matches to improve accuracy.
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
              Bulk Actions <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Left Table Section */}
          <div className={cn("min-w-0 space-y-4", showRightPane ? "lg:col-span-9" : "lg:col-span-12")}>
            
            {/* KPI Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              
              {/* Card 1: Total to Review */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-indigo-50 border border-indigo-100/50 text-[#4F46E5] flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total to Review</span>
                  <span className="text-xl font-black text-slate-900 leading-none mt-1.5 block">1,248</span>
                  <span className="text-[10px] text-slate-500 block mt-1.5 whitespace-nowrap">
                    <span className="text-rose-600 font-bold">↓ 12.4%</span> vs 7d
                  </span>
                </div>
              </div>

              {/* Card 2: High Confidence */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-emerald-50 border border-emerald-100/50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">High Confidence</span>
                  <span className="text-xl font-black text-slate-900 leading-none mt-1.5 block">842</span>
                  <span className="text-[10px] text-slate-500 font-bold block mt-1.5">
                    67.6%
                  </span>
                </div>
              </div>

              {/* Card 3: Needs Review */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-amber-50 border border-amber-100/50 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Needs Review</span>
                  <span className="text-xl font-black text-slate-900 leading-none mt-1.5 block">286</span>
                  <span className="text-[10px] text-slate-500 font-bold block mt-1.5">
                    22.9%
                  </span>
                </div>
              </div>

              {/* Card 4: Low Confidence */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-rose-50 border border-rose-100/50 text-rose-600 flex items-center justify-center shrink-0">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Low Confidence</span>
                  <span className="text-xl font-black text-slate-900 leading-none mt-1.5 block">120</span>
                  <span className="text-[10px] text-slate-500 font-bold block mt-1.5">
                    9.6%
                  </span>
                </div>
              </div>

              {/* Card 5: Manual Match */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-blue-50 border border-blue-100/50 text-blue-600 flex items-center justify-center shrink-0">
                  <Plus className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Manual Match</span>
                  <span className="text-xl font-black text-slate-900 leading-none mt-1.5 block">64</span>
                  <span className="text-[10px] text-slate-500 font-bold block mt-1.5">
                    5.1%
                  </span>
                </div>
              </div>

            </div>
            
            {/* Tabs & Filters Group Container */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-4 select-none">
              
              {/* Tab options */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 gap-2">
                <div className="flex items-center gap-6 text-xs font-bold overflow-x-auto whitespace-nowrap pb-1 scrollbar-none w-full">
                  <button 
                    onClick={() => setActiveTab("All")}
                    className={cn("pb-2 border-b-2 transition-colors", activeTab === "All" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
                  >
                    All (1,248)
                  </button>
                  <button 
                    onClick={() => setActiveTab("High")}
                    className={cn("pb-2 border-b-2 transition-colors", activeTab === "High" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
                  >
                    High Confidence (842)
                  </button>
                  <button 
                    onClick={() => setActiveTab("Needs")}
                    className={cn("pb-2 border-b-2 transition-colors", activeTab === "Needs" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
                  >
                    Needs Review (286)
                  </button>
                  <button 
                    onClick={() => setActiveTab("Low")}
                    className={cn("pb-2 border-b-2 transition-colors", activeTab === "Low" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
                  >
                    Low Confidence (120)
                  </button>
                  <button 
                    onClick={() => setActiveTab("Manual")}
                    className={cn("pb-2 border-b-2 transition-colors", activeTab === "Manual" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
                  >
                    Manual Match (64)
                  </button>
                </div>
              </div>

              {/* Filters dropdowns row */}
              <div className="flex flex-wrap items-center gap-3">
                
                {/* Match Status */}
                <div className="flex flex-col gap-1 w-full sm:w-[130px]">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Match Status</span>
                  <div className="relative">
                    <select className="w-full appearance-none bg-slate-50/50 hover:bg-slate-55 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer transition">
                      <option>All Statuses</option>
                      <option>High Confidence</option>
                      <option>Needs Review</option>
                      <option>Low Confidence</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Confidence */}
                <div className="flex flex-col gap-1 w-full sm:w-[130px]">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Confidence</span>
                  <div className="relative">
                    <select className="w-full appearance-none bg-slate-50/50 hover:bg-slate-55 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer transition">
                      <option>All Levels</option>
                      <option>High (&gt;80%)</option>
                      <option>Medium (60%-79%)</option>
                      <option>Low (&lt;60%)</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Source */}
                <div className="flex flex-col gap-1 w-full sm:w-[130px]">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Source</span>
                  <div className="relative">
                    <select className="w-full appearance-none bg-slate-50/50 hover:bg-slate-55 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer transition">
                      <option>All Sources</option>
                      <option>AI Parser</option>
                      <option>Manual Upload</option>
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
                      <option>eBay</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Date Range */}
                <div className="flex flex-col gap-1 w-full sm:w-[190px]">
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

                {/* Clear All link */}
                <button className="text-xs font-bold text-[#4F46E5] hover:text-[#4338CA] transition mt-4 sm:mt-0 sm:self-end sm:mb-1.5 ml-auto">
                  Clear All
                </button>
              </div>

            </div>

            {/* Product Match Review Table */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[780px] text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/60 border-b border-slate-150 text-slate-450 font-bold uppercase tracking-wider text-[10px] select-none">
                      <th className="py-3 px-4 w-[5%] text-center">
                        <input type="checkbox" className="rounded border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5 cursor-pointer" />
                      </th>
                      <th className="py-3 px-4 w-[22%] font-bold">Receipt ID</th>
                      <th className="py-3 px-4 w-[15%] font-bold">Store</th>
                      <th className="py-3 px-4 w-[16%] font-bold">Date</th>
                      <th className="py-3 px-4 w-[22%] font-bold">AI Matched Product</th>
                      <th className="py-3 px-4 w-[10%] font-bold">Confidence</th>
                      <th className="py-3 px-4 w-[15%] font-bold">Match Status</th>
                      <th className="py-3 px-4 w-[5%] text-center font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {initialRows.map((row) => {
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
                            <div className="leading-tight">
                              <span className="font-bold text-slate-900 block">{row.id}</span>
                              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{row.subId}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <RetailerLogo name={row.store} />
                          </td>
                          <td className="py-4 px-4 text-slate-500 font-medium">
                            <div className="leading-tight">
                              <span className="font-bold text-slate-900 block">{row.date.split(" ").slice(0, 3).join(" ")}</span>
                              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{row.date.split(" ").slice(3).join(" ")}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <span className="h-8 w-8 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center text-sm shrink-0">
                                {row.icon}
                              </span>
                              <div className="leading-tight min-w-0">
                                <span className="font-bold text-slate-900 truncate block" title={row.aiProduct}>{row.aiProduct}</span>
                                <span className="text-[10px] text-slate-400 font-medium block mt-0.5 truncate">{row.aiSub}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 select-none">
                            <span className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-extrabold leading-none", getConfidenceBadgeColor(row.confidence))}>
                              {row.confidence}%
                            </span>
                          </td>
                          <td className="py-4 px-4 select-none">
                            <span className={cn("inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-extrabold tracking-wide uppercase leading-none", getStatusBadgeColor(row.status))}>
                              {row.status}
                            </span>
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
                  Showing 1 to 10 of 1,248 results
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
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-400">
                      &lt;
                    </button>
                    <button className="h-8 w-8 rounded-lg bg-[#4F46E5] text-white flex items-center justify-center text-xs font-black shadow-sm">
                      1
                    </button>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-50 transition text-slate-600">
                      2
                    </button>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-50 transition text-slate-600">
                      3
                    </button>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-50 transition text-slate-600">
                      4
                    </button>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-50 transition text-slate-600">
                      5
                    </button>
                    <span className="px-1 text-slate-350 text-xs">...</span>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-50 transition text-slate-600">
                      125
                    </button>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-400">
                      &gt;
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Match Details Panel */}
          {showRightPane && (
            <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4 relative min-w-0">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 select-none">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-slate-800">Review Match</h2>
                  <span className="inline-flex items-center rounded bg-amber-50 px-1.5 py-0.5 text-[9px] font-extrabold tracking-wide uppercase leading-none text-amber-700 border border-amber-250">
                    Needs Review
                  </span>
                </div>
                <button 
                  onClick={() => setShowRightPane(false)}
                  className="h-6 w-6 rounded-md hover:bg-slate-100 flex items-center justify-center text-slate-450 hover:text-slate-700 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Receipt Info Panel & Thumbnail */}
              <div className="bg-slate-50/70 border border-slate-150 rounded-xl p-3 flex items-start justify-between gap-3 text-xs">
                <div className="space-y-1.5 font-semibold text-slate-700">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Receipt Information</span>
                  <div className="grid grid-cols-[90px_1fr] gap-x-2 gap-y-0.5">
                    <span className="text-slate-450 font-bold">Receipt ID</span>
                    <span className="text-slate-900 font-bold">{details.id}</span>
                    <span className="text-slate-450 font-bold">Store</span>
                    <span>{details.store}</span>
                    <span className="text-slate-450 font-bold">Date</span>
                    <span>{details.date}</span>
                    <span className="text-slate-450 font-bold">Total Amount</span>
                    <span className="text-slate-900 font-bold">{details.total}</span>
                    <span className="text-slate-450 font-bold">Payment Method</span>
                    <span>{details.paymentMethod}</span>
                  </div>
                </div>
                
                {/* Mock tiny receipt image thumbnail */}
                <div className="h-16 w-11 border border-slate-200 bg-white rounded shadow-3xs p-1 flex flex-col justify-between shrink-0 font-mono text-[4px] leading-none select-none">
                  <div className="text-center font-bold scale-[0.8] origin-top">{details.store}</div>
                  <div className="w-full h-px bg-slate-200 my-0.5" />
                  <div className="space-y-0.5 font-semibold scale-[0.8] origin-top text-slate-400">
                    <div>ITEM 1   $XX.XX</div>
                    <div>ITEM 2   $XX.XX</div>
                  </div>
                  <div className="w-full h-2 bg-slate-950 flex items-center mt-1 scale-y-[0.5]">
                    <div className="w-full h-full bg-[linear-gradient(90deg,#000_1px,transparent_1px,#000_2px,transparent_3px)]"></div>
                  </div>
                </div>
              </div>

              {/* AI Matched Product Details Card */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold pb-1 border-b border-slate-100 select-none">
                  <span className="text-slate-800">AI Matched Product</span>
                  <span className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-[9px] font-extrabold leading-none", getConfidenceBadgeColor(details.aiConfidence))}>
                    {details.aiConfidence}% Confidence
                  </span>
                </div>

                <div className="flex gap-3 bg-slate-50/50 p-2.5 border border-slate-200 rounded-xl items-start">
                  <span className="h-12 w-12 bg-white border border-slate-150 rounded-lg flex items-center justify-center text-2xl shrink-0 shadow-3xs">
                    {details.aiIcon}
                  </span>
                  <div className="leading-tight min-w-0 font-semibold text-xs text-slate-700">
                    <span className="font-extrabold text-slate-950 block text-[13px] tracking-tight">{details.aiName}</span>
                    <span className="text-slate-450 font-medium block mt-0.5">{details.aiCategory}</span>
                    <span className="text-[10px] text-slate-400 font-medium block mt-1">ASIN: {details.aiAsin}</span>
                    
                    <button className="text-[10px] font-bold text-[#4F46E5] hover:text-[#4338CA] transition inline-flex items-center gap-0.5 mt-2 select-none">
                      <span>View on Amazon</span>
                      <ExternalLink className="h-2.5 w-2.5 text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Extracted From Receipt (OCR) Block */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider select-none">Extracted From Receipt (OCR)</span>
                
                <div className="grid grid-cols-[110px_1fr] gap-x-2 gap-y-2 text-xs font-semibold text-slate-700">
                  <span className="text-slate-450 font-medium">Description</span>
                  <span className="text-slate-900">{details.ocrDesc}</span>

                  <span className="text-slate-455 font-medium">Model / SKU</span>
                  <span className="text-slate-800">{details.ocrSku}</span>

                  <span className="text-slate-455 font-medium">UPC / EAN</span>
                  <span className="text-slate-800">{details.ocrUpc}</span>

                  <span className="text-slate-455 font-medium">Quantity</span>
                  <span className="text-slate-800">{details.ocrQty}</span>

                  <span className="text-slate-455 font-medium">Price</span>
                  <span className="text-slate-950 font-bold">{details.ocrPrice}</span>
                </div>
              </div>

              {/* Your Action Block */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider select-none">Your Action</span>
                
                <div className="space-y-2 select-none">
                  {/* Option 1: Confirm Match */}
                  <label className={cn(
                    "flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-colors",
                    actionOption === "confirm" ? "bg-indigo-50/30 border-indigo-250 text-indigo-950" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50/50"
                  )}>
                    <input 
                      type="radio" 
                      name="matchAction"
                      checked={actionOption === "confirm"}
                      onChange={() => setActionOption("confirm")}
                      className="mt-0.5 text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5 cursor-pointer"
                    />
                    <div className="text-xs leading-tight font-bold">
                      <span>Confirm Match</span>
                      <span className="text-[10px] text-slate-450 font-medium block mt-0.5">This is the correct product.</span>
                    </div>
                  </label>

                  {/* Option 2: Select Different Product */}
                  <label className={cn(
                    "flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-colors",
                    actionOption === "select" ? "bg-indigo-50/30 border-indigo-250 text-indigo-950" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50/50"
                  )}>
                    <input 
                      type="radio" 
                      name="matchAction"
                      checked={actionOption === "select"}
                      onChange={() => setActionOption("select")}
                      className="mt-0.5 text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5 cursor-pointer"
                    />
                    <div className="text-xs leading-tight font-bold">
                      <span>Select Different Product</span>
                      <span className="text-[10px] text-slate-455 font-medium block mt-0.5">Choose the correct product from our catalog.</span>
                    </div>
                  </label>

                  {/* Option 3: No Match */}
                  <label className={cn(
                    "flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-colors",
                    actionOption === "nomatch" ? "bg-indigo-50/30 border-indigo-250 text-indigo-950" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50/50"
                  )}>
                    <input 
                      type="radio" 
                      name="matchAction"
                      checked={actionOption === "nomatch"}
                      onChange={() => setActionOption("nomatch")}
                      className="mt-0.5 text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5 cursor-pointer"
                    />
                    <div className="text-xs leading-tight font-bold">
                      <span>No Match</span>
                      <span className="text-[10px] text-slate-455 font-medium block mt-0.5">This product is not in our catalog.</span>
                    </div>
                  </label>
                </div>

                {/* Optional notes input */}
                <input
                  type="text"
                  placeholder="Add a note (optional)"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-xs font-semibold text-slate-700 outline-none focus:border-[#4F46E5] transition placeholder:text-slate-350"
                />
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-slate-100 space-y-3 select-none">
                <div className="flex gap-2">
                  <button className="flex-1 py-2 border border-slate-250 hover:bg-slate-50 text-xs font-bold text-slate-700 rounded-lg transition shadow-2xs">
                    Skip
                  </button>
                  <button className="flex-1 py-2 bg-indigo-50/10 hover:bg-indigo-50/30 border border-indigo-250 text-xs font-bold text-[#4F46E5] rounded-lg transition">
                    Save & Next
                  </button>
                  <button className="flex-1 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold rounded-lg shadow-sm transition">
                    Save
                  </button>
                </div>
                
                {/* Footer audit notice */}
                <div className="flex items-center justify-center gap-1.5 text-[9px] font-bold text-slate-400">
                  <Lock className="h-3.5 w-3.5 text-slate-350" />
                  <span>All changes are logged for audit and compliance.</span>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
