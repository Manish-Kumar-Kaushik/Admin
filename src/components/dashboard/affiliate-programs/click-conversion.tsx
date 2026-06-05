"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ResponsiveContainer, ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import {
  MousePointerClick,
  ShoppingCart,
  Percent,
  User,
  Download,
  Filter,
  Calendar,
  ChevronDown,
  MoreVertical,
  Activity,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const performanceChartData = [
  { date: "May 14", clicks: 3300, conversions: 900, cr: 4.5 },
  { date: "May 15", clicks: 4000, conversions: 1300, cr: 5.2 },
  { date: "May 16", clicks: 4200, conversions: 1550, cr: 4.2 },
  { date: "May 17", clicks: 3800, conversions: 1200, cr: 4.9 },
  { date: "May 18", clicks: 4200, conversions: 1200, cr: 4.5 },
  { date: "May 19", clicks: 4000, conversions: 1200, cr: 4.0 },
  { date: "May 20", clicks: 3100, conversions: 1000, cr: 3.8 },
];

interface ProgramPerformance {
  program: string;
  campaign: string;
  logo: string;
  clicks: number;
  uniqueClicks: number;
  conversions: number;
  cr: string;
  crTrend: string;
  crTrendDirection: "up" | "down";
  epc: string;
  earnings: string;
}

const mockPerformance: ProgramPerformance[] = [
  {
    program: "Amazon Associates",
    campaign: "Headphones Campaign",
    logo: "A",
    clicks: 5432,
    uniqueClicks: 4021,
    conversions: 312,
    cr: "5.74%",
    crTrend: "8.2%",
    crTrendDirection: "up",
    epc: "$0.21",
    earnings: "$1,145.32",
  },
  {
    program: "Best Buy Affiliate",
    campaign: "Tech Deals",
    logo: "BB",
    clicks: 3271,
    uniqueClicks: 2402,
    conversions: 198,
    cr: "6.05%",
    crTrend: "5.6%",
    crTrendDirection: "up",
    epc: "$0.28",
    earnings: "$913.58",
  },
  {
    program: "Walmart Affiliate",
    campaign: "Home Essentials",
    logo: "WM",
    clicks: 2984,
    uniqueClicks: 2231,
    conversions: 142,
    cr: "4.76%",
    crTrend: "2.1%",
    crTrendDirection: "down",
    epc: "$0.16",
    earnings: "$468.74",
  },
  {
    program: "Target Affiliate",
    campaign: "Beauty & Personal Care",
    logo: "TG",
    clicks: 1837,
    uniqueClicks: 1411,
    conversions: 82,
    cr: "4.46%",
    crTrend: "1.7%",
    crTrendDirection: "down",
    epc: "$0.14",
    earnings: "$252.81",
  },
  {
    program: "eBay Partner Network",
    campaign: "Collectibles Campaign",
    logo: "EB",
    clicks: 623,
    uniqueClicks: 512,
    conversions: 18,
    cr: "2.89%",
    crTrend: "3.6%",
    crTrendDirection: "down",
    epc: "$0.22",
    earnings: "$51.74",
  },
];

