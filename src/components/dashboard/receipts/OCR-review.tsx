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
  ChevronRight,
  Download,
  Upload,
  Filter,
  Eye,
  MoreVertical,
  X,
  Check,
  Plus,
  ArrowUpRight,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Retailer Logo component matching receipts-admin.tsx and adding Home Depot
const RetailerLogo = ({ name }: { name: string }) => {
  switch (name) {
    case "Walmart":
      return (
        <div className="flex items-center gap-1.5 font-bold text-slate-850 text-xs">
          <span className="text-[#FFC220] font-bold text-sm leading-none">✳</span>
          <span>Walmart</span>
        </div>
      );
    case "Target":
      return (
        <div className="flex items-center gap-1.5 font-bold text-slate-850 text-xs">
          <span className="w-3.5 h-3.5 rounded-full border-[3px] border-[#CC0000] flex items-center justify-center shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CC0000]"></span>
          </span>
          <span>Target</span>
        </div>
      );
    case "Best Buy":
      return (
        <div className="flex items-center gap-1.5 font-bold text-slate-850 text-xs">
          <span className="bg-[#FFF200] text-black px-1.5 py-0.5 rounded font-black text-[9px] tracking-tighter">BEST BUY</span>
        </div>
      );
    case "Amazon":
      return (
        <div className="flex items-center gap-1.5 font-bold text-slate-850 text-xs">
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
        <div className="flex items-center gap-1.5 font-bold text-slate-850 text-xs">
          <span className="bg-[#F96302] text-white font-extrabold text-[8px] h-4 w-4 flex items-center justify-center rounded shrink-0">HD</span>
          <span>Home Depot</span>
        </div>
      );
    default:
      return <span className="font-bold text-slate-850 text-xs">{name}</span>;
  }
};

