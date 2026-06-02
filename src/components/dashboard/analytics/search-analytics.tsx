"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Link2,
  Barcode,
  XCircle,
  CheckCircle2,
  Calendar,
  ChevronDown,
  Download,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// ─── Data ───────────────────────────────────────────────────────────────────

const searchVolumeData = [
  { date: "May 14", searches: 78000 },
  { date: "May 15", searches: 82000 },
  { date: "May 16", searches: 76000 },
  { date: "May 17", searches: 91000 },
  { date: "May 18", searches: 88000 },
  { date: "May 19", searches: 105000 },
  { date: "May 20", searches: 98000 },
];

const topSearchQueries = [
  { rank: 1, query: "iphone 15 case",       count: 12854 },
  { rank: 2, query: "air fryer",             count: 10321 },
  { rank: 3, query: "protein powder",        count: 9876 },
  { rank: 4, query: "dyson v15",             count: 8765 },
  { rank: 5, query: "laptop stand",          count: 7654 },
];

const noResultSearches = [
  { rank: 1, query: "obscure anime figure",      count: 3421 },
  { rank: 2, query: "vintage toy parts",         count: 2987 },
  { rank: 3, query: "discontinued phone model",  count: 2654 },
  { rank: 4, query: "rare book collection",      count: 1987 },
  { rank: 5, query: "russian vitamin supplement",count: 1543 },
];

const productUrlChecks = [
  { rank: 1, url: "amazon.com/dp/B08NSW8RVW",   count: 5432 },
  { rank: 2, url: "walmart.com/ip/174123456",   count: 4321 },
  { rank: 3, url: "bestbuy.com/site/sku123456", count: 3876 },
  { rank: 4, url: "target.com/p/iphone-15-case",count: 3211 },
  { rank: 5, url: "ebay.com/itm/325660123456",  count: 2987 },
];

const barcodeScans = [
  { rank: 1, code: "012345678905", count: 6543 },
  { rank: 2, code: "043000098765", count: 5432 },
  { rank: 3, code: "036000291452", count: 4221 },
  { rank: 4, code: "885010234568", count: 3210 },
  { rank: 5, code: "071249943321", count: 2876 },
];

const categoryDemand = [
  { name: "Electronics",              pct: 28.4 },
  { name: "Home & Kitchen",           pct: 18.7 },
  { name: "Beauty & Personal Care",   pct: 15.2 },
  { name: "Clothing, Shoes & Jewelry",pct: 12.8 },
  { name: "Health & Household",       pct: 9.3 },
  { name: "Sports & Outdoors",        pct: 7.1 },
  { name: "Others",                   pct: 8.5 },
];

const retailerDemand = [
  { name: "Amazon",     pct: 42.6 },
  { name: "Walmart",    pct: 18.9 },
  { name: "Target",     pct: 9.6 },
  { name: "Best Buy",   pct: 11.2 },
  { name: "eBay",       pct: 6.7 },
  { name: "Home Depot", pct: 4.6 },
  { name: "Others",     pct: 6.4 },
];

