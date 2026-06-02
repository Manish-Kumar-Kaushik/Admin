"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  XCircle,
  Edit3,
  Calendar,
  AlertTriangle,
  Clock,
  Search,
  Download,
  RefreshCw,
  SlidersHorizontal,
  ChevronDown,
  MoreVertical,
  Plus,
  Info
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts";

// Mock Data
const METRICS = [
  {
    title: "Total Rejected",
    value: "94",
    trend: "18.2% vs last 7 days",
    trendUp: true,
    icon: <XCircle className="w-6 h-6 text-rose-600" />,
    bg: "bg-white",
    iconBg: "bg-rose-50 border-rose-100",
  },
  {
    title: "Pending Rework",
    value: "41",
    trend: "43.6% of rejected",
    trendUp: true,
    icon: <Edit3 className="w-6 h-6 text-amber-600" />,
    bg: "bg-white",
    iconBg: "bg-amber-50 border-amber-100",
  },
  {
    title: "Rejected Today",
    value: "14",
    trend: "7.7% vs yesterday",
    trendUp: true,
    icon: <Calendar className="w-6 h-6 text-rose-600" />,
    bg: "bg-white",
    iconBg: "bg-rose-50 border-rose-100",
  },
  {
    title: "High Risk Rejections",
    value: "22",
    trend: "23.4% of rejected",
    trendUp: false,
    icon: <AlertTriangle className="w-6 h-6 text-amber-600" />,
    bg: "bg-white",
    iconBg: "bg-amber-50 border-amber-100",
  },
  {
    title: "Avg. Resolution Time",
    value: "2h 38m",
    trend: "18m vs last 7 days",
    trendUp: true,
    icon: <Clock className="w-6 h-6 text-indigo-600" />,
    bg: "bg-white",
    iconBg: "bg-indigo-50 border-indigo-100",
  },
];

const REJECTED_PRODUCTS = [
  {
    id: "prod_1",
    name: "CeraVe Hydrating Cleanser",
    asin: "B001610JQ4",
    sku: "CERAVE-HCL-120Z",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=100&q=80",
    originalVerdict: "Buy",
    rejectedBy: "John Smith",
    rejectedByRole: "Senior Reviewer",
    rejectedByInitials: "JS",
    rejectedByColor: "bg-blue-600",
    rejectReason: "Unsupported claim",
    date: "May 24, 2024",
    time: "11:42 AM",
    status: "Pending Rework",
  },
  {
    id: "prod_2",
    name: "Sony WH-1000XM5",
    asin: "B09XS7JWVH",
    sku: "SONY-WH1000XM5-BLK",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100&q=80",
    originalVerdict: "Buy",
    rejectedBy: "Emma Davis",
    rejectedByRole: "Staff Reviewer",
    rejectedByInitials: "ED",
    rejectedByColor: "bg-indigo-600",
    rejectReason: "Missing source",
    date: "May 24, 2024",
    time: "09:15 AM",
    status: "Escalated",
  },
  {
    id: "prod_3",
    name: "Ninja Air Fryer AF101",
    asin: "B07RV7C2JT",
    sku: "NINJA-AF101",
    image: "https://images.unsplash.com/photo-1626200419109-38eb3586b6bc?w=100&q=80",
    originalVerdict: "Wait",
    rejectedBy: "Mike Wilson",
    rejectedByRole: "Senior Reviewer",
    rejectedByInitials: "MW",
    rejectedByColor: "bg-purple-600",
    rejectReason: "Wrong product match",
    date: "May 23, 2024",
    time: "04:33 PM",
    status: "Re-run Requested",
  },
  {
    id: "prod_4",
    name: "Apple MacBook Air M2",
    asin: "B0B3C6C2VN",
    sku: "APPLE-MBA-M2-13",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&q=80",
    originalVerdict: "Better Alternative",
    rejectedBy: "Tom Clark",
    rejectedByRole: "Lead Reviewer",
    rejectedByInitials: "TC",
    rejectedByColor: "bg-teal-600",
    rejectReason: "Bad alternative",
    date: "May 23, 2024",
    time: "02:11 PM",
    status: "Pending Rework",
  },
  {
    id: "prod_5",
    name: "Orgain Organic Protein",
    asin: "B07X2ZLXRD",
    sku: "ORGAIN-PROTEIN-2LB",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=100&q=80",
    originalVerdict: "Buy",
    rejectedBy: "Lisa Patel",
    rejectedByRole: "Staff Reviewer",
    rejectedByInitials: "LP",
    rejectedByColor: "bg-pink-600",
    rejectReason: "Health/safety risk",
    date: "May 22, 2024",
    time: "10:05 AM",
    status: "Escalated",
  },
  {
    id: "prod_6",
    name: "The Ordinary Niacinamide 10%",
    asin: "B07X4QY7TW",
    sku: "ORD-NIAC10-ZINC1-30ML",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&q=80",
    originalVerdict: "Avoid",
    rejectedBy: "John Smith",
    rejectedByRole: "Senior Reviewer",
    rejectedByInitials: "JS",
    rejectedByColor: "bg-blue-600",
    rejectReason: "Affiliate disclosure issue",
    date: "May 21, 2024",
    time: "03:28 PM",
    status: "Closed",
  },
  {
    id: "prod_7",
    name: "Bose QuietComfort 45",
    asin: "B0981VEWBC",
    sku: "BOSE-QC45-WHT",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=100&q=80",
    originalVerdict: "Buy",
    rejectedBy: "Emma Davis",
    rejectedByRole: "Staff Reviewer",
    rejectedByInitials: "ED",
    rejectedByColor: "bg-indigo-600",
    rejectReason: "Missing source",
    date: "May 21, 2024",
    time: "11:07 AM",
    status: "Re-run Requested",
  },
];