// Main component implementation
export default function OCRReview() {
  // Mock items inside receipt details
  const mockReceiptDetails: Record<string, {
    retailer: string;
    address: string;
    phone: string;
    date: string;
    time: string;
    total: string;
    tax: string;
    paymentMethod: string;
    confidence: number;
    items: Array<{ name: string; qty: number; price: number; confidence: number }>;
  }> = {
    "RCPT-WM-5038291": {
      retailer: "Walmart",
      address: "1234 Main St, Dallas, TX 75201",
      phone: "(214) 555-0198",
      date: "05/26/2025",
      time: "10:24 AM",
      total: "$392.47",
      tax: "$8.61",
      paymentMethod: "Visa **** 4242",
      confidence: 92,
      items: [
        { name: "Sony WH-1000XM5 Headphones", qty: 1, price: 349.99, confidence: 95 },
        { name: "USB-C Cable (1m)", qty: 1, price: 9.99, confidence: 90 },
        { name: "SanDisk 128GB Extreme SD Card", qty: 1, price: 23.88, confidence: 85 },
      ]
    },
    "RCPT-BB-6182739": {
      retailer: "Best Buy",
      address: "8825 Central Expy, Dallas, TX 75231",
      phone: "(214) 555-0120",
      date: "05/26/2025",
      time: "09:58 AM",
      total: "$349.99",
      tax: "$28.87",
      paymentMethod: "Mastercard **** 8821",
      confidence: 88,
      items: [
        { name: "Bose QuietComfort Headphones", qty: 1, price: 319.99, confidence: 89 },
        { name: "Charging Adapter 30W", qty: 1, price: 30.00, confidence: 85 }
      ]
    },
    "RCPT-AM-29291032": {
      retailer: "Amazon",
      address: "Online Purchase",
      phone: "N/A",
      date: "05/25/2025",
      time: "08:41 PM",
      total: "$89.99",
      tax: "$7.42",
      paymentMethod: "Visa **** 1198",
      confidence: 76,
      items: [
        { name: "Echo Dot 5th Gen", qty: 2, price: 39.99, confidence: 78 },
        { name: "Smart Plug IoT", qty: 1, price: 10.00, confidence: 72 }
      ]
    },
    "RCPT-TG-4029184": {
      retailer: "Target",
      address: "6419 Skillman St, Dallas, TX 75231",
      phone: "(214) 555-0145",
      date: "05/25/2025",
      time: "04:22 PM",
      total: "$67.34",
      tax: "$5.55",
      paymentMethod: "Target RedCard **** 9012",
      confidence: 61,
      items: [
        { name: "Wireless Mouse Classic", qty: 1, price: 45.00, confidence: 65 },
        { name: "AA Batteries 12-Pack", qty: 1, price: 12.34, confidence: 58 },
        { name: "Notebook College Ruled", qty: 2, price: 5.00, confidence: 60 }
      ]
    },
    "RCPT-CT-2801291": {
      retailer: "Costco",
      address: "8055 Churchill Way, Dallas, TX 75251",
      phone: "(214) 555-0160",
      date: "05/24/2025",
      time: "02:13 PM",
      total: "$563.22",
      tax: "$46.46",
      paymentMethod: "Visa **** 5431",
      confidence: 90,
      items: [
        { name: "Kirkland Signature Detergent", qty: 1, price: 29.99, confidence: 92 },
        { name: "Apple iPad Pro 11-inch", qty: 1, price: 499.99, confidence: 91 },
        { name: "Paper Towels 12-Rolls", qty: 1, price: 33.24, confidence: 86 }
      ]
    },
    "RCPT-HD-2019837": {
      retailer: "Home Depot",
      address: "11468 Forest Ln, Dallas, TX 75230",
      phone: "(214) 555-0111",
      date: "05/24/2025",
      time: "11:07 AM",
      total: "$214.16",
      tax: "$17.66",
      paymentMethod: "Amex **** 3009",
      confidence: 55,
      items: [
        { name: "Cordless Drill Driver Kit", qty: 1, price: 179.00, confidence: 56 },
        { name: "Screwdriver Set 10pc", qty: 1, price: 25.16, confidence: 53 },
        { name: "Painter's Tape Premium", qty: 2, price: 5.00, confidence: 55 }
      ]
    }
  };

  const initialRows = [
    { id: "RCPT-WM-5038291", subId: "#84930291", store: "Walmart", date: "May 26, 2025 10:24 AM", total: "$128.47", status: "Pending Review", confidence: 92 },
    { id: "RCPT-BB-6182739", subId: "#73519281", store: "Best Buy", date: "May 26, 2025 09:58 AM", total: "$349.99", status: "Pending Review", confidence: 88 },
    { id: "RCPT-AM-29291032", subId: "#82930122", store: "Amazon", date: "May 25, 2025 08:41 PM", total: "$89.99", status: "Pending Review", confidence: 76 },
    { id: "RCPT-TG-4029184", subId: "#19283746", store: "Target", date: "May 25, 2025 04:22 PM", total: "$67.34", status: "Need Correction", confidence: 61 },
    { id: "RCPT-CT-2801291", subId: "#39102847", store: "Costco", date: "May 24, 2025 02:13 PM", total: "$563.22", status: "Pending Review", confidence: 90 },
    { id: "RCPT-HD-2019837", subId: "#82746591", store: "Home Depot", date: "May 24, 2025 11:07 AM", total: "$214.16", status: "Need Correction", confidence: 55 },
  ];

  const [selectedId, setSelectedId] = useState<string>("RCPT-WM-5038291");
  const [activeTab, setActiveTab] = useState<"All" | "Pending" | "Needs Correction" | "Approved">("Pending");
  const [rightActiveTab, setRightActiveTab] = useState<"Items" | "Summary">("Items");
  const [showRightPane, setShowRightPane] = useState<boolean>(true);

  // Editable values for fields in Right pane
  const details = mockReceiptDetails[selectedId] || mockReceiptDetails["RCPT-WM-5038291"];
  const detailsStatus = initialRows.find(r => r.id === selectedId)?.status || "Pending Review";
  const [editableStore, setEditableStore] = useState(details.retailer);
  const [editableDate, setEditableDate] = useState(details.date);
  const [editableTime, setEditableTime] = useState(details.time);
  const [editableTotal, setEditableTotal] = useState(details.total);
  const [editableTax, setEditableTax] = useState(details.tax);
  const [editablePayment, setEditablePayment] = useState(details.paymentMethod);

  // Update edit fields when selected receipt changes
  const handleRowSelect = (id: string) => {
    setSelectedId(id);
    const newDetails = mockReceiptDetails[id];
    if (newDetails) {
      setEditableStore(newDetails.retailer);
      setEditableDate(newDetails.date);
      setEditableTime(newDetails.time);
      setEditableTotal(newDetails.total);
      setEditableTax(newDetails.tax);
      setEditablePayment(newDetails.paymentMethod);
    }
  };

  const getConfidenceBadgeColor = (conf: number) => {
    if (conf >= 90) return "text-emerald-700 bg-emerald-50 border border-emerald-200/50";
    if (conf >= 70) return "text-amber-700 bg-amber-50 border border-amber-200/50";
    return "text-rose-700 bg-rose-50 border border-rose-200/50";
  };

  const getStatusBadgeColor = (status: string) => {
    if (status === "Need Correction") return "text-rose-700 bg-rose-50 border border-rose-250";
    if (status === "Pending Review") return "text-amber-700 bg-amber-50 border border-amber-250";
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
                OCR Review
              </h1>
              <span className="h-4.5 w-4.5 rounded-full border border-slate-350 flex items-center justify-center text-[10px] font-bold text-slate-450 cursor-help" title="OCR Review Help">i</span>
            </div>
            <p className="text-xs sm:text-[13px] text-slate-500 mt-1 select-none">
              Review extracted data from receipts and approve or correct the information.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Total Receipts */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-indigo-50 border border-indigo-100/50 text-[#4F46E5] flex items-center justify-center shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Receipts</span>
              <span className="text-xl font-black text-slate-900 leading-none mt-1 block">1,248</span>
              <span className="text-[10px] text-slate-500 block mt-1">
                <span className="text-emerald-600 font-bold">↑ 14.6%</span> vs last 30 days
              </span>
            </div>
          </div>

          {/* Card 2: Pending Review */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-amber-50 border border-amber-100/50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pending Review</span>
              <span className="text-xl font-black text-slate-900 leading-none mt-1 block">132</span>
              <span className="text-[10px] text-slate-500 block mt-1">
                <span className="text-emerald-600 font-bold">↑ 11.2%</span> vs last 30 days
              </span>
            </div>
          </div>

          {/* Card 3: Approved */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-emerald-50 border border-emerald-100/50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Approved</span>
              <span className="text-xl font-black text-slate-900 leading-none mt-1 block">1,032</span>
              <span className="text-[10px] text-slate-500 block mt-1">
                <span className="text-emerald-600 font-bold">↑ 8.7%</span> vs last 30 days
              </span>
            </div>
          </div>

          {/* Card 4: Needs Correction */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-rose-50 border border-rose-100/50 text-rose-600 flex items-center justify-center shrink-0">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Needs Correction</span>
              <span className="text-xl font-black text-slate-900 leading-none mt-1 block">84</span>
              <span className="text-[10px] text-slate-500 block mt-1">
                <span className="text-rose-600 font-bold">↓ 6.3%</span> vs last 30 days
              </span>
            </div>
          </div>

        </div>

        {/* Main Grid Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Left Table Panel (8 columns if right pane open, else 12) */}
          <div className={cn("min-w-0 space-y-4", showRightPane ? "lg:col-span-8" : "lg:col-span-12")}>
               {/* Tabs & Filters Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-4 select-none">
              
              {/* Tabs & Sort row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 gap-2">
                <div className="flex items-center gap-6 text-xs font-bold overflow-x-auto whitespace-nowrap pb-1 scrollbar-none w-full">
                  <button 
                    onClick={() => setActiveTab("All")}
                    className={cn("pb-2 border-b-2 transition-colors", activeTab === "All" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
                  >
                    All (1,248)
                  </button>
                  <button 
                    onClick={() => setActiveTab("Pending")}
                    className={cn("pb-2 border-b-2 transition-colors", activeTab === "Pending" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
                  >
                    Pending (132)
                  </button>
                  <button 
                    onClick={() => setActiveTab("Needs Correction")}
                    className={cn("pb-2 border-b-2 transition-colors", activeTab === "Needs Correction" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
                  >
                    Needs Correction (84)
                  </button>
                  <button 
                    onClick={() => setActiveTab("Approved")}
                    className={cn("pb-2 border-b-2 transition-colors", activeTab === "Approved" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
                  >
                    Approved (1,032)
                  </button>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                  <span className="text-[10px] text-slate-400 font-bold">Sort by:</span>
                  <div className="relative">
                    <select className="appearance-none bg-transparent pl-1 pr-6 py-1 text-xs font-bold text-slate-800 outline-none cursor-pointer">
                      <option>Newest First</option>
                      <option>Confidence: High to Low</option>
                      <option>Confidence: Low to High</option>
                    </select>
                    <ChevronDown className="absolute right-0.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-505 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Filter Inputs Row */}
              <div className="flex flex-wrap items-center gap-3">
                
                {/* Store filter */}
                <div className="flex flex-col gap-1 w-full sm:w-[160px]">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Store</span>
                  <div className="relative">
                    <select className="w-full appearance-none bg-slate-50/50 hover:bg-slate-55 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer transition">
                      <option>All Stores</option>
                      <option>Walmart</option>
                      <option>Target</option>
                      <option>Best Buy</option>
                      <option>Amazon</option>
                      <option>Costco</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Status filter */}
                <div className="flex flex-col gap-1 w-full sm:w-[160px]">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Status</span>
                  <div className="relative">
                    <select className="w-full appearance-none bg-slate-50/50 hover:bg-slate-55 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer transition">
                      <option>All Statuses</option>
                      <option>Pending Review</option>
                      <option>Need Correction</option>
                      <option>Approved</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Date Range filter */}
                <div className="flex flex-col gap-1 w-full sm:w-[220px]">
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

                {/* Clear All button */}
                <button className="text-xs font-bold text-[#4F46E5] hover:text-[#4338CA] transition mt-4 sm:mt-0 sm:self-end sm:mb-1.5 ml-auto">
                  Clear All
                </button>
              </div>
            </div>

            {/* Receipts Table */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[750px] text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/60 border-b border-slate-150 text-slate-450 font-bold uppercase tracking-wider text-[10px] select-none">
                      <th className="py-3 px-4 w-[5%] text-center">
                        <input type="checkbox" className="rounded border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5 cursor-pointer" />
                      </th>
                      <th className="py-3 w-[25%] font-bold">Receipt</th>
                      <th className="py-3 w-[15%] font-bold">Store</th>
                      <th className="py-3 w-[18%] font-bold">Date</th>
                      <th className="py-3 w-[12%] font-bold">Total</th>
                      <th className="py-3 w-[15%] font-bold">Status</th>
                      <th className="py-3 w-[10%] font-bold">Confidence</th>
                      <th className="py-3 pr-4 w-[5%] text-center font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {initialRows.map((row) => {
                      const isSelected = selectedId === row.id;
                      return (
                        <tr 
                          key={row.id} 
                          onClick={() => handleRowSelect(row.id)}
                          className={cn(
                            "hover:bg-slate-50/50 transition-colors cursor-pointer",
                            isSelected ? "bg-indigo-50/40 hover:bg-indigo-50/60" : ""
                          )}
                        >
                          <td className="py-5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                            <input 
                              type="checkbox" 
                              checked={isSelected}
                              onChange={() => handleRowSelect(row.id)}
                              className="rounded border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5 cursor-pointer" 
                            />
                          </td>
                          <td className="py-5">
                            <div className="leading-tight">
                              <span className="font-bold text-slate-900 block">{row.id}</span>
                              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{row.subId}</span>
                            </div>
                          </td>
                          <td className="py-5">
                            <RetailerLogo name={row.store} />
                          </td>
                          <td className="py-5 text-slate-500 font-medium">
                            {row.date}
                          </td>
                          <td className="py-5 font-bold text-slate-800">
                            {row.total}
                          </td>
                          <td className="py-5 select-none">
                            <span className={cn("inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-extrabold tracking-wide uppercase leading-none", getStatusBadgeColor(row.status))}>
                              {row.status}
                            </span>
                          </td>
                          <td className="py-5 select-none">
                            <span className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-extrabold leading-none", getConfidenceBadgeColor(row.confidence))}>
                              {row.confidence}%
                            </span>
                          </td>
                          <td className="py-5 pr-4 text-center" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-center gap-1">
                              <button 
                                onClick={() => { handleRowSelect(row.id); setShowRightPane(true); }}
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
              <div className="px-5 py-4 border-t border-slate-100 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white text-slate-450 font-bold select-none">
                <span className="text-[11px] font-bold">
                  Showing 1 to 6 of 132 results
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
                    <span className="px-1 text-slate-350 text-xs">...</span>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-50 transition text-slate-600">
                      22
                    </button>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-400">
                      &gt;
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Details Panel (4 columns) */}
          {showRightPane && (
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 relative min-w-0">
              
              {/* Right Panel Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 select-none">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-slate-800">Receipt Details</h2>
                  <span className={cn("inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-extrabold tracking-wide uppercase leading-none", getStatusBadgeColor(detailsStatus))}>
                    {detailsStatus}
                  </span>
                </div>
                <button 
                  onClick={() => setShowRightPane(false)}
                  className="h-6 w-6 rounded-md hover:bg-slate-100 flex items-center justify-center text-slate-450 hover:text-slate-700 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Receipt Preview & Data Fields Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Mock Receipt Receipt UI */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-[9px] font-mono text-slate-700 space-y-3 shadow-2xs max-h-[360px] overflow-y-auto">
                  <div className="text-center space-y-1">
                    <div className="font-extrabold text-[13px] tracking-tighter text-slate-900 uppercase">
                      {details.retailer === "Walmart" ? "Walmart *" : details.retailer.toUpperCase()}
                    </div>
                    {details.retailer === "Walmart" && <div className="text-[7px] text-slate-400 font-bold">Save money. Live better.</div>}
                    <div className="text-[7px] text-slate-500 font-semibold leading-none mt-1">
                      {details.address}<br/>
                      {details.phone}
                    </div>
                  </div>

                  <div className="border-t border-dashed border-slate-300 my-1.5" />

                  <div className="space-y-1 font-semibold">
                    {details.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span className="truncate pr-1">{item.name}</span>
                        <span className="shrink-0">{item.qty}   ${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-dashed border-slate-300 my-1.5" />

                  <div className="space-y-0.5 font-bold">
                    <div className="flex justify-between text-slate-500">
                      <span>Subtotal</span>
                      <span>$383.86</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Tax</span>
                      <span>{details.tax}</span>
                    </div>
                    <div className="flex justify-between text-slate-900 text-[10px] font-extrabold pt-0.5 border-t border-dashed border-slate-300">
                      <span>Total</span>
                      <span>{details.total}</span>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-slate-300 my-1.5" />
                  
                  <div className="text-[7px] text-slate-500 leading-tight space-y-0.5">
                    <div>Visa **** 4242</div>
                    <div>Auth #: 01324B</div>
                    <div>{details.date} {details.time}</div>
                  </div>

                  <div className="text-center pt-2.5">
                    <button className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 hover:bg-slate-50 rounded text-slate-800 font-bold text-[8px] tracking-tight transition shadow-2xs select-none">
                      View Full Image <ArrowUpRight className="h-2.5 w-2.5 text-slate-400" />
                    </button>
                  </div>
                </div>

                {/* Extracted Data Fields Form */}
                <div className="space-y-2.5 min-w-0">
                  <div className="flex items-center justify-between text-[11px] font-bold pb-1 border-b border-slate-100 select-none">
                    <span className="text-slate-800">Extracted Data</span>
                    <span className="text-emerald-600 bg-emerald-50 px-1 rounded">Confidence: {details.confidence}%</span>
                  </div>

                  {/* Store input */}
                  <div className="space-y-0.5">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Store</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={editableStore}
                        onChange={(e) => setEditableStore(e.target.value)}
                        className="w-full bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-800 outline-none focus:border-indigo-500 transition" 
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 bg-emerald-500 text-white rounded-full flex items-center justify-center p-0.5"><Check className="h-3 w-3" /></span>
                    </div>
                  </div>

                  {/* Date input */}
                  <div className="space-y-0.5">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Date</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={editableDate}
                        onChange={(e) => setEditableDate(e.target.value)}
                        className="w-full bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-800 outline-none focus:border-indigo-500 transition" 
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 bg-emerald-500 text-white rounded-full flex items-center justify-center p-0.5"><Check className="h-3 w-3" /></span>
                    </div>
                  </div>

                  {/* Time input */}
                  <div className="space-y-0.5">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Time</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={editableTime}
                        onChange={(e) => setEditableTime(e.target.value)}
                        className="w-full bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-800 outline-none focus:border-indigo-500 transition" 
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 bg-emerald-500 text-white rounded-full flex items-center justify-center p-0.5"><Check className="h-3 w-3" /></span>
                    </div>
                  </div>

                  {/* Total amount input */}
                  <div className="space-y-0.5">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Total Amount</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={editableTotal}
                        onChange={(e) => setEditableTotal(e.target.value)}
                        className="w-full bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-800 outline-none focus:border-indigo-500 transition" 
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 bg-emerald-500 text-white rounded-full flex items-center justify-center p-0.5"><Check className="h-3 w-3" /></span>
                    </div>
                  </div>

                  {/* Tax input */}
                  <div className="space-y-0.5">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Tax</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={editableTax}
                        onChange={(e) => setEditableTax(e.target.value)}
                        className="w-full bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-800 outline-none focus:border-indigo-500 transition" 
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 bg-emerald-500 text-white rounded-full flex items-center justify-center p-0.5"><Check className="h-3 w-3" /></span>
                    </div>
                  </div>

                  {/* Payment Method input */}
                  <div className="space-y-0.5">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Payment Method</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={editablePayment}
                        onChange={(e) => setEditablePayment(e.target.value)}
                        className="w-full bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-800 outline-none focus:border-indigo-500 transition" 
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 bg-emerald-500 text-white rounded-full flex items-center justify-center p-0.5"><Check className="h-3 w-3" /></span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Items / Summary Tabs inside Right Panel */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-4 text-xs font-bold border-b border-slate-100 pb-1.5 select-none">
                  <button 
                    onClick={() => setRightActiveTab("Items")}
                    className={cn("pb-1.5 border-b-2 transition-colors", rightActiveTab === "Items" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-450 hover:text-slate-700")}
                  >
                    Items ({details.items.length})
                  </button>
                  <button 
                    onClick={() => setRightActiveTab("Summary")}
                    className={cn("pb-1.5 border-b-2 transition-colors", rightActiveTab === "Summary" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-450 hover:text-slate-700")}
                  >
                    Summary
                  </button>
                </div>

                {rightActiveTab === "Items" ? (
                  <div className="space-y-3">
                    {/* Items table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-[11px] text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50/80 text-slate-400 font-bold uppercase tracking-wider text-[9px] border-b border-slate-150">
                            <th className="py-2 pl-2">Item</th>
                            <th className="py-2 text-center">Qty</th>
                            <th className="py-2 text-right">Price</th>
                            <th className="py-2 text-right">Total</th>
                            <th className="py-2 pr-2 text-center">Confidence</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                          {details.items.map((item, index) => (
                            <tr key={index} className="hover:bg-slate-50/20">
                              <td className="py-2 pl-2 text-slate-950 font-bold truncate max-w-[120px]" title={item.name}>{item.name}</td>
                              <td className="py-2 text-center">{item.qty}</td>
                              <td className="py-2 text-right">${item.price.toFixed(2)}</td>
                              <td className="py-2 text-right">${(item.qty * item.price).toFixed(2)}</td>
                              <td className="py-2 pr-2 text-center select-none">
                                <span className={cn("px-1 py-0.5 rounded text-[8px] font-extrabold leading-none inline-block min-w-[30px]", getConfidenceBadgeColor(item.confidence))}>
                                  {item.confidence}%
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Add Missing Item Link */}
                    <button className="text-xs font-bold text-[#4F46E5] hover:text-[#4338CA] transition inline-flex items-center gap-1 select-none">
                      <Plus className="h-3.5 w-3.5" /> Add Missing Item
                    </button>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 font-medium leading-relaxed p-2 bg-slate-50 border border-slate-150 rounded-lg">
                    This receipt contains <strong>{details.items.length} items</strong> with an overall OCR extraction confidence score of <strong>{details.confidence}%</strong>.
                    Store address matched database records, card validation checksum verified.
                  </div>
                )}
              </div>

              {/* Right Panel Footer Action buttons */}
              <div className="pt-4 border-t border-slate-100 space-y-3 select-none">
                <div className="grid grid-cols-2 gap-3">
                  <button className="w-full py-2 border border-rose-350 hover:bg-rose-50 text-xs font-bold text-rose-600 rounded-lg transition shadow-2xs">
                    Needs Correction
                  </button>
                  <button className="w-full py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold rounded-lg shadow-sm transition">
                    Approve Receipt
                  </button>
                </div>
                
                {/* Audit & Compliance log text */}
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
