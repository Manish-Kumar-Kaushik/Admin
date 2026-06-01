"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  RefreshCw,
  Eye,
  MoreVertical,
  HelpCircle,
  TrendingUp,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Menu
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/dashboard/sidebar-context";

// ─── SVG Circular Progress Component ─────────────────────────────────────────

const CircularProgress = ({ score }: { score: number }) => {
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let colorClass = "text-emerald-500";
  if (score < 50) colorClass = "text-red-500";
  else if (score < 72) colorClass = "text-amber-500";
  else colorClass = "text-emerald-500";

  return (
    <div className="relative flex items-center justify-center w-9 h-9 shrink-0">
      <svg className="w-9 h-9 rotate-[-90deg]">
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-slate-100"
        />
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn("transition-all duration-1000 ease-out", colorClass)}
        />
      </svg>
      <span className="absolute text-[12px] font-bold text-slate-800">{score}</span>
    </div>
  );
};


// ─── Data Mocks ──────────────────────────────────────────────────────────────

const metrics = [
  {
    title: "Total Alternatives",
    value: "12,458",
    sub: "↑ 8.2% vs yesterday",
    subColor: "text-emerald-600",
    icon: FileText,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
  },
  {
    title: "Pending Review",
    value: "1,248",
    sub: "10.0% of total",
    subColor: "text-slate-500",
    icon: AlertCircle,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
  },
  {
    title: "Approved",
    value: "9,856",
    sub: "79.0% of total",
    subColor: "text-slate-500",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
  },
  {
    title: "Rejected",
    value: "1,013",
    sub: "8.1% of total",
    subColor: "text-slate-500",
    icon: XCircle,
    iconColor: "text-red-500",
    iconBg: "bg-red-50",
  },
  {
    title: "Needs More Info",
    value: "341",
    sub: "2.7% of total",
    subColor: "text-slate-500",
    icon: HelpCircle,
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-50",
  },
];

