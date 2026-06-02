"use client";

import React, { useState, useEffect } from "react";
import {
  Link2,
  CheckCircle2,
  DollarSign,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Calendar,
  ChevronDown,
  Download,
  Info,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
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
} from "recharts";

// ─── Data & Helpers ──────────────────────────────────────────────────────────

const fmt = (n: number) => n.toLocaleString();
const fmtCurrency = (n: number) =>
  `$${n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

// 1. Clicks Over Time Data
const clicksOverTimeData = [
  { date: "May 14", clicks: 5200 },
  { date: "May 15", clicks: 4800 },
  { date: "May 16", clicks: 7200 },
  { date: "May 17", clicks: 8900 },
  { date: "May 18", clicks: 7100 },
  { date: "May 19", clicks: 6500 },
  { date: "May 20", clicks: 8000 },
];

// 2. Non-Affiliate Recommendation Data
const recommendationData = [
  { date: "May 14", recs: 1800 },
  { date: "May 15", recs: 2400 },
  { date: "May 16", recs: 2200 },
  { date: "May 17", recs: 2150 },
  { date: "May 18", recs: 2800 },
  { date: "May 19", recs: 3100 },
  { date: "May 20", recs: 2950 },
];

// 3. Top Partners by Clicks Data (Donut)
const topPartnersPieData = [
  { name: "Amazon Associates", value: 25380, pct: 43.2, color: "#4F46E5" },
  { name: "ShareASale", value: 9874, pct: 16.8, color: "#F59E0B" },
  { name: "Impact", value: 7402, pct: 12.6, color: "#EF4444" },
  { name: "CJ Affiliate", value: 5464, pct: 9.3, color: "#3B82F6" },
  { name: "Awin", value: 3812, pct: 6.5, color: "#EC4899" },
  { name: "Others", value: 6800, pct: 11.6, color: "#94A3B8" },
];

// 4. Disclosure Coverage Data (Donut)
const disclosurePieData = [
  { name: "With Disclosure", value: 24821, pct: 98.6, color: "#10B981" },
  { name: "Missing Disclosure", value: 356, pct: 1.4, color: "#EF4444" },
];

// 5. Top Products by Clicks
const topProducts = [
  { rank: 1, name: "Apple AirPods Pro (2nd Gen)", clicks: 2845 },
  { rank: 2, name: "Dyson V15 Detect Cordless Vacuum", clicks: 2341 },
  { rank: 3, name: "Ninja AF101 Air Fryer", clicks: 1987 },
  { rank: 4, name: "Samsung Galaxy S24 Ultra", clicks: 1876 },
  { rank: 5, name: "Sony WH-1000XM5 Headphones", clicks: 1642 },
];

// 6. Partner Performance Table Data
const partnerPerformance = [
  {
    name: "Amazon Associates",
    logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=50&q=80",
    clicks: 25380,
    conversions: 1942,
    rate: "7.65%",
    revenue: 8745.32,
    brokenLinks: 18,
    activeProducts: 12842,
    coverage: "99.1%",
    coverageLevel: "Excellent",
    coverageColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    name: "ShareASale",
    logo: "",
    clicks: 9874,
    conversions: 842,
    rate: "8.53%",
    revenue: 3412.88,
    brokenLinks: 62,
    activeProducts: 8921,
    coverage: "97.8%",
    coverageLevel: "Excellent",
    coverageColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    name: "Impact",
    logo: "",
    clicks: 7402,
    conversions: 612,
    rate: "8.26%",
    revenue: 2785.14,
    brokenLinks: 34,
    activeProducts: 6532,
    coverage: "98.3%",
    coverageLevel: "Excellent",
    coverageColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    name: "CJ Affiliate",
    logo: "",
    clicks: 5464,
    conversions: 421,
    rate: "7.71%",
    revenue: 1984.67,
    brokenLinks: 51,
    activeProducts: 5112,
    coverage: "96.2%",
    coverageLevel: "Good",
    coverageColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    name: "Awin",
    logo: "",
    clicks: 3812,
    conversions: 278,
    rate: "7.29%",
    revenue: 1256.91,
    brokenLinks: 79,
    activeProducts: 3542,
    coverage: "95.4%",
    coverageLevel: "Good",
    coverageColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    name: "Others",
    logo: "",
    clicks: 6800,
    conversions: 226,
    rate: "3.32%",
    revenue: 746.22,
    brokenLinks: 68,
    activeProducts: 4987,
    coverage: "95.7%",
    coverageLevel: "Good",
    coverageColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
];

// ─── Main Component ──────────────────────────────────────────────────────────

export default function AffiliateAnalytics() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-full px-2 sm:px-4 md:px-6 py-4 space-y-6">

        {/* ─── Page Header ─── */}
        <div className="w-full select-none">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between w-full">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl leading-tight">
                Affiliate Analytics
              </h1>
              <p className="mt-1 text-xs text-slate-500 font-medium">
                Track affiliate performance, partner activity, and revenue impact.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {/* Date Selector */}
              <div className="relative inline-flex items-center rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm cursor-pointer hover:border-slate-300 transition-colors">
                <Calendar className="mr-2 h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span>May 14, 2024 — May 20, 2024</span>
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

        {/* ─── 6 Stat Cards ─── */}
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 w-full select-none">
          {/* Card 1: Affiliate Clicks */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300 transition-colors flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Total Affiliate Clicks</span>
              <div className="h-7 w-7 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <Link2 className="h-3.5 w-3.5 text-indigo-600" />
              </div>
            </div>
            <div className="text-xl font-extrabold text-slate-900 leading-none">58,732</div>
            <div className="text-[10px] text-slate-500 font-medium">
              <span className="text-emerald-600 font-bold">↑ 14.2%</span> vs May 7 – 13
            </div>
          </div>

          {/* Card 2: Conversions */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300 transition-colors flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Conversions</span>
              <div className="h-7 w-7 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-3.5 w-3.5 text-purple-600" />
              </div>
            </div>
            <div className="text-xl font-extrabold text-slate-900 leading-none">4,321</div>
            <div className="text-[10px] text-slate-500 font-medium">
              <span className="text-emerald-600 font-bold">↑ 11.6%</span> vs May 7 – 13
            </div>
          </div>

          {/* Card 3: Estimated Revenue */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300 transition-colors flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Estimated Revenue</span>
              <div className="h-7 w-7 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
              </div>
            </div>
            <div className="text-xl font-extrabold text-slate-900 leading-none">$18,932.14</div>
            <div className="text-[10px] text-slate-500 font-medium">
              <span className="text-emerald-600 font-bold">↑ 13.7%</span> vs May 7 – 13
            </div>
          </div>

          {/* Card 4: Broken Links */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300 transition-colors flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Broken Links Detected</span>
              <div className="h-7 w-7 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
              </div>
            </div>
            <div className="text-xl font-extrabold text-slate-900 leading-none">312</div>
            <div className="text-[10px] text-slate-500 font-medium">
              <span className="text-rose-600 font-bold">↓ 8.3%</span> vs May 7 – 13
            </div>
          </div>

          {/* Card 5: Recommendations */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300 transition-colors flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Non-Affiliate Recs</span>
              <div className="h-7 w-7 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <FileText className="h-3.5 w-3.5 text-blue-600" />
              </div>
            </div>
            <div className="text-xl font-extrabold text-slate-900 leading-none">12,845</div>
            <div className="text-[10px] text-slate-500 font-medium">
              <span className="text-emerald-600 font-bold">↑ 17.8%</span> vs May 7 – 13
            </div>
          </div>

          {/* Card 6: Disclosure Coverage */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300 transition-colors flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Disclosure Coverage</span>
              <div className="h-7 w-7 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
              </div>
            </div>
            <div className="text-xl font-extrabold text-slate-900 leading-none">98.6%</div>
            <div className="text-[10px] text-slate-500 font-medium">
              <span className="text-emerald-600 font-bold">↑ 1.2%</span> vs May 7 – 13
            </div>
          </div>
        </div>

        {/* ─── Row 1: Click Chart + Donut Partners + Top Products ─── */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 w-full max-w-full">
          {/* 1. Affiliate Clicks Over Time */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3 min-w-0 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="text-[13px] font-bold text-slate-900">Affiliate Clicks Over Time</h3>
              <div className="relative inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-600 select-none cursor-pointer">
                <span>Daily</span>
                <ChevronDown className="ml-1 h-3 w-3 text-slate-400" />
              </div>
            </div>
            <div className="h-[210px] w-full relative">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={clicksOverTimeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradClicks" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity={0.45} />
                        <stop offset="100%" stopColor="#a5b4fc" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="#e2e8f0" />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 9 }} />
                    <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}K`} tick={{ fill: "#94a3b8", fontSize: 9 }} />
                    <Tooltip
                      contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "11px" }}
                      formatter={(v: number) => [`${fmt(v)} clicks`, "Clicks"]}
                    />
                    <Area type="linear" dataKey="clicks" stroke="#6366f1" strokeWidth={2.5} fill="url(#gradClicks)" dot={{ r: 4, fill: "#fff", stroke: "#6366f1", strokeWidth: 2 }} activeDot={{ r: 6 }} isAnimationActive={true} animationDuration={1000} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* 2. Top Partners by Clicks Donut */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3 min-w-0 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="text-[13px] font-bold text-slate-900">Top Partners by Clicks</h3>
              <span className="text-[10px] font-bold text-indigo-600 cursor-pointer hover:underline select-none">View all</span>
            </div>
            <div className="flex flex-row items-center justify-between gap-4 flex-1">
              <div className="relative h-[150px] w-[150px] shrink-0">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={topPartnersPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value" isAnimationActive={true} animationDuration={1000}>
                        {topPartnersPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none leading-none">
                  <span className="text-sm font-extrabold text-slate-800">58,732</span>
                  <span className="text-[8px] text-slate-400 font-bold uppercase mt-1">Total Clicks</span>
                </div>
              </div>
              <div className="space-y-1.5 flex-1 min-w-0">
                {topPartnersPieData.map((partner) => (
                  <div key={partner.name} className="flex items-center justify-between gap-2 text-[10.5px]">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: partner.color }} />
                      <span className="text-slate-600 font-medium truncate">{partner.name}</span>
                    </div>
                    <span className="text-slate-800 font-bold shrink-0">{partner.pct}% <span className="text-[9px] text-slate-400 font-medium">({fmt(partner.value)})</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Top Products by Affiliate Clicks List */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3 min-w-0 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="text-[13px] font-bold text-slate-900">Top Products by Affiliate Clicks</h3>
              <span className="text-[10px] font-bold text-indigo-600 cursor-pointer hover:underline select-none">View all</span>
            </div>
            <div className="space-y-2.5 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-50">
                <div className="flex items-center gap-2">
                  <span className="w-4 text-center">#</span>
                  <span>Product</span>
                </div>
                <span>Clicks</span>
              </div>
              {topProducts.map((p) => (
                <div key={p.rank} className="flex items-center justify-between gap-3 text-[11px]">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-4 text-center font-bold text-slate-400 shrink-0">{p.rank}</span>
                    <span className="text-slate-700 font-semibold truncate">{p.name}</span>
                  </div>
                  <span className="font-extrabold text-slate-800 shrink-0">{fmt(p.clicks)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Row 2: Broken Link Impact + Rec Count Chart + Donut Coverage ─── */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 w-full max-w-full">
          {/* 1. Broken Link Impact */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 min-w-0 overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <h3 className="text-[13px] font-bold text-slate-900">Broken Link Impact</h3>
                <span title="The revenue and click impact of detected broken affiliate links">
                  <Info className="h-3.5 w-3.5 text-slate-400" />
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 border-y border-slate-100 py-3 select-none">
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Broken Links</span>
                <span className="text-lg font-extrabold text-rose-600 leading-none">312</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Lost Clicks (Est.)</span>
                <span className="text-lg font-extrabold text-slate-800 leading-none">1,842</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Lost Revenue (Est.)</span>
                <span className="text-lg font-extrabold text-slate-800 leading-none">$592.18</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-slate-500">Resolution Rate</span>
                <span className="text-emerald-600">72%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "72%" }} />
              </div>
            </div>
            <span className="text-[11px] font-bold text-indigo-600 hover:underline cursor-pointer select-none">
              View broken links
            </span>
          </div>

          {/* 2. Non-Affiliate Recommendation Count */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3 min-w-0 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <h3 className="text-[13px] font-bold text-slate-900">Non-Affiliate Recommendation Count</h3>
                <span title="Total recommended products that are not currently monetized">
                  <Info className="h-3.5 w-3.5 text-slate-400" />
                </span>
              </div>
              <div className="relative inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-600 select-none cursor-pointer">
                <span>Daily</span>
                <ChevronDown className="ml-1 h-3 w-3 text-slate-400" />
              </div>
            </div>
            <div className="h-[140px] w-full relative">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={recommendationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradRecs" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="#e2e8f0" />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 9 }} />
                    <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}K`} tick={{ fill: "#94a3b8", fontSize: 9 }} />
                    <Tooltip
                      contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "11px" }}
                      formatter={(v: number) => [`${fmt(v)} recs`, "Count"]}
                    />
                    <Area type="linear" dataKey="recs" stroke="#4F46E5" strokeWidth={2} fill="url(#gradRecs)" dot={{ r: 3, fill: "#fff", stroke: "#4F46E5", strokeWidth: 1.5 }} activeDot={{ r: 5 }} isAnimationActive={true} animationDuration={1000} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* 3. Disclosure Coverage Donut */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3 min-w-0 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <h3 className="text-[13px] font-bold text-slate-900">Disclosure Coverage</h3>
                <span title="Percentage of recommendations with appropriate affiliate disclosures">
                  <Info className="h-3.5 w-3.5 text-slate-400" />
                </span>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between gap-4 flex-1">
              <div className="relative h-[110px] w-[110px] shrink-0">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={disclosurePieData} cx="50%" cy="50%" innerRadius={35} outerRadius={50} paddingAngle={2} dataKey="value" isAnimationActive={true} animationDuration={1000}>
                        {disclosurePieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none leading-none">
                  <span className="text-xs font-extrabold text-slate-800">98.6%</span>
                  <span className="text-[7px] text-slate-400 font-bold uppercase mt-1">Coverage</span>
                </div>
              </div>
              <div className="space-y-3 flex-1 min-w-0">
                {disclosurePieData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between gap-2 text-[11px]">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-600 font-semibold truncate">{item.name}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-slate-800 font-extrabold text-xs">{fmt(item.value)}</div>
                      <div className="text-[9px] text-slate-400 font-medium">({item.pct}%)</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Row 3: Affiliate Partner Performance Table ─── */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm min-w-0 overflow-hidden">
          {/* Table Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <h3 className="text-[13px] font-bold text-slate-900">Affiliate Partner Performance</h3>
              <span title="Detailed metrics for active affiliate programs">
                <Info className="h-3.5 w-3.5 text-slate-400" />
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button className="inline-flex items-center gap-1.5 h-8 px-3 text-[12px] font-medium text-slate-600 border border-slate-200 bg-white rounded-lg hover:bg-slate-50 transition-colors">
                <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
                Columns
              </button>
              <div className="relative inline-flex items-center rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 select-none cursor-pointer">
                <span>25 per page</span>
                <ChevronDown className="ml-1 h-3 w-3 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-xs text-left border-collapse">
              <thead>
                <tr className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-100">
                  <th className="px-5 py-3 w-[20%]">Partner</th>
                  <th className="px-3 py-3 text-right">Clicks</th>
                  <th className="px-3 py-3 text-right">Conversions</th>
                  <th className="px-3 py-3 text-right">Conversion Rate</th>
                  <th className="px-3 py-3 text-right">Estimated Revenue</th>
                  <th className="px-3 py-3 text-right">Broken Links</th>
                  <th className="px-3 py-3 text-right">Active Products</th>
                  <th className="px-3 py-3 text-center">Disclosure Coverage</th>
                  <th className="px-5 py-3 w-[8%] text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {partnerPerformance.map((row) => (
                  <tr key={row.name} className="hover:bg-slate-50/60 transition-colors">
                    {/* Partner Logo/Name */}
                    <td className="px-5 py-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="h-8 w-8 rounded-lg border border-slate-200 shrink-0 bg-slate-50 flex items-center justify-center shadow-sm overflow-hidden">
                          {row.logo ? (
                            <img src={row.logo} alt={row.name} className="h-full w-full object-cover" />
                          ) : (
                            <Link2 className="h-4 w-4 text-slate-400" />
                          )}
                        </div>
                        <span className="font-bold text-slate-800 truncate text-[11.5px]">{row.name}</span>
                      </div>
                    </td>

                    {/* Clicks */}
                    <td className="px-3 py-2 text-right font-semibold text-slate-700">{fmt(row.clicks)}</td>

                    {/* Conversions */}
                    <td className="px-3 py-2 text-right font-semibold text-slate-700">{fmt(row.conversions)}</td>

                    {/* Rate */}
                    <td className="px-3 py-2 text-right font-semibold text-slate-800">{row.rate}</td>

                    {/* Revenue */}
                    <td className="px-3 py-2 text-right font-extrabold text-slate-800">{fmtCurrency(row.revenue)}</td>

                    {/* Broken Links */}
                    <td className={`px-3 py-2 text-right font-bold ${row.brokenLinks > 20 ? "text-amber-600" : "text-slate-700"}`}>
                      {row.brokenLinks}
                    </td>

                    {/* Active Products */}
                    <td className="px-3 py-2 text-right font-semibold text-slate-700">{fmt(row.activeProducts)}</td>

                    {/* Disclosure Coverage badge */}
                    <td className="px-3 py-2 text-center">
                      <div className="flex flex-col items-center leading-none">
                        <span className="font-extrabold text-[11.5px] text-slate-800">{row.coverage}</span>
                        <span className={`inline-flex px-1.5 py-0.5 rounded text-[8px] font-extrabold border mt-1 select-none ${row.coverageColor}`}>
                          {row.coverageLevel}
                        </span>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-5 py-2 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="h-7 px-2.5 text-[11px] font-bold text-blue-600 border border-slate-200 bg-white rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors shadow-sm">
                          View
                        </button>
                        <button className="h-7 w-5 flex items-center justify-center border border-slate-200 bg-white rounded-lg hover:bg-slate-50 transition-colors text-slate-500 shadow-sm">
                          <ChevronDown className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-5 py-3.5 bg-slate-50/50 border-t border-slate-100">
            <span className="text-[12px] text-slate-500 font-medium select-none">Showing 1 to 6 of 6 partners</span>
            <div className="flex items-center gap-1.5">
              <button className="w-7 h-7 flex items-center justify-center border border-slate-200 bg-white rounded text-slate-400 hover:text-slate-700 transition-colors" disabled>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded text-[12px] font-semibold bg-indigo-600 text-white shadow-sm">
                1
              </button>
              <button className="w-7 h-7 flex items-center justify-center border border-slate-200 bg-white rounded text-slate-400 hover:text-slate-700 transition-colors" disabled>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
