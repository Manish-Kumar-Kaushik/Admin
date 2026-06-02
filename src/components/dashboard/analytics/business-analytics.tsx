"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Eye,
  Puzzle,
  Smartphone,
  Link2,
  Bell,
  FileText,
  Flag,
  Calendar,
  ChevronDown,
  Download,
  ShoppingBag,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

// ─── Mock Data ───

// 1. Searches Over Time
const searchesData = [
  { date: "May 14", searches: 52000 },
  { date: "May 15", searches: 48000 },
  { date: "May 16", searches: 72000 },
  { date: "May 17", searches: 89000 },
  { date: "May 18", searches: 71000 },
  { date: "May 19", searches: 65000 },
  { date: "May 20", searches: 80000 },
];

// 2. Verdict Distribution
const verdictData = [
  { name: "Buy", value: 336614, pct: "38.6%", color: "#10B981" },
  { name: "Wait", value: 237432, pct: "27.2%", color: "#F59E0B" },
  { name: "Avoid", value: 175312, pct: "20.1%", color: "#EF4444" },
  { name: "Better Alternative", value: 123156, pct: "14.1%", color: "#3B82F6" },
];

// 3. Top Categories
const categoryData = [
  { name: "Electronics", value: 326115, pct: "28.3%", color: "#10B981" },
  { name: "Home & Kitchen", value: 215943, pct: "18.7%", color: "#F59E0B" },
  { name: "Beauty & Personal Care", value: 177896, pct: "15.4%", color: "#EF4444" },
  { name: "Computers", value: 141255, pct: "12.2%", color: "#3B82F6" },
  { name: "Health & Household", value: 113502, pct: "9.8%", color: "#8B5CF6" },
  { name: "Others", value: 179803, pct: "15.6%", color: "#6B7280" },
];

// 4. Top Retailers
const retailerData = [
  { name: "Amazon", percentage: 42.1 },
  { name: "Walmart", percentage: 18.7 },
  { name: "Best Buy", percentage: 11.3 },
  { name: "Target", percentage: 9.8 },
  { name: "eBay", percentage: 6.4 },
  { name: "Others", percentage: 11.7 },
];

// 5. Affiliate Clicks
const affiliateClicksData = [
  { date: "May 14", clicks: 4200 },
  { date: "May 15", clicks: 3500 },
  { date: "May 16", clicks: 6800 },
  { date: "May 17", clicks: 8200 },
  { date: "May 18", clicks: 5900 },
  { date: "May 19", clicks: 6700 },
  { date: "May 20", clicks: 9100 },
];

// 6. Price Alerts Triggered
const alertsData = [
  { date: "May 14", alerts: 1100 },
  { date: "May 15", alerts: 1500 },
  { date: "May 16", alerts: 1900 },
  { date: "May 17", alerts: 1400 },
  { date: "May 18", alerts: 1600 },
  { date: "May 19", alerts: 2100 },
  { date: "May 20", alerts: 1800 },
];

// 7. Most Viewed Products
const viewedProducts = [
  {
    rank: 1,
    name: "Apple AirPods Pro (2nd Gen)",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=120&q=80",
    category: "Electronics",
    views: "28,451",
    trend: "+15.7%",
    trendDirection: "up",
    //rising blue sparkline SVG path
    sparkline: "M 0,15 L 10,12 L 20,8 L 30,14 L 40,4 L 50,6 L 60,2",
  },
  {
    rank: 2,
    name: "Dell XPS 13 Laptop",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=120&q=80",
    category: "Computers",
    views: "19,876",
    trend: "+8.3%",
    trendDirection: "up",
    sparkline: "M 0,14 L 10,15 L 20,10 L 30,8 L 40,11 L 50,4 L 60,3",
  },
  {
    rank: 3,
    name: "Samsung Galaxy S24 Ultra",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=120&q=80",
    category: "Electronics",
    views: "18,233",
    trend: "+12.4%",
    trendDirection: "up",
    sparkline: "M 0,15 L 10,13 L 20,9 L 30,11 L 40,7 L 50,5 L 60,1",
  },
  {
    rank: 4,
    name: "iRobot Roomba j7+",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=120&q=80",
    category: "Home & Kitchen",
    views: "15,991",
    trend: "+9.8%",
    trendDirection: "up",
    sparkline: "M 0,16 L 10,14 L 20,11 L 30,13 L 40,8 L 50,7 L 60,2",
  },
  {
    rank: 5,
    name: "Sony WH-1000XM5",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&q=80",
    category: "Electronics",
    views: "14,552",
    trend: "-2.6%",
    trendDirection: "down",
    //falling red sparkline SVG path
    sparkline: "M 0,3 L 10,4 L 20,8 L 30,6 L 40,11 L 50,13 L 60,15",
  },
];