// Retailer logo generator helper matching the high quality logos
function RetailerLogo({ name }: { name: string }) {
  if (name.includes("Walmart")) {
    return (
      <div className="flex items-center justify-center text-[#ffc220] shrink-0">
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
          <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  if (name.includes("Best Buy")) {
    return (
      <div className="bg-[#fff200] text-black font-black text-[6.5px] px-1 py-0.5 rounded leading-none tracking-tighter flex items-center justify-center shrink-0 border border-yellow-300 shadow-3xs select-none">
        BUY
      </div>
    );
  }
  if (name.includes("Amazon")) {
    return (
      <div className="flex flex-col items-center justify-center shrink-0 relative select-none">
        <span className="font-black text-slate-900 text-[11px] leading-none">a</span>
        <svg viewBox="0 0 16 4" fill="none" className="w-3.5 h-1 text-amber-500 -mt-0.5">
          <path d="M1 1c2 2 8 2 14 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M13.5 0.5L15 1L14 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  if (name.includes("Target")) {
    return (
      <div className="flex items-center justify-center text-[#e53238] shrink-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-4 w-4">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      </div>
    );
  }
  if (name.includes("eBay")) {
    return (
      <div className="flex items-center gap-[0.2px] font-bold text-[8.5px] tracking-tighter select-none">
        <span className="text-[#e53238]">e</span>
        <span className="text-[#0064d2]">b</span>
        <span className="text-[#fec60d]">a</span>
        <span className="text-[#86b817]">y</span>
      </div>
    );
  }
  return <span className="font-bold text-slate-700 shrink-0">{name[0]}</span>;
}

export default function ClickConversion() {
  return (
    <div className="bg-slate-50 min-h-full w-full font-sans pb-4">
      <div className="w-full max-w-full px-2.5 sm:px-4 md:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        
        {/* Title Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Click / Conversion View
              </h1>
              <span className="h-4.5 w-4.5 rounded-full border border-slate-350 flex items-center justify-center text-[10px] font-bold text-slate-500 cursor-help" title="Track clicks and affiliate conversions">i</span>
            </div>
            <p className="text-xs sm:text-[13px] text-slate-500 mt-1 select-none">
              Track clicks, conversions, and earnings performance across affiliate programs and campaigns.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 select-none">
            {/* Date Range Selector */}
            <div className="relative flex items-center border border-slate-200 rounded-lg bg-white shadow-3xs hover:bg-slate-50 transition overflow-hidden">
              <input
                type="text"
                defaultValue="May 14 – May 20, 2025"
                className="border-0 bg-transparent py-1.5 pl-3 pr-10 text-xs font-bold text-slate-700 outline-none w-[170px]"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            <button className="flex justify-center items-center gap-1.5 h-8.5 px-4 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition whitespace-nowrap">
              <Download className="h-3.5 w-3.5 text-slate-400" /> Export
            </button>
            <button className="flex justify-center items-center gap-1.5 h-8.5 px-4 text-xs font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm transition whitespace-nowrap">
              <Filter className="h-3.5 w-3.5" /> Filters
            </button>
          </div>
        </div>

        {/* KPI Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 w-full">
          {/* Card 1: Total Clicks */}
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 sm:p-4 shadow-xs flex items-center gap-2.5 sm:gap-3.5 w-full min-w-0">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-indigo-50/60 text-[#4F46E5] flex items-center justify-center shrink-0">
              <MousePointerClick className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Clicks</span>
              <span className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-tight mt-0.5 block">24,842</span>
              <span className="text-[9px] sm:text-[10px] text-slate-500 block mt-0.5 leading-tight">
                <span className="text-emerald-600 font-bold">↗ 18.6%</span> <span className="block sm:inline sm:ml-2 text-[8px] sm:text-[10px] text-slate-400">vs May 7 - May 13</span>
              </span>
            </div>
          </div>

          {/* Card 2: Conversions */}
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 sm:p-4 shadow-xs flex items-center gap-2.5 sm:gap-3.5 w-full min-w-0">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-emerald-50/60 text-emerald-600 flex items-center justify-center shrink-0">
              <ShoppingCart className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Conversions</span>
              <span className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-tight mt-0.5 block">1,248</span>
              <span className="text-[9px] sm:text-[10px] text-slate-500 block mt-0.5 leading-tight">
                <span className="text-emerald-600 font-bold">↗ 12.3%</span> <span className="block sm:inline sm:ml-2 text-[8px] sm:text-[10px] text-slate-400">vs May 7 - May 13</span>
              </span>
            </div>
          </div>

          {/* Card 3: Conversion Rate */}
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 sm:p-4 shadow-xs flex items-center gap-2.5 sm:gap-3.5 w-full min-w-0">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-amber-50/60 text-amber-600 flex items-center justify-center shrink-0">
              <Percent className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Conversion Rate</span>
              <span className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-tight mt-0.5 block">5.02%</span>
              <span className="text-[9px] sm:text-[10px] text-slate-500 block mt-0.5 leading-tight">
                <span className="text-emerald-600 font-bold">↗ 8.4%</span> <span className="block sm:inline sm:ml-2 text-[8px] sm:text-[10px] text-slate-400">vs May 7 - May 13</span>
              </span>
            </div>
          </div>

          {/* Card 4: Total Earnings */}
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 sm:p-4 shadow-xs flex items-center gap-2.5 sm:gap-3.5 w-full min-w-0">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-blue-50/60 text-blue-600 flex items-center justify-center shrink-0">
              {/* Money pouch SVG to match screenshot exactly */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5 sm:h-5 sm:w-5">
                <path d="M19 20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V11c0-2.2 1.8-4 4-4h6c2.2 0 4 1.8 4 4v9z" />
                <path d="M12 10v7" />
                <path d="M14.5 12H10a1.5 1.5 0 0 0 0 3h3.5a1.5 1.5 0 0 1 0 3H9.5" />
                <path d="M8 7c0-2.8 2.2-5 5-5h.5c1.4 0 2.5 1.1 2.5 2.5V7" />
              </svg>
            </div>
            <div className="min-w-0">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Earnings</span>
              <span className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-tight mt-0.5 block">$4,832.19</span>
              <span className="text-[9px] sm:text-[10px] text-slate-500 block mt-0.5 leading-tight">
                <span className="text-emerald-600 font-bold">↗ 15.7%</span> <span className="block sm:inline sm:ml-2 text-[8px] sm:text-[10px] text-slate-400">vs May 7 - May 13</span>
              </span>
            </div>
          </div>

          {/* Card 5: EPC */}
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 sm:p-4 shadow-xs flex items-center gap-2.5 sm:gap-3.5 w-full min-w-0">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-rose-50/60 text-rose-550 flex items-center justify-center shrink-0">
              <User className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">EPC</span>
              <span className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-tight mt-0.5 block">$0.19</span>
              <span className="text-[9px] sm:text-[10px] text-slate-500 block mt-0.5 leading-tight">
                <span className="text-emerald-600 font-bold">↗ 9.1%</span> <span className="block sm:inline sm:ml-2 text-[8px] sm:text-[10px] text-slate-400">vs May 7 - May 13</span>
              </span>
            </div>
          </div>
        </div>

        {/* Charts Middle Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Clicks & Conversions Over Time Chart */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800">Clicks & Conversions Over Time</h2>
              <div className="relative">
                <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-1 text-xs font-bold text-slate-700 outline-none cursor-pointer">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-450 pointer-events-none" />
              </div>
            </div>

            {/* Legend indicators */}
            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 select-none">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-3 rounded-full bg-[#4F46E5]"></span>
                <span>Clicks</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-3 rounded-full bg-[#10B981]"></span>
                <span>Conversions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-3 rounded-full bg-[#F59E0B]"></span>
                <span>Conversion Rate (%)</span>
              </div>
            </div>

            {/* Dual Y-Axes Chart Area */}
            <div className="h-[250px] w-full mt-2 relative pl-8 pr-8">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <ComposedChart data={performanceChartData} margin={{ top: 15, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 700 }}
                    dy={10}
                  />
                  <YAxis 
                    yAxisId="left" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 700 }}
                    tickFormatter={(value) => value === 0 ? "0" : `${value / 1000}K`}
                    domain={[0, 5000]}
                    ticks={[0, 1000, 2000, 3000, 4000, 5000]}
                    dx={-5}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 700 }}
                    tickFormatter={(value) => `${value}%`}
                    domain={[0, 10]}
                    ticks={[0, 2, 4, 6, 8, 10]}
                    dx={5}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '11px', fontWeight: 600 }}
                    itemStyle={{ fontSize: '12px', fontWeight: 700 }}
                  />
                  <Area 
                    yAxisId="left"
                    type="linear" 
                    dataKey="clicks" 
                    name="Clicks"
                    stroke="#4F46E5" 
                    strokeWidth={1.5}
                    fillOpacity={1} 
                    fill="url(#colorClicks)" 
                    activeDot={{ r: 5, strokeWidth: 0 }}
                    dot={{ r: 3, fill: '#4F46E5', strokeWidth: 1.5, stroke: '#fff' }}
                    isAnimationActive={true}
                    animationDuration={1500}
                  />
                  <Area 
                    yAxisId="left"
                    type="linear" 
                    dataKey="conversions" 
                    name="Conversions"
                    stroke="#10B981" 
                    strokeWidth={1.5}
                    fillOpacity={1} 
                    fill="url(#colorConversions)" 
                    activeDot={{ r: 5, strokeWidth: 0 }}
                    dot={{ r: 3, fill: '#10B981', strokeWidth: 1.5, stroke: '#fff' }}
                    isAnimationActive={true}
                    animationDuration={1500}
                  />
                  <Area 
                    yAxisId="right"
                    type="linear" 
                    dataKey="cr" 
                    name="Conversion Rate (%)"
                    stroke="#F59E0B" 
                    strokeWidth={1.5}
                    fillOpacity={1} 
                    fill="url(#colorCr)" 
                    activeDot={{ r: 5, strokeWidth: 0 }}
                    dot={{ r: 3, fill: '#F59E0B', strokeWidth: 1.5, stroke: '#fff' }}
                    isAnimationActive={true}
                    animationDuration={1500}
                  />
                </ComposedChart>
              </ResponsiveContainer>
              
              {/* Y-Axis Label Rotated (Left) */}
              <div className="hidden sm:block absolute -left-3 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[9px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap pointer-events-none">
                Clicks / Conversions
              </div>

              {/* Y-Axis Label Rotated (Right) */}
              <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 rotate-90 origin-center text-[9px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap pointer-events-none">
                Conversion Rate (%)
              </div>
            </div>
          </div>

          {/* Top Performing Programs Widget */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800">Top Performing Programs</h2>
              <button className="text-[10px] font-bold text-[#4F46E5] hover:text-[#4338CA] transition">View All</button>
            </div>

            {/* List */}
            <div className="flex-1 divide-y divide-slate-100 font-semibold text-slate-700 text-xs">
              {/* Header */}
              <div className="grid grid-cols-[1.6fr_1fr_1.1fr_1fr_1.1fr] text-[9px] font-bold text-slate-400 uppercase py-2">
                <span>Program</span>
                <span className="text-right">Clicks</span>
                <span className="text-right">Conversions</span>
                <span className="text-right">CR</span>
                <span className="text-right">Earnings</span>
              </div>
              
              {/* Row 1 */}
              <div className="grid grid-cols-[1.6fr_1fr_1.1fr_1fr_1.1fr] items-center py-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="h-6 w-6 rounded border border-slate-100 bg-white shadow-3xs flex items-center justify-center shrink-0">
                    <RetailerLogo name="Amazon Associates" />
                  </span>
                  <span className="truncate font-bold text-slate-900">Amazon Associates</span>
                </div>
                <span className="text-right">10,842</span>
                <span className="text-right">612</span>
                <span className="text-right">5.64%</span>
                <span className="text-right text-slate-900 font-bold">$2,451.78</span>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-[1.6fr_1fr_1.1fr_1fr_1.1fr] items-center py-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="h-6 w-6 rounded border border-slate-100 bg-white shadow-3xs flex items-center justify-center shrink-0">
                    <RetailerLogo name="Best Buy Affiliate" />
                  </span>
                  <span className="truncate font-bold text-slate-900">Best Buy Affiliate</span>
                </div>
                <span className="text-right">5,438</span>
                <span className="text-right">326</span>
                <span className="text-right">6.00%</span>
                <span className="text-right text-slate-900 font-bold">$1,102.34</span>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-[1.6fr_1fr_1.1fr_1fr_1.1fr] items-center py-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="h-6 w-6 rounded border border-slate-100 bg-white shadow-3xs flex items-center justify-center shrink-0">
                    <RetailerLogo name="Walmart Affiliate" />
                  </span>
                  <span className="truncate font-bold text-slate-900">Walmart Affiliate</span>
                </div>
                <span className="text-right">4,932</span>
                <span className="text-right">238</span>
                <span className="text-right">4.83%</span>
                <span className="text-right text-slate-900 font-bold">$683.21</span>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-[1.6fr_1fr_1.1fr_1fr_1.1fr] items-center py-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="h-6 w-6 rounded border border-slate-100 bg-white shadow-3xs flex items-center justify-center shrink-0">
                    <RetailerLogo name="Target Affiliate" />
                  </span>
                  <span className="truncate font-bold text-slate-900">Target Affiliate</span>
                </div>
                <span className="text-right">2,781</span>
                <span className="text-right">126</span>
                <span className="text-right">4.53%</span>
                <span className="text-right text-slate-900 font-bold">$321.45</span>
              </div>

              {/* Row 5 */}
              <div className="grid grid-cols-[1.6fr_1fr_1.1fr_1fr_1.1fr] items-center py-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="h-6 w-6 rounded border border-slate-100 bg-white shadow-3xs flex items-center justify-center shrink-0">
                    <RetailerLogo name="eBay Partner Network" />
                  </span>
                  <span className="truncate font-bold text-slate-900">eBay Partner Network</span>
                </div>
                <span className="text-right">891</span>
                <span className="text-right">27</span>
                <span className="text-right">3.03%</span>
                <span className="text-right text-slate-900 font-bold">$137.41</span>
              </div>
            </div>

            <button className="w-full text-center py-2 text-xs font-bold text-slate-650 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition shadow-2xs mt-2 select-none">
              View All Programs
            </button>
          </div>

        </div>

        {/* Bottom Table section */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          
          {/* Table Header Toolbar */}
          <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none">
            <h2 className="text-sm font-bold text-slate-800 shrink-0">Click / Conversion Performance</h2>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto sm:justify-end">
              {/* Program filter */}
              <div className="relative">
                <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer">
                  <option>All Programs</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>

              {/* Campaign filter */}
              <div className="relative">
                <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer">
                  <option>All Campaigns</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>

              {/* Device filter */}
              <div className="relative">
                <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer">
                  <option>All Devices</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>

              {/* Country filter */}
              <div className="relative">
                <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer">
                  <option>All Countries</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Table Wrapper */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/60 border-b border-slate-150 text-slate-455 font-bold uppercase tracking-wider text-[10px] select-none">
                  <th className="py-3 px-5 w-[24%] font-bold">Program / Campaign</th>
                  <th className="py-3 px-5 w-[12%] text-right font-bold">Clicks</th>
                  <th className="py-3 px-5 w-[12%] text-right font-bold">Unique Clicks</th>
                  <th className="py-3 px-5 w-[12%] text-right font-bold">Conversions</th>
                  <th className="py-3 px-5 w-[16%] text-right font-bold">Conversion Rate</th>
                  <th className="py-3 px-5 w-[10%] text-right font-bold">EPC</th>
                  <th className="py-3 px-5 w-[14%] text-right font-bold">Earnings</th>
                  <th className="py-3 px-5 w-[8%] text-center font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {mockPerformance.map((row, index) => {
                  return (
                    <tr
                      key={index}
                      className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                    >
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="h-7 w-7 rounded-lg border border-slate-200 bg-white shadow-3xs flex items-center justify-center font-black text-slate-800 shrink-0">
                            <RetailerLogo name={row.program} />
                          </span>
                          <div className="leading-tight min-w-0">
                            <span className="text-xs font-bold text-slate-900 block truncate">{row.program}</span>
                            <span className="text-[10px] text-slate-400 font-medium block mt-0.5 truncate">{row.campaign}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-right text-slate-800 font-medium">
                        {row.clicks.toLocaleString()}
                      </td>
                      <td className="py-4 px-5 text-right text-slate-600 font-medium">
                        {row.uniqueClicks.toLocaleString()}
                      </td>
                      <td className="py-4 px-5 text-right text-slate-800 font-medium">
                        {row.conversions.toLocaleString()}
                      </td>
                      <td className="py-4 px-5 text-right select-none">
                        <div className="inline-flex items-center gap-1">
                          <span className="text-slate-900 font-medium">{row.cr}</span>
                          <span className={cn(
                            "text-[10px] font-bold inline-flex items-center",
                            row.crTrendDirection === "up" ? "text-emerald-600" : "text-rose-600"
                          )}>
                            {row.crTrendDirection === "up" ? "↗" : "↘"} {row.crTrend}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-right text-slate-700 font-medium">
                        {row.epc}
                      </td>
                      <td className="py-4 px-5 text-right text-slate-900 font-bold">
                        {row.earnings}
                      </td>
                      <td className="py-4 px-5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button className="h-7 w-7 rounded-lg border border-slate-200 hover:bg-white flex items-center justify-center text-slate-400 hover:text-slate-700 bg-slate-50/50 shadow-2xs transition">
                            <Activity className="h-3.5 w-3.5" />
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
            <span className="text-[11px] font-bold text-slate-400">
              Showing 1 to 5 of 32 results
            </span>
            
            <div className="flex items-center gap-1">
              <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-400">
                <ChevronsLeft className="h-3.5 w-3.5" />
              </button>
              <button className="h-8 w-8 rounded-lg bg-[#4F46E5] text-white flex items-center justify-center text-xs font-bold shadow-sm">1</button>
              <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-semibold hover:bg-slate-50 transition text-slate-600">2</button>
              <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-semibold hover:bg-slate-50 transition text-slate-600">3</button>
              <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-semibold hover:bg-slate-50 transition text-slate-600">4</button>
              <span className="px-1.5 text-slate-300 text-xs">...</span>
              <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-semibold hover:bg-slate-50 transition text-slate-600">7</button>
              <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-400">
                <ChevronsRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
