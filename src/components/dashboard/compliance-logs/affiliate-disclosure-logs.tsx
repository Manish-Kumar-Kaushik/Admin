"use client";

import React, { useState, useMemo } from "react";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Info,
  SlidersHorizontal,
  Copy,
  Eye,
  MoreVertical,
  ExternalLink,
  User,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  X,
  FileText,
  Target,
  RefreshCw,
  AlertTriangle,
  Monitor,
  Smartphone,
  Check,
} from "lucide-react";

// Types
interface DisclosureLog {
  id: string;
  timestamp: string;
  utcTimestamp: string;
  placement: "Product Page" | "Extension" | "Comparison Page" | "Article Page";
  pageLocation: string;
  productName: string;
  productSubtitle: string;
  productImage: string;
  productAsin: string;
  eventType: "Impression" | "Click" | "Opt-out";
  userName: string;
  userEmail: string;
  deviceType: "Desktop" | "Mobile";
  browserInfo: string;
  ipAddress: string;
  textVersion: string;
  userAction: "None" | "Clicked Link" | "Closed Banner" | "Declined Cookie";
}

export default function AffiliateDisclosureLogs() {
  // Mock Data
  const [logs, setLogs] = useState<DisclosureLog[]>([
    {
      id: "ADL-2025-0526-000482",
      timestamp: "May 26, 2025 10:24:31 AM",
      utcTimestamp: "May 26, 2025 10:24:31 AM (UTC)",
      placement: "Product Page",
      pageLocation: "/product/sony-wh-1000xm5",
      productName: "Sony WH-1000XM5",
      productSubtitle: "Wireless Headphones",
      productImage: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100&q=80",
      productAsin: "B09XS7JWHH",
      eventType: "Impression",
      userName: "Sarah Johnson",
      userEmail: "sarah.j@email.com",
      deviceType: "Desktop",
      browserInfo: "Chrome 124.0.6367.91",
      ipAddress: "203.0.113.42",
      textVersion: "v2.1 (Updated May 1, 2025)",
      userAction: "None",
    },
    {
      id: "ADL-2025-0526-000481",
      timestamp: "May 26, 2025 10:23:08 AM",
      utcTimestamp: "May 26, 2025 10:23:08 AM (UTC)",
      placement: "Extension",
      pageLocation: "amazon.com/dp/B09XS7JWHH",
      productName: "Sony WH-1000XM5",
      productSubtitle: "Wireless Headphones",
      productImage: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100&q=80",
      productAsin: "B09XS7JWHH",
      eventType: "Click",
      userName: "Michael Chen",
      userEmail: "michael.c@email.com",
      deviceType: "Desktop",
      browserInfo: "Chrome 124.0.6367.91",
      ipAddress: "198.51.100.12",
      textVersion: "v2.1 (Updated May 1, 2025)",
      userAction: "Clicked Link",
    },
    {
      id: "ADL-2025-0526-000480",
      timestamp: "May 26, 2025 10:21:45 AM",
      utcTimestamp: "May 26, 2025 10:21:45 AM (UTC)",
      placement: "Comparison Page",
      pageLocation: "/compare/sony-vs-bose",
      productName: "Sony vs Bose",
      productSubtitle: "Headphones",
      productImage: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=100&q=80",
      productAsin: "B0CSM5S4NF",
      eventType: "Impression",
      userName: "Robert Garcia",
      userEmail: "robert.g@email.com",
      deviceType: "Mobile",
      browserInfo: "Safari 17.4",
      ipAddress: "203.0.113.88",
      textVersion: "v2.1 (Updated May 1, 2025)",
      userAction: "None",
    },
    {
      id: "ADL-2025-0526-000479",
      timestamp: "May 26, 2025 10:20:12 AM",
      utcTimestamp: "May 26, 2025 10:20:12 AM (UTC)",
      placement: "Product Page",
      pageLocation: "/product/anker-737-powerbank",
      productName: "Anker 737 Power Bank",
      productSubtitle: "PowerCore 24K",
      productImage: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=100&q=80",
      productAsin: "B0B9T3KB4Y",
      eventType: "Impression",
      userName: "Emily Davis",
      userEmail: "emily.d@email.com",
      deviceType: "Mobile",
      browserInfo: "Chrome Mobile 123.0",
      ipAddress: "198.51.100.230",
      textVersion: "v2.0 (Updated Jan 15, 2025)",
      userAction: "None",
    },
    {
      id: "ADL-2025-0526-000478",
      timestamp: "May 26, 2025 10:18:55 AM",
      utcTimestamp: "May 26, 2025 10:18:55 AM (UTC)",
      placement: "Article Page",
      pageLocation: "/guides/best-headphones-2025",
      productName: "Best Headphones",
      productSubtitle: "Buying Guide",
      productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80",
      productAsin: "MULTIPLE_IDS",
      eventType: "Impression",
      userName: "David Wilson",
      userEmail: "david.w@email.com",
      deviceType: "Desktop",
      browserInfo: "Firefox 125.0",
      ipAddress: "203.0.113.111",
      textVersion: "v2.1 (Updated May 1, 2025)",
      userAction: "None",
    },
    {
      id: "ADL-2025-0526-000477",
      timestamp: "May 26, 2025 10:17:32 AM",
      utcTimestamp: "May 26, 2025 10:17:32 AM (UTC)",
      placement: "Extension",
      pageLocation: "bestbuy.com/site/sony-wh1000xm5",
      productName: "Sony WH-1000XM5",
      productSubtitle: "Wireless Headphones",
      productImage: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100&q=80",
      productAsin: "B09XS7JWHH",
      eventType: "Click",
      userName: "Lisa Martinez",
      userEmail: "lisa.m@email.com",
      deviceType: "Desktop",
      browserInfo: "Chrome 124.0.6367.91",
      ipAddress: "198.51.100.45",
      textVersion: "v2.1 (Updated May 1, 2025)",
      userAction: "Clicked Link",
    },
    {
      id: "ADL-2025-0526-000476",
      timestamp: "May 26, 2025 10:16:09 AM",
      utcTimestamp: "May 26, 2025 10:16:09 AM (UTC)",
      placement: "Product Page",
      pageLocation: "/product/iphone-15-128gb",
      productName: "iPhone 15 (128GB)",
      productSubtitle: "Blue",
      productImage: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=100&q=80",
      productAsin: "B0CHWT49T3",
      eventType: "Impression",
      userName: "James Anderson",
      userEmail: "james.a@email.com",
      deviceType: "Mobile",
      browserInfo: "Safari Mobile",
      ipAddress: "203.0.113.5",
      textVersion: "v2.1 (Updated May 1, 2025)",
      userAction: "None",
    },
    {
      id: "ADL-2025-0526-000475",
      timestamp: "May 26, 2025 10:14:48 AM",
      utcTimestamp: "May 26, 2025 10:14:48 AM (UTC)",
      placement: "Extension",
      pageLocation: "walmart.com/ip/iphone-15-128gb",
      productName: "iPhone 15 (128GB)",
      productSubtitle: "Blue",
      productImage: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=100&q=80",
      productAsin: "B0CHWT49T3",
      eventType: "Opt-out",
      userName: "Sophie Lee",
      userEmail: "sophie.l@email.com",
      deviceType: "Desktop",
      browserInfo: "Edge 124.0",
      ipAddress: "198.51.100.99",
      textVersion: "v2.1 (Updated May 1, 2025)",
      userAction: "Closed Banner",
    }
  ]);

  // Selected state
  const [selectedLogId, setSelectedLogId] = useState<string>("ADL-2025-0526-000482");
  
  // Filter States
  const [dateRange, setDateRange] = useState<string>("May 13 – May 26, 2025");
  const [selectedPlacement, setSelectedPlacement] = useState<string>("All Placements");
  const [selectedPageLocation, setSelectedPageLocation] = useState<string>("All Pages");
  const [selectedDevice, setSelectedDevice] = useState<string>("All Devices");
  const [selectedUser, setSelectedUser] = useState<string>("All Users");
  const [activeTab, setActiveTab] = useState<string>("All Logs");
  const [sortBy, setSortBy] = useState<string>("Newest First");

  // Selection Checkboxes state
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({
    "ADL-2025-0526-000482": true,
  });

  // Copied indicator
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleClearFilters = () => {
    setSelectedPlacement("All Placements");
    setSelectedPageLocation("All Pages");
    setSelectedDevice("All Devices");
    setSelectedUser("All Users");
  };

  const activeLog = useMemo(() => {
    return logs.find((l) => l.id === selectedLogId) || logs[0];
  }, [selectedLogId, logs]);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      // Tab Filtering
      if (activeTab === "Impressions" && log.eventType !== "Impression") return false;
      if (activeTab === "Clicks" && log.eventType !== "Click") return false;
      if (activeTab === "Opt-outs" && log.eventType !== "Opt-out") return false;

      // Dropdown filters
      if (selectedPlacement !== "All Placements" && log.placement !== selectedPlacement) return false;
      if (selectedDevice !== "All Devices" && log.deviceType !== selectedDevice) return false;
      if (selectedUser !== "All Users" && log.userName !== selectedUser) return false;
      
      return true;
    });
  }, [logs, activeTab, selectedPlacement, selectedDevice, selectedUser]);

  // Colors
  const getPlacementBadgeColor = (p: string) => {
    switch (p) {
      case "Product Page":
        return "text-purple-600 bg-purple-50 border-purple-100";
      case "Extension":
        return "text-emerald-600 bg-emerald-50 border-emerald-100";
      case "Comparison Page":
        return "text-amber-600 bg-amber-50 border-amber-100";
      case "Article Page":
        return "text-blue-600 bg-blue-50 border-blue-100";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const getEventBadgeColor = (e: string) => {
    switch (e) {
      case "Impression":
        return "text-blue-700 bg-blue-50/50";
      case "Click":
        return "text-emerald-700 bg-emerald-50/50";
      case "Opt-out":
        return "text-rose-700 bg-rose-50/50";
      default:
        return "text-slate-700 bg-slate-100";
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated: Record<string, boolean> = {};
    if (e.target.checked) {
      filteredLogs.forEach((l) => {
        updated[l.id] = true;
      });
    }
    setCheckedIds(updated);
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  return (
    <div className="bg-slate-50 min-h-screen w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-full px-4 sm:px-8 py-6 space-y-6">
        
        {/* ─── Page Header area ─── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl leading-tight flex items-center gap-2">
              Affiliate Disclosure Logs
              <span title="Compliance log history tracker" className="cursor-help">
                <Info className="h-4.5 w-4.5 text-slate-400" />
              </span>
            </h1>
            <p className="mt-1 text-sm text-slate-500 font-medium">
              Track all affiliate disclosure impressions, placements, and user interactions for transparency and compliance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-250 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs">
              <Download className="h-4 w-4 text-slate-500" />
              Export
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-250 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs">
              <SlidersHorizontal className="h-4 w-4 text-slate-500" />
              Filters
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-[#4F46E5] hover:bg-[#4338ca] text-white px-4 py-2 text-sm font-semibold transition shadow-sm">
              More Actions
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ─── Metric Indicator Widgets row ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              title: "Total Impressions",
              value: "128,482",
              change: "+18.6%",
              desc: "vs last 30 days",
              icon: FileText,
              color: "text-purple-600 bg-purple-50 border-purple-100",
              up: true
            },
            {
              title: "Unique Users",
              value: "48,293",
              change: "+15.2%",
              desc: "vs last 30 days",
              icon: User,
              color: "text-blue-600 bg-blue-50 border-blue-100",
              up: true
            },
            {
              title: "Click Throughs",
              value: "9,842",
              change: "+12.7%",
              desc: "vs last 30 days",
              icon: Target,
              color: "text-emerald-600 bg-emerald-50 border-emerald-100",
              up: true
            },
            {
              title: "Disclosure CTR",
              value: "7.66%",
              change: "+2.1%",
              desc: "vs last 30 days",
              icon: RefreshCw,
              color: "text-indigo-600 bg-indigo-50 border-indigo-100",
              up: true
            },
            {
              title: "Opt-out Rate",
              value: "0.42%",
              change: "-0.08%",
              desc: "vs last 30 days",
              icon: AlertTriangle,
              color: "text-red-650 bg-red-50 border-red-150",
              up: false
            }
          ].map((widget, i) => {
            const Icon = widget.icon;
            return (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs flex items-start gap-4">
                <div className={`p-2.5 rounded-lg shrink-0 border ${widget.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider select-none">{widget.title}</div>
                  <div className="text-xl font-bold text-slate-900 mt-1">{widget.value}</div>
                  <div className="flex items-center gap-1 mt-1 text-[11px] select-none font-bold">
                    {widget.up ? (
                      <ArrowUpRight className="h-3 w-3 text-emerald-600 shrink-0" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-500 shrink-0" />
                    )}
                    <span className={widget.up ? "text-emerald-600" : "text-red-500"}>{widget.change}</span>
                    <span className="text-slate-400 font-medium">{widget.desc}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Filters Grid ─── */}
        <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs w-full max-w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 min-w-0">
          <div className="flex flex-wrap items-center gap-3.5 w-full lg:w-auto">
            
            {/* Date Range Selector */}
            <div className="flex flex-col border border-slate-200 rounded-xl bg-white px-3 py-1.5 min-w-[185px] h-[52px] justify-between relative shadow-2xs">
              <label className="text-[10px] text-slate-400 font-bold select-none block leading-none">Date Range</label>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 leading-none mb-0.5">
                <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span>{dateRange}</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 ml-auto shrink-0" />
              </div>
            </div>

            {/* Placement Filter */}
            <div className="flex flex-col border border-slate-200 rounded-xl bg-white px-3 py-1.5 min-w-[140px] h-[52px] justify-between relative shadow-2xs">
              <label className="text-[10px] text-slate-400 font-bold select-none block leading-none">Placement</label>
              <div className="relative w-full flex items-center mb-0.5">
                <select
                  value={selectedPlacement}
                  onChange={(e) => setSelectedPlacement(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer pr-5 appearance-none select-none"
                >
                  <option value="All Placements">All Placements</option>
                  <option value="Product Page">Product Page</option>
                  <option value="Extension">Extension</option>
                  <option value="Comparison Page">Comparison Page</option>
                  <option value="Article Page">Article Page</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#4F46E5] pointer-events-none" />
              </div>
            </div>

            {/* Page/Location Filter */}
            <div className="flex flex-col border border-slate-200 rounded-xl bg-white px-3 py-1.5 min-w-[140px] h-[52px] justify-between relative shadow-2xs">
              <label className="text-[10px] text-slate-400 font-bold select-none block leading-none">Page / Location</label>
              <div className="relative w-full flex items-center mb-0.5">
                <select
                  value={selectedPageLocation}
                  onChange={(e) => setSelectedPageLocation(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer pr-5 appearance-none select-none"
                >
                  <option value="All Pages">All Pages</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#4F46E5] pointer-events-none" />
              </div>
            </div>

            {/* Device Filter */}
            <div className="flex flex-col border border-slate-200 rounded-xl bg-white px-3 py-1.5 min-w-[140px] h-[52px] justify-between relative shadow-2xs">
              <label className="text-[10px] text-slate-400 font-bold select-none block leading-none">Device</label>
              <div className="relative w-full flex items-center mb-0.5">
                <select
                  value={selectedDevice}
                  onChange={(e) => setSelectedDevice(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer pr-5 appearance-none select-none"
                >
                  <option value="All Devices">All Devices</option>
                  <option value="Desktop">Desktop</option>
                  <option value="Mobile">Mobile</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#4F46E5] pointer-events-none" />
              </div>
            </div>

            {/* User Filter */}
            <div className="flex flex-col border border-slate-200 rounded-xl bg-white px-3 py-1.5 min-w-[140px] h-[52px] justify-between relative shadow-2xs">
              <label className="text-[10px] text-slate-400 font-bold select-none block leading-none">User</label>
              <div className="relative w-full flex items-center mb-0.5">
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer pr-5 appearance-none select-none"
                >
                  <option value="All Users">All Users</option>
                  <option value="Sarah Johnson">Sarah Johnson</option>
                  <option value="Michael Chen">Michael Chen</option>
                  <option value="Robert Garcia">Robert Garcia</option>
                  <option value="Emily Davis">Emily Davis</option>
                  <option value="David Wilson">David Wilson</option>
                  <option value="Lisa Martinez">Lisa Martinez</option>
                  <option value="James Anderson">James Anderson</option>
                  <option value="Sophie Lee">Sophie Lee</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#4F46E5] pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Reset Action CTAs */}
          <div className="flex items-center gap-4 shrink-0 select-none justify-end lg:justify-start">
            <button
              onClick={handleClearFilters}
              className="text-sm font-semibold text-[#4F46E5] hover:text-[#4338ca] transition-colors hover:underline"
            >
              Clear All
            </button>
          </div>
        </section>

        {/* ─── Split Screen: Logs Table and Details Panel ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full max-w-full">
          
          {/* Left Column: Logs Table & Navigation (9/12) */}
          <div className="col-span-12 lg:col-span-9 space-y-6 w-full min-w-0">
            
            <div className="rounded-xl border border-slate-200 bg-white shadow-xs min-w-0 overflow-hidden">
              
              {/* Tab Header row */}
              <div className="px-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-white">
                <div className="flex border-b border-transparent pb-0.5">
                  {[
                    { label: "All Logs", count: 128482 },
                    { label: "Impressions", count: 128482 },
                    { label: "Clicks", count: 9842 },
                    { label: "Opt-outs", count: 532 }
                  ].map((tab) => {
                    const isActive = activeTab === tab.label;
                    return (
                      <button
                        key={tab.label}
                        onClick={() => setActiveTab(tab.label)}
                        className={`py-3.5 px-4 font-semibold text-sm transition-all border-b-2 -mb-0.5 shrink-0 ${
                          isActive
                            ? "border-[#4F46E5] text-[#4F46E5]"
                            : "border-transparent text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        {tab.label} ({tab.count.toLocaleString()})
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 py-2 text-xs font-semibold text-slate-500">
                  <span className="select-none text-sm">Sort by:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-transparent pl-1 pr-6 py-1 outline-none text-slate-800 font-bold select-none cursor-pointer text-sm"
                    >
                      <option>Newest First</option>
                      <option>Oldest First</option>
                    </select>
                    <ChevronDown className="absolute right-0.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Grid Table */}
              <div className="overflow-x-auto select-none">
                <table className="w-full min-w-[950px] text-sm text-left border-collapse">
                  <thead>
                    <tr className="text-slate-400 font-semibold border-b border-slate-100 text-xs uppercase tracking-wider bg-slate-50/10">
                      <th className="py-3 px-4 w-[4%]">
                        <input
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={filteredLogs.length > 0 && filteredLogs.every((l) => checkedIds[l.id])}
                          className="rounded border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5 cursor-pointer"
                        />
                      </th>
                      <th className="py-3 font-bold w-[16%]">Log ID</th>
                      <th className="py-3 font-bold w-[14%]">Timestamp</th>
                      <th className="py-3 font-bold w-[12%]">Placement</th>
                      <th className="py-3 font-bold w-[18%]">Page / Location</th>
                      <th className="py-3 font-bold w-[18%]">Product / Context</th>
                      <th className="py-3 font-bold w-[8%]">Event</th>
                      <th className="py-3 font-bold w-[10%]">User</th>
                      <th className="py-3 font-bold w-[12%]">Device</th>
                      <th className="py-3 text-center font-bold w-[6%] pr-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredLogs.map((row) => {
                      const isSelected = row.id === selectedLogId;
                      const isChecked = !!checkedIds[row.id];

                      return (
                        <tr
                          key={row.id}
                          onClick={() => setSelectedLogId(row.id)}
                          className={`cursor-pointer transition-colors ${
                            isSelected ? "bg-indigo-50/30 hover:bg-indigo-50/40" : "hover:bg-slate-50/30"
                          }`}
                        >
                          {/* Checkbox */}
                          <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => handleSelectOne(row.id, e.target.checked)}
                              className="rounded border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5 cursor-pointer"
                            />
                          </td>

                          {/* Log ID */}
                          <td className="py-3.5 font-mono text-xs text-slate-800">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold">{row.id}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopy(row.id, row.id);
                                }}
                                className="p-0.5 text-slate-400 hover:text-slate-600 transition"
                                title="Copy Log ID"
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </button>
                              {copiedId === row.id && (
                                <span className="absolute text-[10px] bg-slate-900 text-white rounded px-1.5 py-0.5 -mt-6 select-none shadow">
                                  Copied!
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Timestamp */}
                          <td className="py-3.5 text-xs text-slate-500 font-medium">
                            {row.timestamp}
                          </td>

                          {/* Placement */}
                          <td className="py-3.5">
                            <span className={`inline-flex rounded-lg px-2.5 py-0.5 text-[11px] font-bold ${getPlacementBadgeColor(row.placement)}`}>
                              {row.placement}
                            </span>
                          </td>

                          {/* Page / Location */}
                          <td className="py-3.5 pr-2 font-mono text-xs text-slate-500 truncate max-w-[150px]" title={row.pageLocation}>
                            {row.pageLocation}
                          </td>

                          {/* Product / Context */}
                          <td className="py-3.5 pr-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <img
                                src={row.productImage}
                                alt={row.productName}
                                className="h-8.5 w-8.5 rounded-lg object-cover border border-slate-200 shrink-0"
                              />
                              <div className="min-w-0 leading-tight">
                                <div className="font-bold text-slate-900 truncate text-xs">{row.productName}</div>
                                <div className="text-[10px] text-slate-400 font-semibold mt-0.5">{row.productSubtitle}</div>
                              </div>
                            </div>
                          </td>

                          {/* Event */}
                          <td className="py-3.5">
                            <span className={`inline-flex rounded px-1.5 py-0.5 text-[10px] font-bold ${getEventBadgeColor(row.eventType)}`}>
                              {row.eventType}
                            </span>
                          </td>

                          {/* User */}
                          <td className="py-3.5 text-xs font-semibold text-slate-800">
                            {row.userName}
                          </td>

                          {/* Device */}
                          <td className="py-3.5">
                            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                              {row.deviceType === "Desktop" ? (
                                <Monitor className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                              ) : (
                                <Smartphone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                              )}
                              <span>{row.deviceType}</span>
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 text-center pr-4" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => setSelectedLogId(row.id)}
                                className="p-1 rounded hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition"
                                title="View details"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-1 rounded hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition">
                                <MoreVertical className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                    {filteredLogs.length === 0 && (
                      <tr>
                        <td colSpan={10} className="py-16 text-center text-slate-400 font-bold select-none">
                          No matching logs found. Adjust filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer Pagination */}
              <div className="p-4 border-t border-slate-200 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-500 select-none bg-white">
                <span>Showing 1 to {filteredLogs.length} of {logs.length} results</span>
                
                <div className="flex items-center gap-4 flex-wrap justify-end">
                  {/* Size Selector */}
                  <div className="relative inline-flex items-center">
                    <select
                      className="appearance-none rounded-lg border border-slate-250 bg-white pl-3.5 pr-8 py-1.5 text-sm font-semibold text-slate-700 outline-none hover:border-slate-350 cursor-pointer"
                      defaultValue="10"
                    >
                      <option value="10">10 per page</option>
                      <option value="25">25 per page</option>
                      <option value="50">50 per page</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>

                  {/* Paginator */}
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white text-sm">
                    <button className="p-1.5 hover:bg-slate-50 border-r border-slate-200 text-slate-400 transition-colors">
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button className="px-3 py-1.5 bg-[#4F46E5] text-white font-bold transition-colors">
                      1
                    </button>
                    <button className="px-3 py-1.5 hover:bg-slate-50 border-l border-slate-200 text-slate-700 font-semibold transition-colors">
                      2
                    </button>
                    <button className="px-3 py-1.5 hover:bg-slate-50 border-l border-slate-200 text-slate-700 font-semibold transition-colors">
                      3
                    </button>
                    <button className="p-1.5 hover:bg-slate-50 border-l border-slate-200 text-slate-400 transition-colors">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Details Panel (3/12) */}
          <aside className="col-span-12 lg:col-span-3 space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-4.5 shadow-xs space-y-5">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-950">Disclosure Log Details</h3>
                <span className={`inline-flex rounded px-1.5 py-0.5 text-[10px] font-bold ${getEventBadgeColor(activeLog.eventType)}`}>
                  {activeLog.eventType}
                </span>
              </div>

              {/* Technical block */}
              <div className="space-y-3.5 text-xs">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Log ID</div>
                  <div className="mt-1 flex items-center gap-1.5 font-mono text-slate-900 font-semibold">
                    <span>{activeLog.id}</span>
                    <button
                      onClick={() => handleCopy(activeLog.id, "active")}
                      className="p-0.5 text-slate-400 hover:text-slate-600 transition"
                      title="Copy Log ID"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                    {copiedId === "active" && (
                      <span className="absolute text-[10px] bg-slate-900 text-white rounded px-1.5 py-0.5 -mt-6 select-none shadow">
                        Copied!
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Timestamp</div>
                  <div className="mt-1 font-semibold text-slate-705">{activeLog.utcTimestamp}</div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Placement</div>
                  <div className="mt-1">
                    <span className={`inline-flex rounded-lg px-2.5 py-0.5 text-[10px] font-bold ${getPlacementBadgeColor(activeLog.placement)}`}>
                      {activeLog.placement}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Page / Location</div>
                  <div className="mt-1 font-mono text-slate-650 leading-relaxed break-all select-all font-semibold">
                    {activeLog.pageLocation}
                  </div>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Product block */}
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Product</div>
                  <div className="mt-2 flex items-start gap-3">
                    <img
                      src={activeLog.productImage}
                      alt={activeLog.productName}
                      className="h-11 w-11 rounded-lg object-cover border border-slate-200/60 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-950 truncate leading-tight">{activeLog.productName}</div>
                      <div className="text-[10px] text-slate-400 font-semibold mt-0.5">{activeLog.productSubtitle}</div>
                      <div className="mt-1 flex items-center gap-1.5 text-[10px] font-mono text-slate-500 font-semibold select-none">
                        <span>ASIN: {activeLog.productAsin}</span>
                        <ExternalLink className="h-3 w-3 text-slate-400 hover:text-slate-600 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2.5">
                    <button className="inline-flex items-center gap-1 px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 font-semibold text-slate-700 text-[11px] transition">
                      View Product
                    </button>
                  </div>
                </div>

                {/* Event Type */}
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Event Type</div>
                  <div className="mt-1 font-semibold text-slate-800">{activeLog.eventType}</div>
                </div>

                {/* User */}
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">User</div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80"
                      alt={activeLog.userName}
                      className="h-6 w-6 rounded-full object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0 leading-tight">
                      <div className="text-xs font-bold text-slate-900 truncate">{activeLog.userName}</div>
                      <div className="text-[10px] text-slate-400 font-semibold truncate mt-0.5 flex items-center gap-1">
                        <span>{activeLog.userEmail}</span>
                        <Copy className="h-3 w-3 cursor-pointer text-slate-350 hover:text-slate-500" onClick={() => handleCopy(activeLog.userEmail, "user-email")} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Device */}
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Device</div>
                  <div className="mt-1.5 flex items-center gap-2 text-slate-750 font-semibold">
                    {activeLog.deviceType === "Desktop" ? (
                      <Monitor className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Smartphone className="h-4 w-4 text-slate-400" />
                    )}
                    <div className="leading-tight">
                      <div>{activeLog.deviceType}</div>
                      <div className="text-[10px] text-slate-400 font-normal mt-0.5">{activeLog.browserInfo}</div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-100" />

                {/* IP Address */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">IP Address</span>
                  <span className="font-semibold text-slate-800 font-mono text-[11px]">{activeLog.ipAddress}</span>
                </div>

                {/* Disclosure Text Version */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Disclosure Text Version</span>
                    <span className="font-semibold text-slate-800 mt-0.5 block">{activeLog.textVersion}</span>
                  </div>
                  <button className="px-2.5 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 font-semibold text-slate-700 text-[11px] transition">
                    View
                  </button>
                </div>

                {/* User Action */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">User Action</span>
                  <span className="font-semibold text-slate-800 mt-1 block">{activeLog.userAction}</span>
                </div>

                {/* Bottom Nav arrows */}
                <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-3.5">
                  <button className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white h-9 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs">
                    <ChevronLeft className="h-3.5 w-3.5 text-slate-400" />
                    Previous Log
                  </button>
                  <button className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white h-9 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs">
                    Next Log
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                  </button>
                </div>

              </div>

            </div>
          </aside>

        </div>

      </div>
    </div>
  );
}