// 8. Most Flagged Products
const flaggedProducts = [
  {
    rank: 1,
    name: "XYZ Slimming Capsules",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=120&q=80",
    category: "Health & Household",
    flags: 156,
    flagType: "Unsafe Health Claim",
    flagStyle: "bg-rose-50 text-rose-600 border border-rose-100",
  },
  {
    rank: 2,
    name: "Acne Miracle Cream",
    image: "https://images.unsplash.com/photo-1608248597481-496100c80836?w=120&q=80",
    category: "Beauty & Personal Care",
    flags: 132,
    flagType: "Unsupported Claim",
    flagStyle: "bg-orange-50 text-orange-600 border border-orange-100",
  },
  {
    rank: 3,
    name: "i12 Wireless Earbuds",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=120&q=80",
    category: "Electronics",
    flags: 98,
    flagType: "Quality Issue",
    flagStyle: "bg-blue-50 text-blue-600 border border-blue-100",
  },
  {
    rank: 4,
    name: "LED Strip Lights 50ft",
    image: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=120&q=80",
    category: "Home & Kitchen",
    flags: 87,
    flagType: "Safety Concern",
    flagStyle: "bg-sky-50 text-sky-600 border border-sky-100",
  },
  {
    rank: 5,
    name: "Smart Watch X Pro",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=120&q=80",
    category: "Electronics",
    flags: 76,
    flagType: "Misleading Claim",
    flagStyle: "bg-amber-50 text-amber-600 border border-amber-100",
  },
];

const renderRetailerTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={-39} y={4} fill="#475569" fontSize={8.5} fontWeight="bold" textAnchor="start">
        {payload.value}
      </text>
    </g>
  );
};

