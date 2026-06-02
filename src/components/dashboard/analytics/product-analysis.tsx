"use client";

import React, { useState, useEffect } from "react";
import {
  Eye,
  Pointer,
  Bookmark,
  Bell,
  Flag,
  TrendingUp,
  Calendar,
  ChevronDown,
  Download,
  ChevronLeft,
  ChevronRight,
  Info,
  SlidersHorizontal,
  X,
  Filter,
} from "lucide-react";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const initialProducts = [
  {
    rank: 1,
    name: "Apple AirPods Pro (2nd Gen)",
    category: "Electronics",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1588449668365-d15e397f6787?w=100&q=80",
    views: 98542,
    verdict: "Buy",
    verdictColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    score: 92,
    scoreColor: "bg-emerald-500",
    scoreTextColor: "text-emerald-600",
    clicks: 14325,
    saves: 8942,
    alerts: 3421,
    reports: 23,
    conversion: "8.7%",
    conversionLevel: "High",
    conversionColor: "text-emerald-600 bg-emerald-50/50 border-emerald-100",
  },
  {
    rank: 2,
    name: "Dell XPS 13 Laptop (2024)",
    category: "Computers",
    brand: "Dell",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=100&q=80",
    views: 76821,
    verdict: "Buy",
    verdictColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    score: 88,
    scoreColor: "bg-emerald-500",
    scoreTextColor: "text-emerald-600",
    clicks: 9821,
    saves: 6231,
    alerts: 2112,
    reports: 18,
    conversion: "7.2%",
    conversionLevel: "High",
    conversionColor: "text-emerald-600 bg-emerald-50/50 border-emerald-100",
  },
  {
    rank: 3,
    name: "Dyson V15 Detect Cordless Vacuum",
    category: "Home & Kitchen",
    brand: "Dyson",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=100&q=80",
    views: 65410,
    verdict: "Wait",
    verdictColor: "bg-amber-50 text-amber-700 border-amber-200",
    score: 72,
    scoreColor: "bg-amber-500",
    scoreTextColor: "text-amber-600",
    clicks: 7251,
    saves: 4312,
    alerts: 1876,
    reports: 31,
    conversion: "5.1%",
    conversionLevel: "Medium",
    conversionColor: "text-amber-600 bg-amber-50/50 border-amber-100",
  },
  {
    rank: 4,
    name: "Sony WH-1000XM5 Headphones",
    category: "Electronics",
    brand: "Sony",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80",
    views: 54233,
    verdict: "Buy",
    verdictColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    score: 89,
    scoreColor: "bg-emerald-500",
    scoreTextColor: "text-emerald-600",
    clicks: 6842,
    saves: 4891,
    alerts: 1233,
    reports: 15,
    conversion: "6.8%",
    conversionLevel: "High",
    conversionColor: "text-emerald-600 bg-emerald-50/50 border-emerald-100",
  },
  {
    rank: 5,
    name: "Optimum Nutrition Gold Standard Whey",
    category: "Health & Personal Care",
    brand: "Optimum Nutrition",
    image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=100&q=80",
    views: 48921,
    verdict: "Buy",
    verdictColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    score: 85,
    scoreColor: "bg-emerald-500",
    scoreTextColor: "text-emerald-600",
    clicks: 5412,
    saves: 3201,
    alerts: 987,
    reports: 9,
    conversion: "6.4%",
    conversionLevel: "High",
    conversionColor: "text-emerald-600 bg-emerald-50/50 border-emerald-100",
  },
  {
    rank: 6,
    name: "Ninja AF101 Air Fryer",
    category: "Home & Kitchen",
    brand: "Ninja",
    image: "https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?w=100&q=80",
    views: 42331,
    verdict: "Wait",
    verdictColor: "bg-amber-50 text-amber-700 border-amber-200",
    score: 68,
    scoreColor: "bg-amber-500",
    scoreTextColor: "text-amber-600",
    clicks: 4231,
    saves: 2145,
    alerts: 654,
    reports: 22,
    conversion: "4.3%",
    conversionLevel: "Medium",
    conversionColor: "text-amber-600 bg-amber-50/50 border-amber-100",
  },
  {
    rank: 7,
    name: "Samsung Galaxy S24 Ultra",
    category: "Electronics",
    brand: "Samsung",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=100&q=80",
    views: 41002,
    verdict: "Buy",
    verdictColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    score: 90,
    scoreColor: "bg-emerald-500",
    scoreTextColor: "text-emerald-600",
    clicks: 6112,
    saves: 5012,
    alerts: 1421,
    reports: 17,
    conversion: "7.9%",
    conversionLevel: "High",
    conversionColor: "text-emerald-600 bg-emerald-50/50 border-emerald-100",
  },
  {
    rank: 8,
    name: "Le Creuset Dutch Oven 5.5qt",
    category: "Home & Kitchen",
    brand: "Le Creuset",
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=100&q=80",
    views: 32881,
    verdict: "Avoid",
    verdictColor: "bg-rose-50 text-rose-700 border-rose-200",
    score: 45,
    scoreColor: "bg-rose-500",
    scoreTextColor: "text-rose-600",
    clicks: 1982,
    saves: 1023,
    alerts: 312,
    reports: 14,
    conversion: "2.1%",
    conversionLevel: "Low",
    conversionColor: "text-rose-600 bg-rose-50/50 border-rose-100",
  },
  {
    rank: 9,
    name: "Nature Made Vitamin D3 2000 IU",
    category: "Health & Personal Care",
    brand: "Nature Made",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=100&q=80",
    views: 28774,
    verdict: "Buy",
    verdictColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    score: 83,
    scoreColor: "bg-emerald-500",
    scoreTextColor: "text-emerald-600",
    clicks: 2341,
    saves: 1876,
    alerts: 543,
    reports: 6,
    conversion: "4.9%",
    conversionLevel: "Medium",
    conversionColor: "text-amber-600 bg-amber-50/50 border-amber-100",
  },
  {
    rank: 10,
    name: "LEGO Star Wars Millennium Falcon",
    category: "Toys & Games",
    brand: "LEGO",
    image: "https://images.unsplash.com/photo-1585366119957-e5733f399e7c?w=100&q=80",
    views: 27543,
    verdict: "Wait",
    verdictColor: "bg-amber-50 text-amber-700 border-amber-200",
    score: 70,
    scoreColor: "bg-amber-500",
    scoreTextColor: "text-amber-600",
    clicks: 2112,
    saves: 1321,
    alerts: 489,
    reports: 11,
    conversion: "3.8%",
    conversionLevel: "Medium",
    conversionColor: "text-amber-600 bg-amber-50/50 border-amber-100",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmt = (n: number) => n.toLocaleString();

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ProductAnalytics() {
  const [hideFilters, setHideFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedRetailer, setSelectedRetailer] = useState("All Retailers");
  const [selectedVerdict, setSelectedVerdict] = useState("All Verdicts");
  const [selectedScore, setSelectedScore] = useState("All Scores");
  const [selectedReport, setSelectedReport] = useState("All");

  const [products, setProducts] = useState(initialProducts);

  // Apply filters handler
  const handleApplyFilters = () => {
    let filtered = [...initialProducts];

    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (selectedVerdict !== "All Verdicts") {
      filtered = filtered.filter((p) => p.verdict === selectedVerdict);
    }
    if (selectedScore !== "All Scores") {
      if (selectedScore === "High (80+)") {
        filtered = filtered.filter((p) => p.score >= 80);
      } else if (selectedScore === "Mid (50-79)") {
        filtered = filtered.filter((p) => p.score >= 50 && p.score < 80);
      } else if (selectedScore === "Low (<50)") {
        filtered = filtered.filter((p) => p.score < 50);
      }
    }
    if (selectedReport !== "All") {
      if (selectedReport === "Has Reports") {
        filtered = filtered.filter((p) => p.reports > 0);
      } else {
        filtered = filtered.filter((p) => p.reports === 0);
      }
    }

    setProducts(filtered);
  };

  const handleClearFilters = () => {
    setSelectedCategory("All Categories");
    setSelectedRetailer("All Retailers");
    setSelectedVerdict("All Verdicts");
    setSelectedScore("All Scores");
    setSelectedReport("All");
    setProducts(initialProducts);
  };

  return (
    <div className="bg-slate-50 min-h-screen w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-full px-2 sm:px-4 md:px-6 py-4 space-y-6">

        {/* ─── Header Section ─── */}
        <div className="w-full select-none">


          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between w-full">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl leading-tight">
                Product Analytics
              </h1>
              <p className="mt-1 text-xs text-slate-500 font-medium">
                Track product performance, user engagement, and conversions.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {/* Date Picker */}
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
          {/* Card 1: Views */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300 transition-colors flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Total Product Views</span>
              <div className="h-7 w-7 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <Eye className="h-3.5 w-3.5 text-blue-600" />
              </div>
            </div>
            <div className="text-xl font-extrabold text-slate-900 leading-none">2,184,392</div>
            <div className="text-[10px] text-slate-500 font-medium">
              <span className="text-emerald-600 font-bold">↑ 14.7%</span> vs May 7 – 13
            </div>
          </div>

          {/* Card 2: Clicks */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300 transition-colors flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Total Clicks</span>
              <div className="h-7 w-7 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <Pointer className="h-3.5 w-3.5 text-indigo-600" />
              </div>
            </div>
            <div className="text-xl font-extrabold text-slate-900 leading-none">312,845</div>
            <div className="text-[10px] text-slate-500 font-medium">
              <span className="text-emerald-600 font-bold">↑ 12.1%</span> vs May 7 – 13
            </div>
          </div>

          {/* Card 3: Saves */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300 transition-colors flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Total Saves</span>
              <div className="h-7 w-7 rounded-lg bg-pink-50 flex items-center justify-center shrink-0">
                <Bookmark className="h-3.5 w-3.5 text-pink-600" />
              </div>
            </div>
            <div className="text-xl font-extrabold text-slate-900 leading-none">128,742</div>
            <div className="text-[10px] text-slate-500 font-medium">
              <span className="text-emerald-600 font-bold">↑ 9.8%</span> vs May 7 – 13
            </div>
          </div>

          {/* Card 4: Alerts Created */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300 transition-colors flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Alerts Created</span>
              <div className="h-7 w-7 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                <Bell className="h-3.5 w-3.5 text-amber-600" />
              </div>
            </div>
            <div className="text-xl font-extrabold text-slate-900 leading-none">45,621</div>
            <div className="text-[10px] text-slate-500 font-medium">
              <span className="text-emerald-600 font-bold">↑ 15.3%</span> vs May 7 – 13
            </div>
          </div>

          {/* Card 5: Product Reports */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300 transition-colors flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Product Reports</span>
              <div className="h-7 w-7 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
                <Flag className="h-3.5 w-3.5 text-rose-600" />
              </div>
            </div>
            <div className="text-xl font-extrabold text-slate-900 leading-none">2,341</div>
            <div className="text-[10px] text-slate-500 font-medium">
              <span className="text-rose-600 font-bold">↓ 2.3%</span> vs May 7 – 13
            </div>
          </div>

          {/* Card 6: Est. Conversions */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300 transition-colors flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Est. Conversions</span>
              <div className="h-7 w-7 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
              </div>
            </div>
            <div className="text-xl font-extrabold text-slate-900 leading-none">18,932</div>
            <div className="text-[10px] text-slate-500 font-medium">
              <span className="text-emerald-600 font-bold">↑ 13.2%</span> vs May 7 – 13
            </div>
          </div>
        </div>

        {/* ─── Collapsible Filter Section ─── */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden select-none">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-800">Filters</span>
            </div>
            <button
              onClick={() => setHideFilters(!hideFilters)}
              className="text-[11px] font-bold text-slate-400 hover:text-slate-600 transition-colors"
            >
              {hideFilters ? "Show Filters" : "Hide Filters"}
            </button>
          </div>

          {!hideFilters && (
            <div className="p-5 flex flex-wrap items-end gap-3.5 bg-slate-50/20 w-full">
              {/* Category */}
              <div className="flex-1 min-w-[140px] space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category</label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full h-9 pl-3 pr-8 text-[12px] bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 appearance-none font-medium cursor-pointer"
                  >
                    <option>All Categories</option>
                    <option>Electronics</option>
                    <option>Computers</option>
                    <option>Home & Kitchen</option>
                    <option>Health & Personal Care</option>
                    <option>Toys & Games</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Retailer */}
              <div className="flex-1 min-w-[140px] space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Retailer</label>
                <div className="relative">
                  <select
                    value={selectedRetailer}
                    onChange={(e) => setSelectedRetailer(e.target.value)}
                    className="w-full h-9 pl-3 pr-8 text-[12px] bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 appearance-none font-medium cursor-pointer"
                  >
                    <option>All Retailers</option>
                    <option>Amazon</option>
                    <option>Walmart</option>
                    <option>Target</option>
                    <option>Best Buy</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Verdict */}
              <div className="flex-1 min-w-[140px] space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verdict</label>
                <div className="relative">
                  <select
                    value={selectedVerdict}
                    onChange={(e) => setSelectedVerdict(e.target.value)}
                    className="w-full h-9 pl-3 pr-8 text-[12px] bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 appearance-none font-medium cursor-pointer"
                  >
                    <option>All Verdicts</option>
                    <option>Buy</option>
                    <option>Wait</option>
                    <option>Avoid</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Score */}
              <div className="flex-1 min-w-[140px] space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Buy Score</label>
                <div className="relative">
                  <select
                    value={selectedScore}
                    onChange={(e) => setSelectedScore(e.target.value)}
                    className="w-full h-9 pl-3 pr-8 text-[12px] bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 appearance-none font-medium cursor-pointer"
                  >
                    <option>All Scores</option>
                    <option>High (80+)</option>
                    <option>Mid (50-79)</option>
                    <option>Low (&lt;50)</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Date Range */}
              <div className="flex-1 min-w-[180px] space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date Range</label>
                <div className="relative inline-flex items-center w-full h-9 border border-slate-200 bg-white rounded-lg px-3.5 text-[12px] font-semibold text-slate-700 shadow-sm cursor-pointer hover:border-slate-300 transition-colors">
                  <Calendar className="mr-2 h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">May 14, 2024 — May 20, 2024</span>
                </div>
              </div>

              {/* Has Reports */}
              <div className="flex-1 min-w-[110px] space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Has Reports</label>
                <div className="relative">
                  <select
                    value={selectedReport}
                    onChange={(e) => setSelectedReport(e.target.value)}
                    className="w-full h-9 pl-3 pr-8 text-[12px] bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 appearance-none font-medium cursor-pointer"
                  >
                    <option>All</option>
                    <option>Has Reports</option>
                    <option>No Reports</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex-initial flex items-center gap-2 h-9 self-end">
                <button
                  onClick={handleClearFilters}
                  className="h-8 px-4 text-[12px] font-bold text-slate-500 border border-slate-200 bg-white rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap"
                >
                  Clear Filters
                </button>
                <button
                  onClick={handleApplyFilters}
                  className="h-8 px-5 text-[12px] font-bold text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-100 whitespace-nowrap"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ─── Products Table Area ─── */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm min-w-0 overflow-hidden">
          {/* Table Toolbar */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-5 py-4 border-b border-slate-100">
            <span className="text-xs font-extrabold text-slate-700 select-none">
              Total {products.length} products
            </span>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 h-8 px-3 text-[12px] font-bold text-slate-600 border border-slate-200 bg-white rounded-lg hover:bg-slate-50 transition-colors">
                <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
                Columns
              </button>
              <div className="relative inline-flex items-center rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 select-none cursor-pointer">
                <span>25 per page</span>
                <ChevronDown className="ml-1.5 h-3 w-3 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-xs text-left border-collapse">
              <thead>
                <tr className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-100">
                  <th className="px-4 py-2.5 w-10 text-center">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer h-3.5 w-3.5"
                    />
                  </th>
                  <th className="px-3 py-2 w-[22%]">Product</th>
                  <th className="px-3 py-2 text-right">Views</th>
                  <th className="px-4 py-2 text-center">Verdict</th>
                  <th className="px-3 py-2 w-[12%]">AI Buy Score</th>
                  <th className="px-3 py-2 text-right">Clicks</th>
                  <th className="px-3 py-2 text-right">Saves</th>
                  <th className="px-3 py-2 text-right">Alerts Created</th>
                  <th className="px-3 py-2 text-right">Reports</th>
                  <th className="px-3 py-2 text-center w-[12%]">Conversion Estimate</th>
                  <th className="px-4 py-2 text-right w-[8%]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {products.length > 0 ? (
                  products.map((row) => (
                    <tr key={row.rank} className="hover:bg-slate-50/60 transition-colors">
                      {/* Checkbox */}
                      <td className="px-4 py-2 text-center">
                        <input
                          type="checkbox"
                          className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer h-3.5 w-3.5"
                        />
                      </td>

                      {/* Product details */}
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={row.image}
                            alt={row.name}
                            className="h-9 w-9 rounded-lg object-cover border border-slate-200 shrink-0 shadow-sm"
                          />
                          <div className="min-w-0">
                            <div className="font-bold text-slate-800 truncate max-w-[200px] text-[11.5px] leading-tight">
                              {row.name}
                            </div>
                            <div className="text-[10px] text-slate-400 font-semibold mt-0.5">
                              {row.category} • {row.brand}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Views */}
                      <td className="px-3 py-2 text-right font-semibold text-slate-700">
                        {fmt(row.views)}
                      </td>

                      {/* Verdict */}
                      <td className="px-4 py-2 text-center">
                        <span className={`inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-extrabold rounded-md border ${row.verdictColor}`}>
                          {row.verdict}
                        </span>
                      </td>

                      {/* Score with bar */}
                      <td className="px-3 py-2">
                        <div className="flex flex-col gap-1 w-full">
                          <span className={`text-[11px] font-extrabold leading-none ${row.scoreTextColor}`}>
                            {row.score}
                          </span>
                          <div className="h-1 bg-slate-100 rounded-full overflow-hidden w-full max-w-[100px]">
                            <div className={`h-full rounded-full ${row.scoreColor}`} style={{ width: `${row.score}%` }} />
                          </div>
                        </div>
                      </td>

                      {/* Clicks */}
                      <td className="px-3 py-2 text-right font-semibold text-slate-700">
                        {fmt(row.clicks)}
                      </td>

                      {/* Saves */}
                      <td className="px-3 py-2 text-right font-semibold text-slate-700">
                        {fmt(row.saves)}
                      </td>

                      {/* Alerts */}
                      <td className="px-3 py-2 text-right font-semibold text-slate-700">
                        {fmt(row.alerts)}
                      </td>

                      {/* Reports */}
                      <td className="px-3 py-2 text-right font-semibold text-slate-700">
                        {fmt(row.reports)}
                      </td>

                      {/* Conversion */}
                      <td className="px-3 py-2 text-center">
                        <div className="flex flex-col items-center">
                          <span className="text-[11.5px] font-extrabold text-slate-800">{row.conversion}</span>
                          <span className={`inline-flex px-1.5 py-0.5 rounded text-[8.5px] font-extrabold border mt-0.5 tracking-wide ${row.conversionColor}`}>
                            {row.conversionLevel}
                          </span>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="px-4 py-2 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="h-7 px-3 text-[11px] font-bold text-blue-600 border border-slate-200 bg-white rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors shadow-sm">
                            View
                          </button>
                          <button className="h-7 w-6 flex items-center justify-center border border-slate-200 bg-white rounded-lg hover:bg-slate-50 transition-colors text-slate-500 shadow-sm">
                            <ChevronDown className="h-3 w-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={11} className="px-6 py-12 text-center text-slate-400 font-medium">
                      No products found matching the select filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Pagination */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-5 py-3.5 bg-slate-50/50 border-t border-slate-100">
            <span className="text-[12px] text-slate-500 font-medium select-none">
              Showing 1 to {products.length} of 12,842 products
            </span>
            <div className="flex items-center gap-1.5">
              <div className="relative inline-flex items-center rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-600 select-none cursor-pointer mr-2">
                <span>25 per page</span>
                <ChevronDown className="ml-1 h-3 w-3 text-slate-400" />
              </div>
              <button className="w-7 h-7 flex items-center justify-center border border-slate-200 bg-white rounded text-slate-400 hover:text-slate-700 transition-colors" disabled>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded text-[12px] font-semibold bg-indigo-600 text-white shadow-sm">
                1
              </button>
              {[2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-600 text-[12px] font-semibold hover:bg-slate-50 transition-colors"
                >
                  {n}
                </button>
              ))}
              <span className="text-slate-400 font-semibold text-[11px] px-1 select-none">…</span>
              <button className="w-12 h-7 flex items-center justify-center border border-slate-200 bg-white rounded text-[12px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                514
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
