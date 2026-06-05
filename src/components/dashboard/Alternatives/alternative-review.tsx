"use client";

import React, { useState, useEffect } from "react";
import {
  RefreshCw,
  PlayCircle,
  Download,
  ChevronDown,
  Filter,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Check,
  ShieldCheck,
  ArrowLeftRight,
  ClipboardList,
  AlertTriangle,
  Clock,
  Eye,
  Circle
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";

const queueData = [
  {
    id: 1,
    original: { name: "Sony WH-1000XM5", category: "Headphones" },
    alternative: { name: "Bose QuietComfort Ultra", category: "Headphones" },
    type: "Best similar price",
    scoreGap: "+12",
    priceDiff: "-$49 (-7%)",
    priceNegative: true,
    confidence: "92%",
    affiliate: "Active",
    status: "Pending"
  },
  {
    id: 2,
    original: { name: "Ninja Foodi 6.5Qt", category: "Air Fryer" },
    alternative: { name: "COSORI Pro II 5.8Qt", category: "Air Fryer" },
    type: "Cheaper but good enough",
    scoreGap: "+8",
    priceDiff: "-$30 (-14%)",
    priceNegative: true,
    confidence: "78%",
    affiliate: "Active",
    status: "Needs Review"
  },
  {
    id: 3,
    original: { name: "LG 27GP850-B 27\"", category: "Monitor" },
    alternative: { name: "Dell G2724D 27\"", category: "Monitor" },
    type: "Best similar price",
    scoreGap: "+9",
    priceDiff: "+$20 (+6%)",
    priceNegative: false,
    confidence: "81%",
    affiliate: "Active",
    status: "Pending"
  },
  {
    id: 4,
    original: { name: "Canon EOS R50", category: "Camera" },
    alternative: { name: "Sony ZV-E10", category: "Camera" },
    type: "Better for slightly more",
    scoreGap: "+14",
    priceDiff: "+$100 (+18%)",
    priceNegative: false,
    confidence: "89%",
    affiliate: "Active",
    status: "Pending"
  },
  {
    id: 5,
    original: { name: "iRobot Roomba j7", category: "Robot Vacuum" },
    alternative: { name: "Roborock Q5+", category: "Robot Vacuum" },
    type: "Better for slightly more",
    scoreGap: "+13",
    priceDiff: "+$120 (+15%)",
    priceNegative: false,
    confidence: "86%",
    affiliate: "Non-affiliate only",
    status: "Needs Review"
  },
  {
    id: 6,
    original: { name: "Razer DeathAdder V3", category: "Gaming Mouse" },
    alternative: { name: "Logitech G Pro X Superlight 2", category: "Gaming Mouse" },
    type: "Premium upgrade",
    scoreGap: "+16",
    priceDiff: "+$30 (+9%)",
    priceNegative: false,
    confidence: "93%",
    affiliate: "Missing",
    status: "Rejected"
  }
];

const breakdownData = [
  { name: "Best similar price", value: 42, percentage: "32.8%", color: "#3B82F6" },
  { name: "Better for slightly more", value: 28, percentage: "21.9%", color: "#22C55E" },
  { name: "Cheaper but good enough", value: 25, percentage: "19.5%", color: "#F59E0B" },
  { name: "Premium upgrade", value: 18, percentage: "14.1%", color: "#A855F7" },
  { name: "Budget pick", value: 15, percentage: "11.7%", color: "#06B6D4" }
];

export default function AlternativeReview() {
  const [isChartMounted, setIsChartMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsChartMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Pending": return "bg-amber-50 text-amber-700 border-amber-200";
      case "Needs Review": return "bg-amber-50 text-amber-700 border-amber-200";
      case "Approved": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Rejected": return "bg-rose-50 text-rose-700 border-rose-200";
      default: return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getAffiliateStyle = (status: string) => {
    switch (status) {
      case "Active": return "text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold";
      case "Missing": return "text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full font-semibold";
      case "Non-affiliate only": return "text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-semibold";
      default: return "text-slate-700";
    }
  };

  return (
    <div className="w-full bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* Main Container */}
      <div className="flex-1 w-full p-4 sm:p-6 flex flex-col gap-4 min-w-0">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">Comparison Review</h1>
            <p className="text-sm text-slate-500 mt-1">
              Review side-by-side alternative comparisons, validate trade-offs, and approve recommendations before publishing.
            </p>
          </div>
          <div className="flex flex-row items-center gap-1.5 sm:gap-3 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar mt-1 md:mt-0">
            <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap shrink-0">
              <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Refresh
            </button>
            <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 bg-white border border-slate-200 text-blue-600 rounded-lg text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap shrink-0">
              <PlayCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Run Recheck
            </button>
            <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap shrink-0">
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Export Review
            </button>
          </div>
        </div>

        {/* Top KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4 min-w-0">
            <div className="h-10 w-10 rounded-full border border-amber-200 bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-semibold text-slate-500 block truncate">Pending Comparison Reviews</span>
              <span className="text-2xl font-black text-slate-950 block mt-0.5">128</span>
              <span className="text-[10px] font-semibold text-amber-600 flex items-center mt-1">
                ↗ 12 vs last 7 days
              </span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4 min-w-0">
            <div className="h-10 w-10 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-semibold text-slate-500 block truncate">Approved Today</span>
              <span className="text-2xl font-black text-slate-950 block mt-0.5">36</span>
              <span className="text-[10px] font-semibold text-emerald-600 flex items-center mt-1">
                ↗ 8 vs yesterday
              </span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4 min-w-0">
            <div className="h-10 w-10 rounded-full border border-orange-200 bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-semibold text-slate-500 block truncate">Needs Evidence</span>
              <span className="text-2xl font-black text-slate-950 block mt-0.5">22</span>
              <span className="text-[10px] font-semibold text-orange-600 flex items-center mt-1">
                ↗ 5 vs last 7 days
              </span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4 min-w-0">
            <div className="h-10 w-10 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-semibold text-slate-500 block truncate">High Confidence</span>
              <span className="text-2xl font-black text-slate-950 block mt-0.5">74%</span>
              <span className="text-[10px] font-semibold text-emerald-600 flex items-center mt-1">
                ↗ 6pp vs last 7 days
              </span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4 min-w-0">
            <div className="h-10 w-10 rounded-full border border-rose-200 bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
              <XCircle className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-semibold text-slate-500 block truncate">Rejected Today</span>
              <span className="text-2xl font-black text-slate-950 block mt-0.5">6</span>
              <span className="text-[10px] font-semibold text-rose-600 flex items-center mt-1">
                ↗ 2 vs yesterday
              </span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4 min-w-0">
            <div className="h-10 w-10 rounded-full border border-blue-200 bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-semibold text-slate-500 block truncate">Avg. Review Time</span>
              <span className="text-2xl font-black text-slate-950 block mt-0.5">18m 24s</span>
              <span className="text-[10px] font-semibold text-emerald-600 flex items-center mt-1">
                ↘ 2m vs last 7 days
              </span>
            </div>
          </div>
        </div>

        {/* Middle Section: Queue & Comparison */}
        <div className="grid grid-cols-1 2xl:grid-cols-[1fr_500px] gap-3 sm:gap-4 min-w-0">

          {/* Comparison Review Queue */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col min-w-0">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-bold text-slate-950">Comparison Review Queue</h2>
                <span className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full text-[10px] font-bold">128 total</span>
              </div>
              <button className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                <Filter className="w-3.5 h-3.5" /> Filters
              </button>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left whitespace-nowrap min-w-[800px]">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="px-4 py-5 text-[11px] font-bold text-slate-500 w-8 text-center"><div className="w-3.5 h-3.5 border border-slate-300 rounded mx-auto"></div></th>
                    <th className="px-4 py-5 text-[11px] font-bold text-slate-500">Original Product</th>
                    <th className="px-4 py-5 text-[11px] font-bold text-slate-500">Recommended Alternative</th>
                    <th className="px-4 py-5 text-[11px] font-bold text-slate-500">Alternative Type</th>
                    <th className="px-4 py-5 text-[11px] font-bold text-slate-500 text-right">Score Gap ⓘ</th>
                    <th className="px-4 py-5 text-[11px] font-bold text-slate-500 text-right">Price Difference</th>
                    <th className="px-4 py-5 text-[11px] font-bold text-slate-500 text-right">Confidence ⓘ</th>
                    <th className="px-4 py-5 text-[11px] font-bold text-slate-500 text-center">Affiliate Status</th>
                    <th className="px-4 py-5 text-[11px] font-bold text-slate-500 text-center">Status</th>
                    <th className="px-4 py-5 text-[11px] font-bold text-slate-500 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {queueData.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 group cursor-pointer">
                      <td className="px-4 py-5 text-center">
                        <div className="w-3.5 h-3.5 border border-slate-300 rounded mx-auto cursor-pointer"></div>
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                            <div className="w-6 h-6 bg-slate-300 rounded-sm"></div> {/* Mock image */}
                          </div>
                          <div>
                            <p className="text-[13px] font-semibold text-slate-900">{item.original.name}</p>
                            <p className="text-[11px] text-slate-500">{item.original.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                            <div className="w-6 h-6 bg-slate-300 rounded-sm"></div> {/* Mock image */}
                          </div>
                          <div>
                            <p className="text-[13px] font-semibold text-slate-900">{item.alternative.name}</p>
                            <p className="text-[11px] text-slate-500">{item.alternative.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <span className="text-[12px] font-medium text-slate-700">
                          {item.type}
                        </span>
                      </td>
                      <td className="px-4 py-5 text-right">
                        <span className="text-[13px] font-bold text-emerald-500 block">{item.scoreGap}</span>
                      </td>
                      <td className="px-4 py-5 text-right">
                        <span className={`text-[13px] font-bold block ${item.priceNegative ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {item.priceDiff}
                        </span>
                      </td>
                      <td className="px-4 py-5 text-right">
                        <span className="text-[13px] font-bold text-emerald-500">
                          {item.confidence}
                        </span>
                      </td>
                      <td className="px-4 py-5 text-center">
                        <span className={`text-[10px] ${getAffiliateStyle(item.affiliate)}`}>{item.affiliate}</span>
                      </td>
                      <td className="px-4 py-5 text-center">
                        <span className={`px-2.5 py-0.5 border rounded-full text-[11px] font-bold ${getStatusStyle(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-5 text-center">
                        <div className="flex items-center justify-center gap-2 text-slate-400">
                          <button className="hover:text-slate-600 transition-colors"><Eye className="w-4 h-4" /></button>
                          <button className="hover:text-slate-600 transition-colors"><MoreVertical className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500 font-medium text-center sm:text-left">Showing 1 to 6 of 128 entries</span>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex flex-wrap items-center justify-center gap-1">
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded bg-blue-600 text-white text-xs font-bold">1</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-50 text-slate-700 text-xs font-bold">2</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-50 text-slate-700 text-xs font-bold">3</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-50 text-slate-700 text-xs font-bold">4</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-50 text-slate-700 text-xs font-bold">5</button>
                  <span className="text-slate-400 px-1 text-xs">...</span>
                  <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-50 text-slate-700 text-xs font-bold">22</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <select className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-md px-2 py-1 outline-none">
                    <option>10 / page</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Side-by-Side Comparison Module */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 lg:p-6 shadow-sm flex flex-col min-w-0 relative">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-sm font-bold text-slate-950">Side-by-Side Comparison</h2>
              <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold">#CR-2024-04218</span>
            </div>

            <div className="flex flex-col lg:flex-row items-stretch justify-center relative min-h-[300px] gap-6">

              {/* Original Card */}
              <div className="flex-1 flex flex-col">
                <div className="text-center mb-4">
                  <span className="text-[11px] font-bold text-blue-600">Original Product</span>
                </div>

                <div className="border border-slate-200 rounded-xl p-5 flex-1 bg-white relative">
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-20 h-20 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
                      <div className="w-12 h-12 bg-slate-800 rounded-full"></div> {/* Mock headphone */}
                    </div>
                    <h3 className="text-sm font-bold text-blue-600 text-center leading-tight mb-1">Sony WH-1000XM5<br />Headphones</h3>
                    <p className="text-[11px] text-slate-500">Over-Ear Headphones</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-500">Current Price</span>
                      <span className="font-bold text-slate-950">$349.99</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-500">AI Buy Score</span>
                      <span className="font-bold text-emerald-500">88</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-500">Review Trust</span>
                      <span className="font-bold text-emerald-500">92%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-500">Value Score</span>
                      <span className="font-bold text-emerald-500">84</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <h4 className="text-[11px] font-bold text-slate-950 mb-2">Why it may be better</h4>
                    <ul className="space-y-1.5 text-[11px] font-medium text-slate-700">
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" /> Industry-leading noise cancellation
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" /> Superior call quality
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" /> Premium build quality
                      </li>
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-[11px] font-bold text-slate-950 mb-2">Trade-offs</h4>
                    <ul className="space-y-1.5 text-[11px] font-medium text-slate-700">
                      <li className="flex items-start gap-1.5">
                        <span className="text-orange-500 font-bold mt-0.5 shrink-0">-</span> Higher price
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-transparent font-bold mt-0.5 shrink-0">-</span> Slightly heavier (250g)
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-orange-500 font-bold mt-0.5 shrink-0">-</span> No foldable design
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Center Arrow */}
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-slate-200 rounded-full items-center justify-center shadow-sm">
                <ArrowLeftRight className="w-5 h-5 text-blue-600" />
              </div>

              {/* Alternative Card */}
              <div className="flex-1 flex flex-col">
                <div className="text-center mb-4">
                  <span className="text-[11px] font-bold text-emerald-500">Recommended Alternative</span>
                </div>

                <div className="border border-emerald-100 rounded-xl p-5 flex-1 bg-white relative">
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-20 h-20 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
                      <div className="w-12 h-12 bg-slate-800 rounded-full"></div> {/* Mock headphone */}
                    </div>
                    <h3 className="text-sm font-bold text-blue-600 text-center leading-tight mb-1">Bose QuietComfort Ultra<br />Headphones</h3>
                    <p className="text-[11px] text-slate-500">Over-Ear Headphones</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-500">Current Price</span>
                      <span className="font-bold text-slate-950">$299.99</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-500">AI Buy Score</span>
                      <span className="w-7 h-7 rounded-full border border-emerald-500 text-emerald-500 flex items-center justify-center font-bold text-[11px]">100</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-500">Review Trust</span>
                      <span className="font-bold text-emerald-500">94%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-500">Value Score</span>
                      <span className="font-bold text-emerald-500">92</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <h4 className="text-[11px] font-bold text-slate-950 mb-2">Why it may be better</h4>
                    <ul className="space-y-1.5 text-[11px] font-medium text-slate-700">
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" /> More comfortable for long use
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" /> Better battery life (24h vs 20h)
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" /> Richer, more balanced sound
                      </li>
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-[11px] font-bold text-slate-950 mb-2">Trade-offs</h4>
                    <ul className="space-y-1.5 text-[11px] font-medium text-slate-700">
                      <li className="flex items-start gap-1.5">
                        <span className="text-orange-500 font-bold mt-0.5 shrink-0">-</span> Slightly less effective ANC in loud<br />environments
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-orange-500 font-bold mt-0.5 shrink-0">-</span> Plastic build vs metal accents
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: 3 Cols */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 min-w-0">

          {/* Comparison Type Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col min-w-0">
            <h2 className="text-sm font-bold text-slate-950 mb-4">Comparison Type Breakdown</h2>
            <div className="flex-1 flex flex-col sm:flex-row items-center justify-center relative min-h-[220px] gap-6 sm:gap-0 py-4 sm:py-0">
              <div className="relative w-[180px] h-[180px] sm:absolute sm:inset-0 sm:w-[45%] sm:h-full sm:flex sm:items-center sm:justify-start">
                {isChartMounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={breakdownData}
                        cx="50%"
                        cy="50%"
                        innerRadius="55%"
                        outerRadius="80%"
                        stroke="none"
                        dataKey="value"
                        isAnimationActive={true}
                        animationBegin={0}
                        animationDuration={1500}
                        animationEasing="ease-out"
                      >
                        {breakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 600 }}
                        itemStyle={{ color: '#0F172A' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
                {/* Center text */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                  <span className="block text-2xl font-black text-slate-900 leading-none">128</span>
                  <span className="block text-[11px] font-medium text-slate-500 mt-0.5">Total</span>
                </div>
              </div>

              {/* Custom Legend */}
              <div className="w-full sm:w-[55%] sm:ml-auto sm:pl-2 flex flex-col gap-3 justify-center z-10">
                {breakdownData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between group">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
                      <span className="text-[11px] font-semibold text-slate-700 truncate group-hover:text-slate-950 transition-colors">{item.name}</span>
                    </div>
                    <div className="flex items-center justify-end gap-1.5 shrink-0 ml-2">
                      <span className="text-[11px] font-bold text-slate-900 w-5 text-right">{item.value}</span>
                      <span className="text-[10px] text-slate-500 font-medium w-10 text-right">({item.percentage})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Review Checklist */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold text-slate-950">Review Checklist</h2>
              <ClipboardList className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-[13px] font-semibold text-slate-900 leading-snug mt-0.5">Verify score gap meets minimum threshold</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-[13px] font-semibold text-slate-900 leading-snug mt-0.5">Confirm price difference is accurate</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-[13px] font-semibold text-slate-900 leading-snug mt-0.5">Validate review trust is sufficient (≥ 70%)</span>
              </div>
              <div className="flex items-start gap-3 opacity-60">
                <Circle className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                <span className="text-[13px] font-medium text-slate-600 leading-snug mt-0.5">Check affiliate link status</span>
              </div>
              <div className="flex items-start gap-3 opacity-60">
                <Circle className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                <span className="text-[13px] font-medium text-slate-600 leading-snug mt-0.5">Confirm user-fit trade-offs are clear</span>
              </div>
            </div>
          </div>

          {/* Recent Decisions */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold text-slate-950">Recent Decisions</h2>
              <button className="text-xs font-bold text-blue-600 hover:text-blue-700">View all</button>
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-[11px] font-bold text-emerald-500 w-[55px]">Approved</span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-700 leading-tight mt-0.5">Sony WH-1000XM5 → Bose QuietComfort Ultra</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] font-medium text-slate-500">May 18, 2024 10:43 AM</p>
                  <p className="text-[10px] font-medium text-slate-400">by Admin User</p>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-500" />
                    <span className="text-[11px] font-bold text-rose-500 w-[55px]">Rejected</span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-700 leading-tight mt-0.5">Razer DeathAdder V3 → Logitech G Pro X Superlight 2</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] font-medium text-slate-500">May 18, 2024 9:15 AM</p>
                  <p className="text-[10px] font-medium text-slate-400">by Sarah Johnson</p>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span className="text-[11px] font-bold text-orange-500 w-[55px]">Needs Review</span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-700 leading-tight mt-0.5">Ninja Foodi 6.5Qt → COSORI Pro II 5.8Qt</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] font-medium text-slate-500">May 18, 2024 8:32 AM</p>
                  <p className="text-[10px] font-medium text-slate-400">by Michael Chen</p>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-[11px] font-bold text-emerald-500 w-[55px]">Approved</span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-700 leading-tight mt-0.5">LG 27GP850-B → Dell G2724D</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] font-medium text-slate-500">May 17, 2024 6:47 PM</p>
                  <p className="text-[10px] font-medium text-slate-400">by Admin User</p>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 flex items-center gap-1.5">
                    <ClipboardList className="w-4 h-4 text-amber-500" />
                    <span className="text-[11px] font-bold text-amber-500 w-[55px]">Pending</span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-700 leading-tight mt-0.5">Canon EOS R50 → Sony ZV-E10</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] font-medium text-slate-500">May 17, 2024 5:21 PM</p>
                  <p className="text-[10px] font-medium text-slate-400">by Emily Davis</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