export default function BusinessAnalytics() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-full px-4 sm:px-6 py-5 space-y-6">
        
        {/* ─── Page Header ─── */}
        <div className="w-full max-w-full pb-4 select-none">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full mt-2">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl leading-tight">
                Analytics Overview
              </h1>
              <p className="mt-1 text-xs text-slate-500 font-medium">
                Track performance, user behavior, product engagement, and admin workload.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {/* Date-Range Picker */}
              <div className="relative inline-flex items-center rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm cursor-pointer hover:border-slate-350 transition-colors">
                <Calendar className="mr-2 h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span>May 14, 2024 – May 20, 2024</span>
                <ChevronDown className="ml-2 h-3.5 w-3.5 text-slate-400 shrink-0" />
              </div>

              {/* Export Button */}
              <button className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                <Download className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* ─── 8 Stat Cards Row ─── */}
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 select-none w-full max-w-full">
          {[
            {
              title: "Product Searches",
              value: "1,248,392",
              trend: "↑ 12.6%",
              trendLabel: "vs May 7 – May 13",
              icon: Search,
              iconColor: "bg-[#EEF2FF] text-[#4F46E5]",
              trendColor: "text-emerald-600",
            },
            {
              title: "Product Verdict Views",
              value: "872,514",
              trend: "↑ 9.3%",
              trendLabel: "vs May 7 – May 13",
              icon: Eye,
              iconColor: "bg-[#EFF6FF] text-[#1E40AF]",
              trendColor: "text-emerald-600",
            },
            {
              title: "Chrome Extension Checks",
              value: "312,845",
              trend: "↑ 18.7%",
              trendLabel: "vs May 7 – May 13",
              icon: Puzzle,
              iconColor: "bg-[#FFFBEB] text-[#B45309]",
              trendColor: "text-emerald-600",
            },
            {
              title: "Mobile App Checks",
              value: "426,103",
              trend: "↑ 18.7%",
              trendLabel: "vs May 7 – May 13",
              icon: Smartphone,
              iconColor: "bg-[#E0F2FE] text-[#0369A1]",
              trendColor: "text-emerald-600",
            },
            {
              title: "Affiliate Clicks",
              value: "58,732",
              trend: "↑ 14.2%",
              trendLabel: "vs May 7 – May 13",
              icon: Link2,
              iconColor: "bg-[#ECFDF5] text-[#047857]",
              trendColor: "text-emerald-600",
            },
            {
              title: "Price Alerts Created",
              value: "23,894",
              trend: "↑ 8.8%",
              trendLabel: "vs May 7 – May 13",
              icon: Bell,
              iconColor: "bg-[#FFFDF0] text-[#D97706]",
              trendColor: "text-emerald-600",
            },
            {
              title: "Receipt Uploads",
              value: "18,562",
              trend: "↑ 11.1%",
              trendLabel: "vs May 7 – May 13",
              icon: FileText,
              iconColor: "bg-[#F5F3FF] text-[#6D28D9]",
              trendColor: "text-emerald-600",
            },
            {
              title: "User Reports",
              value: "1,243",
              trend: "↓ -4.3%",
              trendLabel: "vs May 7 – May 13",
              icon: Flag,
              iconColor: "bg-[#FEF2F2] text-[#B91C1C]",
              trendColor: "text-rose-600",
            },
          ].map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={index} className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm hover:border-slate-300 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide truncate max-w-[80%]">
                      {card.title}
                    </span>
                    <div className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${card.iconColor}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                  </div>
                  <h2 className="mt-2 text-lg font-extrabold text-slate-800 leading-none">{card.value}</h2>
                </div>
                <div className="mt-3.5">
                  <span className={`text-[10px] font-bold ${card.trendColor}`}>
                    {card.trend}
                  </span>
                  <span className="text-[9px] text-slate-400 font-semibold ml-1 leading-none block sm:inline">
                    {card.trendLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Recharts Charts Row 1 (Searches, Verdicts, Categories) ─── */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 w-full max-w-full">
          
          {/* 1. Searches Over Time Area Chart */}
          <div className="rounded-xl border border-slate-200/85 bg-white p-5 shadow-sm space-y-4 min-w-0 overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[13px] font-bold text-slate-900">Searches Over Time</h3>
              </div>
              <div className="relative inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-600 select-none cursor-pointer">
                <span>Daily</span>
                <ChevronDown className="ml-1 h-3 w-3 text-slate-400" />
              </div>
            </div>
            <div className="h-[210px] w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={searchesData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSearches" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 9 }} />
                    <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => v >= 1000 ? `${v/1000}K` : v} tick={{ fill: "#94a3b8", fontSize: 9 }} />
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "11px" }} />
                    <Area type="linear" dataKey="searches" stroke="#4F46E5" strokeWidth={2} fillOpacity={1} fill="url(#colorSearches)" dot={{ r: 3, fill: "#fff", stroke: "#4F46E5", strokeWidth: 1.5 }} isAnimationActive={true} animationDuration={1000} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* 2. Verdict Distribution Donut Chart */}
          <div className="rounded-xl border border-slate-200/85 bg-white p-5 shadow-sm space-y-4 min-w-0 overflow-hidden">
            <div>
              <h3 className="text-[13px] font-bold text-slate-900">Verdict Distribution</h3>
            </div>
            <div className="flex items-center justify-between gap-4 h-[210px] w-full">
              {/* Donut Pie */}
              <div className="relative w-[50%] h-full flex items-center justify-center">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={verdictData}
                        cx="50%"
                        cy="50%"
                        innerRadius={52}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                        isAnimationActive={true}
                        animationBegin={0}
                        animationDuration={1200}
                      >
                        {verdictData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                )}
                {/* Center Labels */}
                <div className="absolute inset-0 flex flex-col items-center justify-center select-none pt-1">
                  <span className="text-[15px] font-black text-slate-800 leading-none">872,514</span>
                  <span className="text-[9px] text-slate-400 font-semibold mt-1">Total Views</span>
                </div>
              </div>
              
              {/* Legends list */}
              <div className="w-[50%] space-y-2 select-none">
                {verdictData.map((v) => (
                  <div key={v.name} className="flex items-start gap-1.5 justify-between text-[10px]">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: v.color }} />
                      <span className="font-bold text-slate-700 truncate">{v.name}</span>
                    </div>
                    <span className="text-slate-400 font-semibold text-right shrink-0">{v.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Top Categories Donut Chart */}
          <div className="rounded-xl border border-slate-200/85 bg-white p-5 shadow-sm space-y-4 min-w-0 overflow-hidden">
            <div className="flex items-center justify-between">
              <h3 className="text-[13px] font-bold text-slate-900">Top Categories</h3>
              <span className="text-[10px] font-bold text-indigo-650 cursor-pointer hover:underline select-none">View all</span>
            </div>
            <div className="flex items-center justify-between gap-4 h-[210px] w-full">
              {/* Donut Pie */}
              <div className="relative w-[50%] h-full flex items-center justify-center">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={52}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                        isAnimationActive={true}
                        animationBegin={0}
                        animationDuration={1200}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                )}
                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center select-none">
                  <div className="h-8 w-8 rounded-full bg-slate-50 border border-slate-200/50 flex items-center justify-center text-[#6D28D9]">
                    <ShoppingBag className="h-4 w-4" />
                  </div>
                </div>
              </div>
              
              {/* Legends list */}
              <div className="w-[50%] space-y-1.5 select-none">
                {categoryData.map((c) => (
                  <div key={c.name} className="flex items-start gap-1.5 justify-between text-[10px]">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                      <span className="font-bold text-slate-700 truncate">{c.name}</span>
                    </div>
                    <span className="text-slate-400 font-semibold text-right shrink-0">{c.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ─── Recharts Charts Row 2 (Retailers, Affiliate, Price Alerts) ─── */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 w-full max-w-full">
          
          {/* 4. Top Retailers Horizontal Bar Chart */}
          <div className="rounded-xl border border-slate-200/85 bg-white pl-2 pr-4 py-4 shadow-sm space-y-2.5 min-w-0 overflow-hidden">
            <div className="flex items-center justify-between pl-2">
              <h3 className="text-[13px] font-bold text-slate-900">Top Retailers</h3>
              <span className="text-[10px] font-bold text-indigo-650 cursor-pointer hover:underline select-none">View all</span>
            </div>
            <div className="h-[210px] w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={retailerData}
                    layout="vertical"
                    margin={{ top: 0, right: 5, left: 42, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis type="number" tickFormatter={(v) => `${v}%`} tick={{ fill: "#94a3b8", fontSize: 9 }} axisLine={false} tickLine={false} />
                    <YAxis dataKey="name" type="category" tick={renderRetailerTick} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
                    <Bar dataKey="percentage" fill="#4F46E5" radius={[0, 4, 4, 0]} barSize={8} isAnimationActive={true} animationDuration={1000} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* 5. Affiliate Clicks Area Chart */}
          <div className="rounded-xl border border-slate-200/85 bg-white p-5 shadow-sm space-y-4 min-w-0 overflow-hidden">
            <div className="flex items-center justify-between">
              <h3 className="text-[13px] font-bold text-slate-900">Affiliate Clicks Over Time</h3>
              <div className="relative inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-600 select-none cursor-pointer">
                <span>Daily</span>
                <ChevronDown className="ml-1 h-3 w-3 text-slate-400" />
              </div>
            </div>
            <div className="h-[210px] w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={affiliateClicksData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 9 }} />
                    <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => v >= 1000 ? `${v/1000}K` : v} tick={{ fill: "#94a3b8", fontSize: 9 }} />
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "11px" }} />
                    <Area type="linear" dataKey="clicks" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorClicks)" dot={{ r: 3, fill: "#fff", stroke: "#3B82F6", strokeWidth: 1.5 }} isAnimationActive={true} animationDuration={1000} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* 6. Price Alerts Triggered Line Chart */}
          <div className="rounded-xl border border-slate-200/85 bg-white p-5 shadow-sm space-y-4 min-w-0 overflow-hidden">
            <div className="flex items-center justify-between">
              <h3 className="text-[13px] font-bold text-slate-900">Price Alerts Triggered</h3>
              <div className="relative inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-600 select-none cursor-pointer">
                <span>Daily</span>
                <ChevronDown className="ml-1 h-3 w-3 text-slate-400" />
              </div>
            </div>
            <div className="h-[210px] w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={alertsData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 9 }} />
                    <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => v >= 1000 ? `${v/1000}K` : v} tick={{ fill: "#94a3b8", fontSize: 9 }} />
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "11px" }} />
                    <Area type="linear" dataKey="alerts" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorAlerts)" dot={{ r: 3, fill: "#fff", stroke: "#10B981", strokeWidth: 1.5 }} isAnimationActive={true} animationDuration={1000} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

        </div>

        {/* ─── Table Lists Row 3 (Views Products, Flagged Products) ─── */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 w-full max-w-full">
          
          {/* 7. Most Viewed Products Grid Table */}
          <div className="rounded-xl border border-slate-200/85 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-[13px] font-bold text-slate-900">Most Viewed Products</h3>
              <span className="text-[10px] font-bold text-indigo-650 cursor-pointer hover:underline select-none">View all</span>
            </div>
            
            <div className="overflow-x-auto select-none">
              <table className="w-full min-w-[500px] text-xs text-left border-collapse">
                <thead>
                  <tr className="text-slate-400 font-semibold border-b border-slate-100 text-[10px] uppercase tracking-wider">
                    <th className="py-2.5 w-[6%] text-center">#</th>
                    <th className="py-2.5 w-[36%]">Product</th>
                    <th className="py-2.5 w-[20%]">Category</th>
                    <th className="py-2.5 w-[15%] text-center">Verdict Views</th>
                    <th className="py-2.5 pr-2 w-[23%] text-center">Trend (vs last 7 days)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-700">
                  {viewedProducts.map((p) => {
                    const isUp = p.trendDirection === "up";
                    return (
                      <tr key={p.rank} className="hover:bg-slate-50/20 transition-colors">
                        <td className="py-3 text-center font-bold text-slate-400">
                          {p.rank}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="h-8 w-8 rounded-lg object-cover border border-slate-200 shrink-0"
                            />
                            <span className="font-bold text-slate-800 truncate max-w-[150px]">{p.name}</span>
                          </div>
                        </td>
                        <td className="py-3 text-slate-550 font-semibold">
                          {p.category}
                        </td>
                        <td className="py-3 text-center font-extrabold text-slate-800">
                          {p.views}
                        </td>
                        <td className="py-3 pr-2">
                          <div className="flex items-center justify-between gap-3">
                            <span className={`font-extrabold text-[11px] shrink-0 text-right w-12 ${
                              isUp ? "text-emerald-600" : "text-rose-600"
                            }`}>
                              {p.trend}
                            </span>
                            {/* Premium Miniature Sparkline SVG Graph */}
                            <svg className="w-14 h-6 shrink-0" overflow="visible">
                              <path
                                d={p.sparkline}
                                fill="none"
                                stroke={isUp ? "#10B981" : "#EF4444"}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* 8. Most Flagged Products Grid Table */}
          <div className="rounded-xl border border-slate-200/85 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-[13px] font-bold text-slate-900">Most Flagged Products</h3>
              <span className="text-[10px] font-bold text-indigo-650 cursor-pointer hover:underline select-none">View all</span>
            </div>
            
            <div className="overflow-x-auto select-none">
              <table className="w-full min-w-[500px] text-xs text-left border-collapse">
                <thead>
                  <tr className="text-slate-400 font-semibold border-b border-slate-100 text-[10px] uppercase tracking-wider">
                    <th className="py-2.5 w-[6%] text-center">#</th>
                    <th className="py-2.5 w-[36%]">Product</th>
                    <th className="py-2.5 w-[20%]">Category</th>
                    <th className="py-2.5 w-[10%] text-center pr-4">Flags</th>
                    <th className="py-2.5 w-[28%] pl-4">Top Flag Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-700">
                  {flaggedProducts.map((p) => {
                    return (
                      <tr key={p.rank} className="hover:bg-slate-50/20 transition-colors">
                        <td className="py-3 text-center font-bold text-slate-400">
                          {p.rank}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="h-8 w-8 rounded-lg object-cover border border-slate-200 shrink-0"
                            />
                            <span className="font-bold text-slate-800 truncate max-w-[150px]">{p.name}</span>
                          </div>
                        </td>
                        <td className="py-3 text-slate-550 font-semibold">
                          {p.category}
                        </td>
                        <td className="py-3 text-center font-extrabold text-slate-800 pr-4">
                          {p.flags}
                        </td>
                        <td className="py-3 pl-4">
                          <span className={`inline-flex rounded-lg px-2 py-0.5 text-[10px] font-bold ${p.flagStyle}`}>
                            {p.flagType}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