const mockRows = [
  {
    id: 1,
    original: { title: "Sony WH-1000XM5 Wireless Headphones", asin: "B09XS7JWHH", img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=64&q=80" },
    alt: { title: "Bose QuietComfort Ultra Headphones", asin: "B0BLSKDVJY", img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=64&q=80" },
    type: "Better for slightly more",
    typeColor: "bg-blue-50 text-blue-700",
    priceDiff: "+$30.00",
    pctDiff: "+18%",
    isPositiveDiff: true,
    origScore: 72,
    altScore: 84,
    confScore: 92,
    confLabel: "High",
    affiliate: "Amazon",
    affStatus: "Active",
    status: "Pending Review",
    statusColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    id: 2,
    original: { title: "Keurig K-Elite Coffee Maker", asin: "B07VY76Z19", img: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba1?w=64&q=80" },
    alt: { title: "Ninja Hot & Iced Coffee Maker", asin: "B09D31DTZ7", img: "https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?w=64&q=80" },
    type: "Best similar price",
    typeColor: "bg-emerald-50 text-emerald-700",
    priceDiff: "+$4.99",
    pctDiff: "+4%",
    isPositiveDiff: true,
    origScore: 65,
    altScore: 74,
    confScore: 86,
    confLabel: "High",
    affiliate: "Amazon",
    affStatus: "Active",
    status: "Approved",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: 3,
    original: { title: "Optimum Nutrition Gold Standard Whey", asin: "B000QST1R6", img: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=64&q=80" },
    alt: { title: "Dymatize ISO100 Hydrolyzed Whey", asin: "B00E97M5V2", img: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=64&q=80" },
    type: "Cheaper but good enough",
    typeColor: "bg-orange-50 text-orange-700",
    priceDiff: "-$15.00",
    pctDiff: "-21%",
    isPositiveDiff: false,
    origScore: 68,
    altScore: 64,
    confScore: 75,
    confLabel: "Medium",
    affiliate: "Amazon",
    affStatus: "Active",
    status: "Pending Review",
    statusColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    id: 4,
    original: { title: "iRobot Roomba j7+ Robot Vacuum", asin: "B086XGQR6P", img: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=64&q=80" },
    alt: { title: "Roborock Q5+ Robot Vacuum", asin: "B09ZKGKPQD", img: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=64&q=80" },
    type: "Better for slightly more",
    typeColor: "bg-blue-50 text-blue-700",
    priceDiff: "+$150.00",
    pctDiff: "+28%",
    isPositiveDiff: true,
    origScore: 70,
    altScore: 85,
    confScore: 90,
    confLabel: "High",
    affiliate: "Amazon",
    affStatus: "Active",
    status: "Approved",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: 5,
    original: { title: "Fitbit Charge 5 Fitness Tracker", asin: "B09B2DFB55", img: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b0?w=64&q=80" },
    alt: { title: "Garmin Vivosmart 5 Fitness Tracker", asin: "B09KKP7VJX", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=64&q=80" },
    type: "Avoid and replace",
    typeColor: "bg-red-50 text-red-700",
    priceDiff: "+$20.00",
    pctDiff: "+25%",
    isPositiveDiff: true,
    origScore: 48,
    altScore: 72,
    confScore: 88,
    confLabel: "High",
    affiliate: "Amazon",
    affStatus: "Active",
    status: "Rejected",
    statusColor: "bg-red-50 text-red-700 border-red-200",
  },
  {
    id: 6,
    original: { title: "Intel Core i5-12400F Desktop Processor", asin: "B09NPHHSM6", img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=64&q=80" },
    alt: { title: "Intel Core i5-13400F Desktop Processor", asin: "B0BQ6K4BZG", img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=64&q=80" },
    type: "Premium upgrade",
    typeColor: "bg-purple-50 text-purple-700",
    priceDiff: "+$40.00",
    pctDiff: "+15%",
    isPositiveDiff: true,
    origScore: 66,
    altScore: 83,
    confScore: 80,
    confLabel: "High",
    affiliate: "Newegg",
    affStatus: "Active",
    status: "Pending Review",
    statusColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    id: 7,
    original: { title: "Samsung T7 1TB Portable SSD", asin: "B0874XN4D8", img: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=64&q=80" },
    alt: { title: "Crucial X8 1TB Portable SSD", asin: "B07YFFX5MD", img: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=64&q=80" },
    type: "Budget pick",
    typeColor: "bg-teal-50 text-teal-700",
    priceDiff: "-$30.00",
    pctDiff: "-25%",
    isPositiveDiff: false,
    origScore: 74,
    altScore: 66,
    confScore: 72,
    confLabel: "Medium",
    affiliate: "Amazon",
    affStatus: "Active",
    status: "Needs More Info",
    statusColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    id: 8,
    original: { title: "Logitech G Pro X Superlight Mouse", asin: "B08MVQ6G49", img: "https://images.unsplash.com/photo-1527814050087-37938154799f?w=64&q=80" },
    alt: { title: "Razer DeathAdder V3 Pro Wireless", asin: "B0BYP9LTKM", img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=64&q=80" },
    type: "Best similar price",
    typeColor: "bg-emerald-50 text-emerald-700",
    priceDiff: "+$5.00",
    pctDiff: "+5%",
    isPositiveDiff: true,
    origScore: 78,
    altScore: 82,
    confScore: 78,
    confLabel: "High",
    affiliate: "Amazon",
    affStatus: "Active",
    status: "Approved",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
];

export default function AlternativeReview() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const { toggle } = useSidebar();

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      {/* ── Full Width Header ── */}
      <header className="bg-white border-b border-slate-200 px-4 md:px-8 h-14 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          {/* Sidebar Toggle Hamburger */}
          <button
            onClick={toggle}
            className="p-1.5 mr-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-[13px] text-slate-500">
            <span>AI Review</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-slate-900">Alternatives Review</span>
          </div>
        </div>
        
        <div className="flex-none flex items-center gap-3 md:gap-5 relative" ref={dropdownRef}>
          <button className="flex items-center gap-1.5 text-[13px] text-slate-600 hover:text-slate-900 font-medium transition-colors mr-2">
            <HelpCircle className="w-4 h-4" />
            <span>Help</span>
          </button>

          {/* Notification Bell (Same as global header) */}
          <button
            className="relative w-8 h-8 flex items-center justify-center border border-slate-200 bg-white hover:border-slate-300 rounded-full text-slate-500 hover:text-slate-800 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#EF4444] border-2 border-white rounded-full flex items-center justify-center text-[9px] text-white font-bold leading-none shadow-sm">
              5
            </span>
          </button>

          {/* User Profile (Same as global header, but with dropdown) */}
          <div 
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
              alt="Admin Avatar"
              className="w-8 h-8 rounded-full object-cover shadow-sm border border-slate-200"
            />
            <div className="hidden lg:flex flex-col leading-none">
              <span className="text-[12px] font-bold text-slate-800">Admin User</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Super Admin</span>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-500 ml-1 hidden lg:block" />
          </div>

          {/* Admin User Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-slate-200 py-1 z-50">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-800">Admin User</p>
                <p className="text-xs text-slate-500">admin@buywise.ai</p>
              </div>
              <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors">
                <User className="w-4 h-4 text-slate-400" />
                Profile
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors">
                <Settings className="w-4 h-4 text-slate-400" />
                Settings
              </button>
              <div className="h-px bg-slate-100 my-1"></div>
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors">
                <LogOut className="w-4 h-4 text-red-400" />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* ── Main Container ── */}
      <main className="w-full px-4 md:px-6 py-6 flex-1 flex flex-col gap-6 overflow-x-hidden min-w-0">

        {/* ── Title Area ── */}
        <div className="flex flex-col gap-6 mb-2">

          {/* Title & Actions Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
            <div>
              <h1 className="text-[26px] font-bold text-slate-900 tracking-tight leading-none mb-1.5">Alternatives Review</h1>
              <p className="text-[14px] text-slate-500">
                Review and approve alternative product recommendations generated by the AI.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="text-[12px] text-slate-500 font-medium whitespace-nowrap">
                Last updated: May 18, 2024 10:45 AM
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="h-9 px-4 text-[13px] font-semibold bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm w-full sm:w-auto">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
                <Button className="h-9 px-4 text-[13px] font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm w-full sm:w-auto">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Metrics Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          {metrics.map((m, i) => (
            <Card key={i} className="bg-white border-slate-200 rounded-xl shadow-sm p-4 flex items-start gap-4">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", m.iconBg)}>
                <m.icon className={cn("w-5 h-5", m.iconColor)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-500 mb-1">{m.title}</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-slate-900 leading-none tracking-tight">
                    {m.value}
                  </span>
                </div>
                <p className={cn("text-[11px] font-medium mt-1.5", m.subColor)}>
                  {m.sub}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* ── Table Section ── */}
        <Card className="bg-white border-slate-200 rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden min-h-0">

          {/* Filters Bar */}
          <div className="p-4 border-b border-slate-200 flex flex-col xl:flex-row xl:items-end gap-4 shrink-0 bg-white">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-slate-600">Search Products</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by product name, ASIN, SKU..."
                    className="w-full h-9 pl-9 pr-3 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
              </div>

              {/* Alternative Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-slate-600">Alternative Type</label>
                <select className="w-full h-9 px-3 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700 appearance-none cursor-pointer">
                  <option>All Types</option>
                  <option>Better for slightly more</option>
                  <option>Best similar price</option>
                </select>
              </div>

              {/* Status */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-slate-600">Status</label>
                <select className="w-full h-9 px-3 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700 appearance-none cursor-pointer">
                  <option>All Status</option>
                  <option>Pending Review</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
              </div>

              {/* Affiliate Status */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-slate-600">Affiliate Status</label>
                <select className="w-full h-9 px-3 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700 appearance-none cursor-pointer">
                  <option>All Affiliate Status</option>
                  <option>Active</option>
                </select>
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-slate-600">Category</label>
                <select className="w-full h-9 px-3 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700 appearance-none cursor-pointer">
                  <option>All Categories</option>
                  <option>Electronics</option>
                </select>
              </div>
            </div>

            <Button variant="outline" className="h-9 px-4 text-[13px] font-semibold bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shrink-0 w-full xl:w-auto shadow-sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Table Container - Horizontal scroll for mobile */}
          <div className="flex-1 overflow-x-auto overflow-y-auto min-h-0 bg-white">
            <Table className="w-full text-sm">
              <TableHeader className="bg-white sticky top-0 z-10 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <TableRow className="border-b border-slate-200 hover:bg-transparent">
                  <TableHead className="font-semibold text-slate-600 h-11 px-4 whitespace-nowrap min-w-[240px]">Original Product</TableHead>
                  <TableHead className="font-semibold text-slate-600 h-11 px-4 whitespace-nowrap min-w-[240px]">Recommended Alternative</TableHead>
                  <TableHead className="font-semibold text-slate-600 h-11 px-4 whitespace-nowrap text-center">Alternative Type</TableHead>
                  <TableHead className="font-semibold text-slate-600 h-11 px-4 whitespace-nowrap text-center">Price Difference</TableHead>
                  <TableHead className="font-semibold text-slate-600 h-11 px-4 whitespace-nowrap text-center">Original Score</TableHead>
                  <TableHead className="font-semibold text-slate-600 h-11 px-4 whitespace-nowrap text-center">Alternative Score</TableHead>
                  <TableHead className="font-semibold text-slate-600 h-11 px-4 whitespace-nowrap text-center">Confidence</TableHead>
                  <TableHead className="font-semibold text-slate-600 h-11 px-4 whitespace-nowrap hidden lg:table-cell">Affiliate Status</TableHead>
                  <TableHead className="font-semibold text-slate-600 h-11 px-4 whitespace-nowrap text-center">Status</TableHead>
                  <TableHead className="font-semibold text-slate-600 h-11 px-4 whitespace-nowrap text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRows.map((row) => (
                  <TableRow key={row.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors group">
                    {/* Original Product */}
                    <TableCell className="px-4 py-3 align-top">
                      <div className="flex items-center gap-3">
                        <div className="w-[52px] h-[52px] shrink-0 bg-white border border-slate-200 rounded-md flex items-center justify-center overflow-hidden p-1">
                          <img src={row.original.img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <span className="text-[13px] font-bold text-slate-900 truncate" title={row.original.title}>
                            {row.original.title}
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium">
                            ASIN: {row.original.asin}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Alternative Product */}
                    <TableCell className="px-4 py-3 align-top border-r border-slate-50/50">
                      <div className="flex items-center gap-3">
                        <div className="w-[52px] h-[52px] shrink-0 bg-white border border-slate-200 rounded-md flex items-center justify-center overflow-hidden p-1">
                          <img src={row.alt.img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <span className="text-[13px] font-bold text-slate-900 truncate" title={row.alt.title}>
                            {row.alt.title}
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium">
                            ASIN: {row.alt.asin}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Alternative Type */}
                    <TableCell className="px-4 py-3 align-middle text-center whitespace-nowrap">
                      <span className={cn("inline-flex items-center justify-center px-2 py-1 rounded text-[11px] font-semibold leading-none", row.typeColor)}>
                        {row.type}
                      </span>
                    </TableCell>

                    {/* Price Difference */}
                    <TableCell className="px-4 py-3 align-middle text-center whitespace-nowrap">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className={cn("text-sm font-bold", row.isPositiveDiff ? "text-red-600" : "text-emerald-600")}>
                          {row.priceDiff}
                        </span>
                        <span className={cn("text-[11px] font-medium", row.isPositiveDiff ? "text-red-500" : "text-emerald-500")}>
                          ({row.pctDiff})
                        </span>
                      </div>
                    </TableCell>

                    {/* Original Score */}
                    <TableCell className="px-4 py-3 align-middle">
                      <div className="flex justify-center">
                        <CircularProgress score={row.origScore} />
                      </div>
                    </TableCell>

                    {/* Alternative Score */}
                    <TableCell className="px-4 py-3 align-middle">
                      <div className="flex justify-center">
                        <CircularProgress score={row.altScore} />
                      </div>
                    </TableCell>

                    {/* Confidence */}
                    <TableCell className="px-4 py-3 align-middle text-center whitespace-nowrap">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-sm font-bold text-slate-900">{row.confScore}%</span>
                        <span className={cn("text-[11px] font-semibold",
                          row.confLabel === "High" ? "text-emerald-600" :
                            row.confLabel === "Medium" ? "text-amber-600" : "text-red-600"
                        )}>
                          {row.confLabel}
                        </span>
                      </div>
                    </TableCell>

                    {/* Affiliate Status */}
                    <TableCell className="px-4 py-3 align-middle hidden lg:table-cell whitespace-nowrap">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 bg-slate-900 text-white rounded-[3px] flex items-center justify-center text-[9px] font-bold">a</div>
                          <span className="text-[12px] font-bold text-slate-800">{row.affiliate}</span>
                        </div>
                        <span className="text-[11px] text-emerald-600 font-semibold pl-5.5">Active</span>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell className="px-4 py-3 align-middle text-center whitespace-nowrap">
                      <span className={cn("inline-flex items-center justify-center px-2.5 py-1 rounded-md text-[11px] font-bold leading-none border", row.statusColor)}>
                        {row.status}
                      </span>
                    </TableCell>

                    {/* Action */}
                    <TableCell className="px-4 py-3 align-middle text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <Link href="/dashboard/alternatives/review/ALT-2024-0518001" className="inline-flex items-center justify-center font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed w-7 h-7 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200 bg-white rounded">
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <Button variant="ghost" size="icon" className="w-7 h-7 text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors hidden sm:flex border border-slate-200 bg-white rounded">
                          <MoreVertical className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer Pagination */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            <p className="text-xs text-slate-500 font-medium">
              Showing 1 to 20 of 12,458 results
            </p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 mr-4 hidden md:flex">
                <span className="text-xs text-slate-500">Rows per page:</span>
                <select className="h-8 px-2 text-xs font-semibold border border-slate-200 rounded bg-white text-slate-700 outline-none">
                  <option>20</option>
                  <option>50</option>
                  <option>100</option>
                </select>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="w-8 h-8 text-slate-400 border-slate-200 bg-white" disabled>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="w-8 h-8 font-bold bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:text-white">
                  1
                </Button>
                <Button variant="outline" size="icon" className="w-8 h-8 font-medium text-slate-600 border-slate-200 bg-white hover:bg-slate-50">
                  2
                </Button>
                <Button variant="outline" size="icon" className="w-8 h-8 font-medium text-slate-600 border-slate-200 bg-white hover:bg-slate-50 hidden sm:flex">
                  3
                </Button>
                <span className="w-8 text-center text-slate-400 text-xs hidden sm:block">...</span>
                <Button variant="outline" size="icon" className="w-8 h-8 font-medium text-slate-600 border-slate-200 bg-white hover:bg-slate-50 hidden sm:flex">
                  623
                </Button>
                <Button variant="outline" size="icon" className="w-8 h-8 text-slate-600 border-slate-200 bg-white hover:bg-slate-50">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