const REJECTION_DISTRIBUTION = [
  { name: "Unsupported claim", value: 24, color: "#ef4444", percent: "25.5%" },
  { name: "Missing source", value: 20, color: "#f59e0b", percent: "21.3%" },
  { name: "Wrong product match", value: 18, color: "#eab308", percent: "19.1%" },
  { name: "Bad alternative", value: 14, color: "#22c55e", percent: "14.9%" },
  { name: "Health/safety risk", value: 12, color: "#14b8a6", percent: "12.8%" },
  { name: "Affiliate disclosure issue", value: 6, color: "#3b82f6", percent: "6.4%" },
];

export default function RejectedVerdicts() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("All Rejected");

  useEffect(() => {
    setMounted(true);
  }, []);

  const TABS = [
    { label: "All Rejected", count: 94 },
    { label: "Pending Rework", count: 41 },
    { label: "Re-Run Requested", count: 18 },
    { label: "Closed", count: 35 },
  ];

  return (
    <div className="flex flex-col flex-grow min-h-screen bg-slate-50 font-sans min-w-0 p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 min-w-0">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-[28px] font-bold text-slate-950 tracking-tight">Rejected Verdicts</h1>
          <p className="text-[13px] sm:text-[15px] text-slate-500 mt-1">Review rejected AI verdicts and why they were rejected.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button className="flex items-center gap-2 h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button className="flex items-center gap-2 h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition-colors shadow-sm">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button className="flex items-center gap-2 h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
        {METRICS.map((metric, idx) => (
          <div key={idx} className={`p-4 xl:p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-[130px] ${metric.bg}`}>
            <div className="flex justify-start items-center sm:items-start gap-3">
              <div className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 ${metric.iconBg}`}>
                {metric.icon}
              </div>
              <div className="flex-1 text-center sm:text-left sm:pl-3">
                <p className="text-[12px] xl:text-[13px] font-semibold text-slate-600 mb-2 sm:mb-1 leading-tight">{metric.title}</p>
                <h3 className="text-2xl font-black text-slate-900 leading-none tracking-tight mt-6 sm:mt-0">{metric.value}</h3>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-auto">
              <span className={`text-[12px] font-bold flex items-center ${metric.trendUp ? "text-emerald-600" : "text-rose-600"}`}>
                {metric.trendUp ? "↗" : "↘"} {metric.trend.split(" ")[0]}
              </span>
              <span className="text-[12px] font-medium text-slate-500">
                {metric.trend.substring(metric.trend.indexOf(" ") + 1)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex-1 min-w-[140px] sm:min-w-[200px]">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Search</label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search product, ASIN, SKU, or reviewer..."
              className="w-full h-9 pl-9 pr-3 text-[13px] border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="w-[48%] sm:w-[160px] flex-grow sm:flex-grow-0">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Reject Reason</label>
          <button className="w-full h-9 px-3 flex items-center justify-between text-[13px] border border-slate-200 rounded-md bg-white hover:bg-slate-50">
            <span className="truncate">All</span>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          </button>
        </div>

        <div className="w-[48%] sm:w-[160px] flex-grow sm:flex-grow-0">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Current Status</label>
          <button className="w-full h-9 px-3 flex items-center justify-between text-[13px] border border-slate-200 rounded-md bg-white hover:bg-slate-50">
            <span className="truncate">All</span>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          </button>
        </div>

        <div className="w-[48%] sm:w-[160px] flex-grow sm:flex-grow-0">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Rejected By</label>
          <button className="w-full h-9 px-3 flex items-center justify-between text-[13px] border border-slate-200 rounded-md bg-white hover:bg-slate-50">
            <span className="truncate">All</span>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          </button>
        </div>

        <div className="w-full sm:w-[200px] flex-grow sm:flex-grow-0">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Date Range</label>
          <button className="w-full h-9 px-3 flex items-center justify-between text-[13px] border border-slate-200 rounded-md bg-white hover:bg-slate-50">
            <div className="flex items-center gap-2 truncate">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>May 18 - May 24, 2024</span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          </button>
        </div>

        <div className="w-[48%] sm:w-[140px] flex-grow sm:flex-grow-0">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Category</label>
          <button className="w-full h-9 px-3 flex items-center justify-between text-[13px] border border-slate-200 rounded-md bg-white hover:bg-slate-50">
            <span className="truncate">All</span>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          </button>
        </div>

        <div className="w-[48%] sm:w-[120px] flex-grow sm:flex-grow-0">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5 opacity-0 hidden sm:block">More Filters</label>
          <button className="w-full h-9 flex items-center justify-center gap-1.5 text-[13px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors">
            <Plus className="w-4 h-4" /> Add Filter
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 sm:gap-6 border-b border-slate-200 overflow-x-auto whitespace-nowrap">
        {TABS.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`px-1 py-3 text-[13px] font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === tab.label
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
          >
            {tab.label} <span className="text-[11px] opacity-70">({tab.count})</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[12px] text-slate-500">
        <span>Showing 1 to 10 of 94 results</span>
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 bg-white rounded text-[12px] font-semibold text-slate-700 hover:bg-slate-50">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Columns <ChevronDown className="w-3.5 h-3.5 ml-1" />
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 bg-white rounded text-[12px] font-semibold text-slate-700 hover:bg-slate-50">
            20 per page <ChevronDown className="w-3.5 h-3.5 ml-1" />
          </button>
          <div className="flex items-center border border-slate-200 bg-white rounded overflow-x-auto">
            <button className="p-1.5 hover:bg-slate-50 border-r border-slate-200 shrink-0"><ChevronDown className="w-4 h-4 rotate-90 text-slate-400" /></button>
            <button className="px-3 py-1 text-[12px] font-bold bg-blue-600 text-white shrink-0">1</button>
            <button className="px-3 py-1 text-[12px] font-semibold text-slate-600 hover:bg-slate-50 shrink-0">2</button>
            <button className="px-3 py-1 text-[12px] font-semibold text-slate-600 hover:bg-slate-50 shrink-0">3</button>
            <button className="px-3 py-1 text-[12px] font-semibold text-slate-600 hover:bg-slate-50 shrink-0 hidden sm:block">4</button>
            <button className="px-3 py-1 text-[12px] font-semibold text-slate-600 hover:bg-slate-50 shrink-0 hidden sm:block">5</button>
            <button className="p-1.5 hover:bg-slate-50 border-l border-slate-200 shrink-0"><ChevronDown className="w-4 h-4 -rotate-90 text-slate-400" /></button>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Left Table Section */}
        <div className="lg:col-span-3">
          <Card className="bg-white border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="w-full whitespace-nowrap">
                <TableHeader className="bg-slate-50">
                  <TableRow className="border-b border-slate-200 hover:bg-slate-50">
                    <TableHead className="w-12 text-center py-3">
                      <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    </TableHead>
                    <TableHead className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Product</TableHead>
                    <TableHead className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Original Verdict</TableHead>
                    <TableHead className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Rejected By</TableHead>
                    <TableHead className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Reject Reason</TableHead>
                    <TableHead className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Date</TableHead>
                    <TableHead className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Current Status</TableHead>
                    <TableHead className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {REJECTED_PRODUCTS.map((row) => (
                    <TableRow key={row.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <TableCell className="text-center py-3">
                        <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 shrink-0 bg-white border border-slate-200 rounded flex items-center justify-center overflow-hidden">
                            <img src={row.image} alt={row.name} className="w-full h-full object-contain p-1" />
                          </div>
                          <div>
                            <div className="text-[13px] font-bold text-slate-900">{row.name}</div>
                            <div className="text-[11px] text-slate-500">ASIN: {row.asin}</div>
                            <div className="text-[11px] text-slate-500">SKU: {row.sku}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`px-2 py-0.5 text-[11px] font-bold rounded ${row.originalVerdict === "Buy" ? "bg-emerald-50 text-emerald-700" :
                            row.originalVerdict === "Wait" ? "bg-amber-50 text-amber-700" :
                              row.originalVerdict === "Avoid" ? "bg-rose-50 text-rose-700" :
                                "bg-blue-50 text-blue-700"
                          } hover:opacity-80 border-transparent`}>
                          {row.originalVerdict}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-bold ${row.rejectedByColor}`}>
                            {row.rejectedByInitials}
                          </div>
                          <div>
                            <div className="text-[12px] font-bold text-slate-900 leading-tight">{row.rejectedBy}</div>
                            <div className="text-[11px] text-slate-500 leading-tight">{row.rejectedByRole}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`text-[12px] font-bold ${row.rejectReason === "Unsupported claim" || row.rejectReason === "Health/safety risk" || row.rejectReason === "Bad alternative" ? "text-rose-600 bg-rose-50" :
                            row.rejectReason === "Missing source" ? "text-amber-600 bg-amber-50" :
                              "text-blue-600 bg-blue-50"
                          } px-2 py-1 rounded border border-transparent`}>
                          {row.rejectReason}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="text-[12px] font-medium text-slate-900">{row.date}</div>
                        <div className="text-[11px] text-slate-500">{row.time}</div>
                      </TableCell>
                      <TableCell>
                        <span className={`text-[12px] font-bold ${row.status === "Pending Rework" ? "text-amber-600" :
                            row.status === "Escalated" ? "text-blue-600" :
                              row.status === "Re-run Requested" ? "text-indigo-600" :
                                "text-emerald-600"
                          }`}>
                          {row.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded hover:bg-slate-50 text-[12px] font-bold text-slate-700 transition-colors shadow-sm">
                            <EyeIcon className="w-3.5 h-3.5 text-slate-400" /> View
                          </button>
                          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded hover:bg-slate-50 text-[12px] font-bold text-slate-700 transition-colors shadow-sm">
                            <ActionIcon status={row.status} /> {row.status === "Closed" ? "Re-open" : row.status === "Escalated" ? "Audit" : "Send to Rework"}
                          </button>
                          <button className="p-1.5 bg-white border border-slate-200 rounded hover:bg-slate-50 text-slate-400 transition-colors shadow-sm">
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="p-4 border-t border-slate-200 flex justify-between items-center text-[12px] text-slate-500">
              <span>94 items total</span>
              <div className="flex items-center gap-1">
                All times shown in UTC <Info className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          </Card>
        </div>

        {/* Right Insights Sidebar */}
        <div className="lg:col-span-1 space-y-6">

          <Card className="bg-white border-slate-200 rounded-xl shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[13px] font-bold text-slate-900">Common Rejection Reasons (This Week)</h3>
            </div>
            <div className="space-y-3">
              {REJECTION_DISTRIBUTION.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-[12px]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="font-semibold text-slate-700">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900">{item.value}</span>
                    <span className="text-slate-500 text-[11px] w-10 text-right">({item.percent})</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-[12px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center justify-center gap-1">
              View all reasons →
            </button>
          </Card>

          <Card className="bg-white border-slate-200 rounded-xl shadow-sm p-5">
            <h3 className="text-[13px] font-bold text-slate-900 mb-4">Rejection Distribution (This Week)</h3>
            <div className="flex items-center gap-4">
              <div className="w-[100px] h-[100px] relative shrink-0">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={REJECTION_DISTRIBUTION}
                        innerRadius={35}
                        outerRadius={50}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {REJECTION_DISTRIBUTION.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-slate-900 leading-none">94</span>
                  <span className="text-[10px] font-bold text-slate-500">Total</span>
                </div>
              </div>
              <div className="flex-1 space-y-1.5">
                {REJECTION_DISTRIBUTION.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                      <span className="text-slate-600 truncate">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="font-semibold text-slate-900">{item.value}</span>
                      <span className="text-slate-400">({item.percent})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full mt-4 py-2 text-[12px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center justify-center gap-1">
              View full analytics →
            </button>
          </Card>

          <Card className="bg-indigo-50/50 border-indigo-100 rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded bg-indigo-100 flex items-center justify-center text-indigo-600">
                <Info className="w-4 h-4" />
              </div>
              <h3 className="text-[13px] font-bold text-slate-900">About Rejected Verdicts</h3>
            </div>
            <p className="text-[12px] text-slate-600 leading-relaxed mb-4">
              These verdicts were rejected by human reviewers and require rework, re-evaluation, or additional approval.
            </p>
            <p className="text-[12px] text-slate-600 leading-relaxed mb-4">
              Use actions to route items back to AI rework or escalate to senior reviewers.
            </p>
            <button className="text-[12px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1">
              Learn more about rejections →
            </button>
          </Card>

        </div>
      </div>

    </div>
  );
}

function EyeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ActionIcon({ status }: { status: string }) {
  if (status === "Closed") {
    return <RefreshCw className="w-3.5 h-3.5 text-slate-400" />;
  }
  if (status === "Escalated") {
    return <Edit3 className="w-3.5 h-3.5 text-slate-400" />; // Or Audit icon
  }
  return <Edit3 className="w-3.5 h-3.5 text-slate-400" />; // Send to Rework
}