const queryPerformance = [
  {
    rank: 1,
    query: "iphone 15 case",
    searchCount: 12854,
    resultRate: 94.6,
    resultRateColor: "text-emerald-600",
    topProduct: "Selpien Ultra Hybrid Case for iPhone 15",
    asin: "B0CHKX1CYG",
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=80&q=80",
    noResultRate: 5.4,
    noResultRateColor: "text-emerald-600",
    lastSearched: "May 20, 2024 10:15 AM",
  },
  {
    rank: 2,
    query: "air fryer",
    searchCount: 10321,
    resultRate: 91.2,
    resultRateColor: "text-emerald-600",
    topProduct: "Ninja AF101 Air Fryer",
    asin: "B07FGBQKJ0",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=80&q=80",
    noResultRate: 8.8,
    noResultRateColor: "text-rose-600",
    lastSearched: "May 20, 2024 09:58 AM",
  },
  {
    rank: 3,
    query: "protein powder",
    searchCount: 9876,
    resultRate: 87.1,
    resultRateColor: "text-emerald-600",
    topProduct: "Optimum Nutrition Gold Standard Whey",
    asin: "B000QGSYGI",
    image: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=80&q=80",
    noResultRate: 12.9,
    noResultRateColor: "text-rose-600",
    lastSearched: "May 20, 2024 09:47 AM",
  },
  {
    rank: 4,
    query: "dyson v15",
    searchCount: 8765,
    resultRate: 93.0,
    resultRateColor: "text-emerald-600",
    topProduct: "Dyson V15 Detect Cordless Vacuum",
    asin: "B08NB8KZ2P",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&q=80",
    noResultRate: 7.0,
    noResultRateColor: "text-emerald-600",
    lastSearched: "May 20, 2024 09:32 AM",
  },
  {
    rank: 5,
    query: "lego medieval castle",
    searchCount: 6543,
    resultRate: 61.3,
    resultRateColor: "text-amber-500",
    topProduct: "—",
    asin: "",
    image: "",
    noResultRate: 38.7,
    noResultRateColor: "text-rose-600",
    lastSearched: "May 20, 2024 09:28 AM",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmtNum = (n: number) => n.toLocaleString();

const HBar = ({
  pct,
  color,
  max,
}: {
  pct: number;
  color: string;
  max: number;
}) => (
  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden min-w-0">
    <div
      className={`h-full rounded-full ${color}`}
      style={{ width: `${(pct / max) * 100}%` }}
    />
  </div>
);

// ─── Component ───────────────────────────────────────────────────────────────

export default function SearchAnalytics() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const catMax = Math.max(...categoryDemand.map((c) => c.pct));
  const retMax = Math.max(...retailerDemand.map((r) => r.pct));

  const filteredQueries = queryPerformance.filter((q) =>
    q.query.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-full px-2 sm:px-4 md:px-6 py-4 space-y-6">

        {/* ─── Page Header ─── */}
        <div className="w-full max-w-full select-none">


          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between w-full">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl leading-tight">
                Search Analytics
              </h1>
              <p className="mt-1 text-xs text-slate-500 font-medium">
                Track what users search for, how often, and how well we return results.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {/* Date Range */}
              <div className="relative inline-flex items-center rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm cursor-pointer hover:border-slate-300 transition-colors">
                <Calendar className="mr-2 h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span>May 14, 2024 — May 20, 2024</span>
                <ChevronDown className="ml-2 h-3.5 w-3.5 text-slate-400 shrink-0" />
              </div>
              {/* Export */}
              <button className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                <Download className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* ─── 5 Stat Cards ─── */}
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 w-full select-none">
          {/* Total Searches */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300 transition-colors flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Total Searches</span>
              <div className="h-7 w-7 rounded-lg bg-[#EEF2FF] flex items-center justify-center shrink-0">
                <Search className="h-3.5 w-3.5 text-[#4F46E5]" />
              </div>
            </div>
            <div className="text-xl font-extrabold text-slate-900 leading-none">1,248,392</div>
            <div className="text-[10px] text-slate-500 font-medium">
              <span className="text-emerald-600 font-bold">↑ 12.4%</span> vs May 7 – 13
            </div>
          </div>

          {/* Result Rate */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300 transition-colors flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Result Rate</span>
              <div className="h-7 w-7 rounded-lg bg-[#ECFDF5] flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              </div>
            </div>
            <div className="text-xl font-extrabold text-slate-900 leading-none">82.7%</div>
            <div className="text-[10px] text-slate-500 font-medium">
              <span className="text-emerald-600 font-bold">↑ 3.2%</span> vs May 7 – 13
            </div>
          </div>

          {/* No-Result Rate */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300 transition-colors flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">No-Result Rate</span>
              <div className="h-7 w-7 rounded-lg bg-[#FFF1F2] flex items-center justify-center shrink-0">
                <XCircle className="h-3.5 w-3.5 text-rose-500" />
              </div>
            </div>
            <div className="text-xl font-extrabold text-slate-900 leading-none">17.3%</div>
            <div className="text-[10px] text-slate-500 font-medium">
              <span className="text-rose-600 font-bold">↓ 3.2%</span> vs May 7 – 13
            </div>
          </div>

          {/* Product URL Checks */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300 transition-colors flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Product URL Checks</span>
              <div className="h-7 w-7 rounded-lg bg-[#EFF6FF] flex items-center justify-center shrink-0">
                <Link2 className="h-3.5 w-3.5 text-blue-600" />
              </div>
            </div>
            <div className="text-xl font-extrabold text-slate-900 leading-none">312,845</div>
            <div className="text-[10px] text-slate-500 font-medium">
              <span className="text-emerald-600 font-bold">↑ 18.7%</span> vs May 7 – 13
            </div>
          </div>

          {/* Barcode Scans */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300 transition-colors flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Barcode Scans</span>
              <div className="h-7 w-7 rounded-lg bg-[#FFFBEB] flex items-center justify-center shrink-0">
                <Barcode className="h-3.5 w-3.5 text-amber-600" />
              </div>
            </div>
            <div className="text-xl font-extrabold text-slate-900 leading-none">85,621</div>
            <div className="text-[10px] text-slate-500 font-medium">
              <span className="text-emerald-600 font-bold">↑ 16.4%</span> vs May 7 – 13
            </div>
          </div>
        </div>

        {/* ─── Row 1: Search Volume Chart + Top Queries + No-Result Searches ─── */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-5 w-full max-w-full">

          {/* Search Volume Over Time */}
          <div className="lg:col-span-3 rounded-xl border border-slate-200/85 bg-white p-5 shadow-sm space-y-3 min-w-0 overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <h3 className="text-[13px] font-bold text-slate-900">Search Volume Over Time</h3>
                <span title="Daily search counts over the selected period">
                  <Info className="h-3.5 w-3.5 text-slate-400" />
                </span>
              </div>
              <div className="relative inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-600 select-none cursor-pointer">
                <span>Daily</span>
                <ChevronDown className="ml-1 h-3 w-3 text-slate-400" />
              </div>
            </div>
            <div className="h-[230px] w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={searchVolumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradSearchArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#818cf8" stopOpacity={0.45} />
                        <stop offset="100%" stopColor="#c7d2fe" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="#e2e8f0" />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 9 }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `${v / 1000}K`}
                      tick={{ fill: "#94a3b8", fontSize: 9 }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#fff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "10px",
                        fontSize: "11px",
                        boxShadow: "0 4px 16px rgba(79,70,229,0.10)",
                      }}
                      formatter={(v: number) => [`${fmtNum(v)} searches`, "Volume"]}
                      labelStyle={{ color: "#64748b", fontWeight: 600 }}
                    />
                    <Area
                      type="linear"
                      dataKey="searches"
                      stroke="#6366f1"
                      strokeWidth={2.5}
                      fill="url(#gradSearchArea)"
                      dot={{ r: 4, fill: "#fff", stroke: "#6366f1", strokeWidth: 2 }}
                      activeDot={{ r: 6, fill: "#6366f1", stroke: "#fff", strokeWidth: 2 }}
                      isAnimationActive={true}
                      animationDuration={1000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Right column: Side-by-side vertical stacks */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 min-w-0 items-start">
            
            {/* Left Stack: Top Search Queries + Product URL Checks */}
            <div className="flex flex-col gap-6 w-full">
              {/* Top Search Queries */}
              <div className="rounded-xl border border-slate-200/85 bg-white p-4 shadow-sm space-y-3 min-w-0 overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-[12px] font-bold text-slate-900">Top Search Queries</h3>
                    <span title="Most searched terms in the selected period">
                      <Info className="h-3 w-3 text-slate-400" />
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-600 cursor-pointer hover:underline select-none">View all</span>
                </div>
                <div className="space-y-2">
                  {topSearchQueries.map((q) => (
                    <div key={q.rank} className="flex items-center gap-2.5 text-[11px]">
                      <span className="w-4 text-center font-bold text-slate-400 shrink-0">{q.rank}</span>
                      <span className="flex-1 text-slate-700 font-medium truncate">{q.query}</span>
                      <span className="font-bold text-slate-800 shrink-0">{fmtNum(q.count)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product URL Checks */}
              <div className="rounded-xl border border-slate-200/85 bg-white p-4 shadow-sm space-y-3 min-w-0 overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-[12px] font-bold text-slate-900">Product URL Checks</h3>
                    <span title="URLs checked via extension or mobile app">
                      <Info className="h-3 w-3 text-slate-400" />
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-600 cursor-pointer hover:underline select-none">View all</span>
                </div>
                <div className="space-y-2">
                  {productUrlChecks.map((item) => (
                    <div key={item.rank} className="flex items-center gap-2.5 text-[11px]">
                      <span className="w-4 text-center font-bold text-slate-400 shrink-0">{item.rank}</span>
                      <span className="flex-1 text-blue-600 font-medium truncate min-w-0">{item.url}</span>
                      <span className="font-bold text-slate-800 shrink-0">{fmtNum(item.count)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Stack: No-Result Searches + Barcode Scans */}
            <div className="flex flex-col gap-6 w-full">
              {/* No-Result Searches */}
              <div className="rounded-xl border border-slate-200/85 bg-white p-4 shadow-sm space-y-3 min-w-0 overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-[12px] font-bold text-slate-900">No-Result Searches</h3>
                    <span title="Searches that returned zero product results">
                      <Info className="h-3 w-3 text-slate-400" />
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-600 cursor-pointer hover:underline select-none">View all</span>
                </div>
                <div className="space-y-2">
                  {noResultSearches.map((q) => (
                    <div key={q.rank} className="flex items-center gap-2.5 text-[11px]">
                      <span className="w-4 text-center font-bold text-slate-400 shrink-0">{q.rank}</span>
                      <span className="flex-1 text-slate-700 font-medium truncate">{q.query}</span>
                      <span className="font-bold text-rose-600 shrink-0">{fmtNum(q.count)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Barcode Scans */}
              <div className="rounded-xl border border-slate-200/85 bg-white p-4 shadow-sm space-y-3 min-w-0 overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-[12px] font-bold text-slate-900">Barcode Scans</h3>
                    <span title="Product barcodes scanned via mobile app">
                      <Info className="h-3 w-3 text-slate-400" />
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-600 cursor-pointer hover:underline select-none">View all</span>
                </div>
                <div className="space-y-2">
                  {barcodeScans.map((item) => (
                    <div key={item.rank} className="flex items-center gap-2.5 text-[11px]">
                      <span className="w-4 text-center font-bold text-slate-400 shrink-0">{item.rank}</span>
                      <span className="flex-1 font-mono text-slate-700 font-medium tracking-wide">{item.code}</span>
                      <span className="font-bold text-slate-800 shrink-0">{fmtNum(item.count)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ─── Row 3: Category Demand + Retailer Demand (Horizontal Bars) ─── */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 w-full max-w-full">

          {/* Category Demand */}
          <div className="rounded-xl border border-slate-200/85 bg-white p-5 shadow-sm space-y-4 min-w-0 overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <h3 className="text-[13px] font-bold text-slate-900">Category Demand</h3>
                <span title="Search demand by product category">
                  <Info className="h-3.5 w-3.5 text-slate-400" />
                </span>
              </div>
              <span className="text-[10px] font-bold text-indigo-600 cursor-pointer hover:underline select-none">View all</span>
            </div>
            <div className="space-y-3">
              {categoryDemand.map((c) => (
                <div key={c.name} className="flex items-center gap-3 min-w-0">
                  <span className="text-[11px] font-medium text-slate-600 w-[100px] sm:w-[160px] shrink-0 truncate">{c.name}</span>
                  <div className="flex-1 flex items-center gap-2 min-w-0">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#4F46E5] rounded-full transition-all duration-700"
                        style={{ width: `${(c.pct / catMax) * 100}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 shrink-0 w-10 text-right">{c.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
            {/* X-axis labels */}
            <div className="flex justify-between text-[9px] text-slate-400 font-medium pl-[100px] sm:pl-[160px]">
              <span>0%</span><span>10%</span><span>20%</span><span>30%</span>
            </div>
          </div>

          {/* Retailer Demand */}
          <div className="rounded-xl border border-slate-200/85 bg-white p-5 shadow-sm space-y-4 min-w-0 overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <h3 className="text-[13px] font-bold text-slate-900">Retailer Demand</h3>
                <span title="Search demand by retailer">
                  <Info className="h-3.5 w-3.5 text-slate-400" />
                </span>
              </div>
              <span className="text-[10px] font-bold text-indigo-600 cursor-pointer hover:underline select-none">View all</span>
            </div>
            <div className="space-y-3">
              {retailerDemand.map((r) => (
                <div key={r.name} className="flex items-center gap-3 min-w-0">
                  <span className="text-[11px] font-medium text-slate-600 w-[90px] shrink-0 truncate">{r.name}</span>
                  <div className="flex-1 flex items-center gap-2 min-w-0">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#4F46E5] rounded-full transition-all duration-700"
                        style={{ width: `${(r.pct / retMax) * 100}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 shrink-0 w-10 text-right">{r.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
            {/* X-axis labels */}
            <div className="flex justify-between text-[9px] text-slate-400 font-medium pl-[90px]">
              <span>0%</span><span>10%</span><span>20%</span><span>30%</span><span>40%</span><span>50%</span>
            </div>
          </div>
        </div>

        {/* ─── Row 4: Search Query Performance Table ─── */}
        <div className="rounded-xl border border-slate-200/85 bg-white shadow-sm min-w-0 overflow-hidden">
          {/* Table Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <h3 className="text-[13px] font-bold text-slate-900">Search Query Performance</h3>
              <span title="Detailed performance per search query">
                <Info className="h-3.5 w-3.5 text-slate-400" />
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search query..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8 pl-8 pr-3 text-[12px] bg-slate-50 border border-slate-200 rounded-lg text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all w-[170px]"
                />
              </div>
              {/* Filters */}
              <button className="inline-flex items-center gap-1.5 h-8 px-3 text-[12px] font-medium text-slate-600 border border-slate-200 bg-white rounded-lg hover:bg-slate-50 transition-colors">
                <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
                Filters
              </button>
              {/* Export */}
              <button className="inline-flex items-center gap-1.5 h-8 px-3 text-[12px] font-medium text-slate-600 border border-slate-200 bg-white rounded-lg hover:bg-slate-50 transition-colors">
                <Download className="h-3.5 w-3.5 text-slate-400" />
                Export
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-xs text-left border-collapse">
              <thead>
                <tr className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-100">
                  <th className="px-5 py-2 w-8">#</th>
                  <th className="px-3 py-2 w-[16%]">Query</th>
                  <th className="px-3 py-2 w-[10%] text-right">Search Count</th>
                  <th className="px-3 py-2 w-[10%] text-center">Result Rate</th>
                  <th className="px-3 py-2 w-[26%]">Top Matched Product</th>
                  <th className="px-3 py-2 w-[10%] text-center">No-result Rate</th>
                  <th className="px-3 py-2 w-[16%]">Last Searched</th>
                  <th className="px-5 py-2 w-[8%] text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {filteredQueries.map((row) => (
                  <tr key={row.rank} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-2 font-bold text-slate-400">{row.rank}</td>
                    <td className="px-3 py-2 font-semibold text-slate-800">{row.query}</td>
                    <td className="px-3 py-2 text-right font-semibold text-slate-700">{fmtNum(row.searchCount)}</td>
                    <td className="px-3 py-2 text-center">
                      <span className={`font-extrabold text-[12px] ${row.resultRateColor}`}>
                        {row.resultRate}%
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      {row.asin ? (
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={row.image}
                            alt={row.topProduct}
                            className="h-8 w-8 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="font-bold text-slate-800 truncate max-w-[180px] text-[11px]">{row.topProduct}</div>
                            <div className="text-[10px] text-slate-400 font-medium">ASIN: {row.asin}</div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-400 font-medium">—</span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-center">
                      <span className={`font-extrabold text-[12px] ${row.noResultRateColor}`}>
                        {row.noResultRate}%
                      </span>
                    </td>
                    <td className="px-3 py-2 text-slate-500 text-[11px] whitespace-nowrap">{row.lastSearched}</td>
                    <td className="px-5 py-2 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="h-7 px-2.5 text-[11px] font-semibold text-blue-600 border border-slate-200 bg-white rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
                          View
                        </button>
                        <button className="h-7 w-5 flex items-center justify-center border border-slate-200 bg-white rounded-lg hover:bg-slate-50 transition-colors text-slate-500">
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
            <span className="text-[12px] text-slate-500">Showing 1 to 5 of 50,000 queries</span>
            <div className="flex items-center gap-1.5">
              {/* Per page */}
              <div className="relative inline-flex items-center rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-600 select-none cursor-pointer mr-2">
                <span>10 per page</span>
                <ChevronDown className="ml-1 h-3 w-3 text-slate-400" />
              </div>
              <button className="w-7 h-7 flex items-center justify-center border border-slate-200 bg-white rounded text-slate-400 hover:text-slate-700 transition-colors" disabled>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  className={`w-7 h-7 flex items-center justify-center rounded text-[12px] font-semibold transition-colors ${
                    n === 1 ? "bg-indigo-600 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {n}
                </button>
              ))}
              <span className="text-slate-400 font-semibold text-[11px] px-1">…</span>
              <button className="w-12 h-7 flex items-center justify-center border border-slate-200 bg-white rounded text-[12px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                5000
              </button>
              <button className="w-7 h-7 flex items-center justify-center border border-slate-200 bg-white rounded text-slate-600 hover:bg-slate-50 transition-colors">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
